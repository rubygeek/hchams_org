/**
 * HCARC Calendar Builder
 * Fetches the groups.io ICS feed and writes generated/events.json.
 * Run manually:  node build-calendar.js
 * Run via CI:    GitHub Actions (.github/workflows/update-calendar.yml) does this daily.
 *
 * The ical library stores TZID=America/Chicago times as Date objects where
 * the UTC digits equal the local wall-clock time (e.g. 10:00 Chicago → getUTCHours()===10).
 * True UTC times (Z suffix) have e.start.tz === undefined.
 * We store all times as "YYYY-MM-DDTHH:MM:SS" (no Z) so FullCalendar with
 * timeZone:'America/Chicago' displays them correctly.
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

/**
 * Read UTC digits directly from a Date — used for TZID-qualified events.
 * The ical library stores "10:00 Chicago" as a Date where getUTCHours()===10.
 */
function wallClockString(date) {
    const yyyy = date.getUTCFullYear();
    const mm   = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dd   = String(date.getUTCDate()).padStart(2, '0');
    const hh   = String(date.getUTCHours()).padStart(2, '0');
    const min  = String(date.getUTCMinutes()).padStart(2, '0');
    const ss   = String(date.getUTCSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
}

/**
 * Convert a true UTC Date to America/Chicago local wall-clock string.
 * Used for events whose DTSTART ends in Z (genuinely UTC, e.g. NET events).
 */
function utcToChicago(date) {
    const fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    });
    const parts = {};
    fmt.formatToParts(date).forEach(p => { if (p.type !== 'literal') parts[p.type] = p.value; });
    const h = parts.hour === '24' ? '00' : parts.hour;
    return `${parts.year}-${parts.month}-${parts.day}T${h}:${parts.minute}:${parts.second}`;
}

function toLocalString(date, hasTZ) {
    return hasTZ ? wallClockString(date) : utcToChicago(date);
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

        // e.start.tz is set when DTSTART has TZID= — wall clock digits are in UTC position
        // e.start.tz is undefined when DTSTART ends in Z — genuinely UTC, needs conversion
        const hasTZ = !!(e.start && e.start.tz);
        console.log(`  "${e.summary}" hasTZ=${hasTZ} tz=${e.start && e.start.tz}`);

        if (e.rrule) {
            const occurrences = e.rrule.between(rangeStart, rangeEnd, true);
            occurrences.forEach(date => {
                events.push({
                    title:       e.summary     || 'Club Event',
                    start:       toLocalString(date, hasTZ),
                    end:         duration ? toLocalString(new Date(date.getTime() + duration), hasTZ) : null,
                    description: e.description || '',
                    location:    e.location    || ''
                });
            });
        } else {
            try {
                const start = new Date(e.start);
                if (start >= rangeStart) {
                    events.push({
                        title:       e.summary     || 'Club Event',
                        start:       toLocalString(start, hasTZ),
                        end:         e.end ? toLocalString(new Date(e.end), hasTZ) : null,
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
