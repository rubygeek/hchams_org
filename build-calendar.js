/**
 * HCARC Calendar Builder
 * Fetches the groups.io ICS feed and writes generated/events.json.
 * Run manually:  node build-calendar.js
 * Run via CI:    GitHub Actions (.github/workflows/update-calendar.yml) does this daily.
 *
 * The ical library returns Date objects whose UTC values represent the local
 * wall-clock time for TZID=America/Chicago events (i.e. the UTC offset is
 * ignored and the clock digits are preserved). So we format them by reading
 * the UTC digits directly — no timezone conversion needed.
 * Events already stored as UTC (ending in Z) are converted to Chicago local
 * time before storing, so FullCalendar (timeZone:'America/Chicago') displays
 * everything correctly.
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
 * Format a Date as a local wall-clock string by reading its UTC digits.
 * The ical library stores TZID-qualified times this way:
 *   DTSTART;TZID=America/Chicago:20200118T100000  →  Date where getUTC*() returns 10:00
 * So we just read the UTC digits and format them directly.
 */
function wallClockFromUTCDigits(date) {
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
 * Used for events whose DTSTART ends in Z (genuinely UTC).
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

/**
 * Detect whether an ICS event's DTSTART is a true UTC value (ends in Z).
 * The ical library sets e.start.toISOString() ending in .000Z for both cases,
 * but sets e.start.tzid to the timezone string when TZID= is present.
 */
function isRealUTC(e) {
    // If the ical library found a TZID, it's a local time stored as UTC digits
    if (e.start && e.start.tzid) return false;
    // If there's no tzid, check the raw ical string if available
    if (e.start && e.start.val && typeof e.start.val === 'string') {
        return e.start.val.endsWith('Z');
    }
    return false;
}

function formatStart(date, useUTCDigits) {
    return useUTCDigits ? wallClockFromUTCDigits(date) : utcToChicago(date);
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

        // TZID-qualified events: ical stores wall-clock time in UTC digits
        // True UTC events (Z suffix): need to convert to Chicago local time
        const hasTZID = !!(e.start && e.start.tzid);

        if (e.rrule) {
            // Recurring event — expand all occurrences within range
            // rrule.between() returns dates with same wall-clock-in-UTC-digits behaviour
            const occurrences = e.rrule.between(rangeStart, rangeEnd, true);
            occurrences.forEach(date => {
                const startStr = hasTZID
                    ? wallClockFromUTCDigits(date)
                    : utcToChicago(date);
                const endStr = duration
                    ? (hasTZID
                        ? wallClockFromUTCDigits(new Date(date.getTime() + duration))
                        : utcToChicago(new Date(date.getTime() + duration)))
                    : null;
                events.push({
                    title:       e.summary     || 'Club Event',
                    start:       startStr,
                    end:         endStr,
                    description: e.description || '',
                    location:    e.location    || ''
                });
            });
        } else {
            // Single event — include if within range
            try {
                const start = new Date(e.start);
                if (start >= rangeStart) {
                    const startStr = hasTZID
                        ? wallClockFromUTCDigits(start)
                        : utcToChicago(start);
                    const endStr = e.end
                        ? (hasTZID
                            ? wallClockFromUTCDigits(new Date(e.end))
                            : utcToChicago(new Date(e.end)))
                        : null;
                    events.push({
                        title:       e.summary     || 'Club Event',
                        start:       startStr,
                        end:         endStr,
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
