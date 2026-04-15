/**
 * HCARC Calendar Builder
 * Fetches the groups.io ICS feed and writes generated/events.json.
 * Run manually:  node build-calendar.js
 * Run via CI:    GitHub Actions (.github/workflows/update-calendar.yml) does this daily.
 */

const https   = require('https');
const ical    = require('ical');
const fs      = require('fs');
const path    = require('path');

const ICS_URL    = 'https://groups.io/g/hchams/ics/7239158/2068135138/feed.ics';
const OUTPUT_DIR = './generated';
const OUT_FILE   = path.join(OUTPUT_DIR, 'events.json');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function fetchICS(url, redirectCount = 0) {
    if (redirectCount > 5) return Promise.reject(new Error('Too many redirects'));

    const options = {
        headers: {
            'User-Agent':  'Mozilla/5.0 (compatible; calendar-bot/1.0)',
            'Accept':      'text/calendar, text/plain, */*',
        }
    };

    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            console.log(`HTTP ${res.statusCode} from ${url}`);
            if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
                return fetchICS(res.headers.location, redirectCount + 1).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function main() {
    console.log('Fetching ICS feed from groups.io...');
    const icsData = await fetchICS(ICS_URL);

    // Log first 300 chars so we can see in Actions log if we got ICS or an HTML error page
    console.log('Response preview:', icsData.substring(0, 300));

    if (!icsData.includes('BEGIN:VCALENDAR')) {
        throw new Error('Response is not a valid ICS file — groups.io may require authentication or the URL is wrong');
    }

    console.log('Parsing events...');
    const parsed = ical.parseICS(icsData);

    const allItems = Object.values(parsed);
    const vevents  = allItems.filter(e => e.type === 'VEVENT');
    console.log(`Total ICS items: ${allItems.length}, VEVENTs: ${vevents.length}`);

    // Expand recurring events from 30 days ago through 1 year ahead
    const rangeStart = new Date();
    rangeStart.setDate(rangeStart.getDate() - 30);
    const rangeEnd = new Date();
    rangeEnd.setFullYear(rangeEnd.getFullYear() + 1);

    const events = [];

    vevents.forEach(e => {
        const duration = (e.end && e.start)
            ? (new Date(e.end) - new Date(e.start))
            : 0;

        console.log(`Event: "${e.summary}" | rrule: ${e.rrule ? e.rrule.toString() : 'NONE'} | start: ${e.start}`);

        if (e.rrule) {
            // Recurring event — expand all occurrences within range
            const occurrences = e.rrule.between(rangeStart, rangeEnd, true);
            console.log(`  Recurring "${e.summary}": ${occurrences.length} occurrences`);
            occurrences.forEach(date => {
                events.push({
                    title:       e.summary     || 'Club Event',
                    start:       date.toISOString(),
                    end:         duration ? new Date(date.getTime() + duration).toISOString() : null,
                    description: e.description || '',
                    location:    e.location    || ''
                });
            });
        } else {
            // Single event — include if within range
            try {
                const start = new Date(e.start);
                if (start >= rangeStart) {
                    events.push({
                        title:       e.summary     || 'Club Event',
                        start:       start.toISOString(),
                        end:         e.end ? new Date(e.end).toISOString() : null,
                        description: e.description || '',
                        location:    e.location    || ''
                    });
                }
            } catch(err) {
                console.log(`  Skipping "${e.summary}": ${err.message}`);
            }
        }
    });

    events.sort((a, b) => new Date(a.start) - new Date(b.start));

    const output = {
        generated: new Date().toISOString(),
        events
    };

    fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2));
    console.log(`✓ Wrote ${events.length} events to ${OUT_FILE}`);
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
