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

function fetchICS(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            // Follow a single redirect if needed
            if (res.statusCode === 301 || res.statusCode === 302) {
                return fetchICS(res.headers.location).then(resolve).catch(reject);
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

    console.log('Parsing events...');
    const parsed = ical.parseICS(icsData);

    const events = Object.values(parsed)
        .filter(e => e.type === 'VEVENT')
        .map(e => ({
            title:       e.summary      || 'Club Event',
            start:       e.start        ? e.start.toISOString()  : null,
            end:         e.end          ? e.end.toISOString()     : null,
            description: e.description  || '',
            location:    e.location     || ''
        }))
        .filter(e => e.start)
        .sort((a, b) => new Date(a.start) - new Date(b.start));

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
