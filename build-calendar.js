const https = require('https');
const ical = require('ical');
const fs = require('fs');
const path = require('path');
 
// Configuration
const GROUPS_IO_CALENDAR_URL = 'https://groups.io/g/hchams/calendar/feed.ics';
const OUTPUT_DIR = './generated';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'calendar.html');
 
// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
 
// Fetch calendar data
function fetchCalendar() {
    return new Promise((resolve, reject) => {
        https.get(GROUPS_IO_CALENDAR_URL, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}
 
// Parse ICS and generate HTML
function generateCalendarHTML(icsData) {
    const events = ical.parseICS(icsData);
    const eventArray = [];
 
    // Extract events
    Object.keys(events).forEach(key => {
        const event = events[key];
        if (event.type === 'VEVENT') {
            eventArray.push({
                title: event.summary || 'Untitled Event',
                start: event.start,
                end: event.end,
                description: event.description || '',
                location: event.location || ''
            });
        }
    });
 
    // Sort events by date
    eventArray.sort((a, b) => new Date(a.start) - new Date(b.start));
 
    // Group events by month
    const eventsByMonth = {};
    eventArray.forEach(event => {
        const date = new Date(event.start);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!eventsByMonth[monthKey]) {
            eventsByMonth[monthKey] = [];
        }
        eventsByMonth[monthKey].push(event);
    });
 
    // Generate HTML
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HCHAMS Club Calendar</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .calendar-container {
            max-width: 900px;
            margin: 0 auto;
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        .month-section {
            margin-bottom: 30px;
        }
        .month-title {
            font-size: 20px;
            font-weight: bold;
            color: #0066cc;
            border-bottom: 2px solid #0066cc;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .event {
            border-left: 4px solid #0066cc;
            padding: 15px;
            margin-bottom: 10px;
            background-color: #f9f9f9;
            border-radius: 4px;
        }
        .event-title {
            font-weight: bold;
            font-size: 16px;
            color: #333;
            margin-bottom: 5px;
        }
        .event-date {
            color: #666;
            font-size: 14px;
            margin-bottom: 5px;
        }
        .event-location {
            color: #888;
            font-size: 14px;
            margin-bottom: 5px;
        }
        .event-description {
            color: #555;
            font-size: 13px;
            margin-top: 10px;
        }
        .generated-note {
            text-align: center;
            color: #999;
            font-size: 12px;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="calendar-container">
        <h1>HCHAMS Club Calendar</h1>`;
 
    // Add events by month
    Object.keys(eventsByMonth).sort().forEach(monthKey => {
        const [year, month] = monthKey.split('-');
        const monthName = new Date(year, parseInt(month) - 1).toLocaleString('default',
            { month: 'long', year: 'numeric' });
 
        html += `<div class="month-section">
            <div class="month-title">${monthName}</div>`;
 
        eventsByMonth[monthKey].forEach(event => {
            const eventDate = new Date(event.start);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
 
            html += `<div class="event">
                <div class="event-title">${escapeHtml(event.title)}</div>
                <div class="event-date">📅 ${formattedDate}</div>`;
 
            if (event.location) {
                html += `<div class="event-location">📍 ${escapeHtml(event.location)}</div>`;
            }
 
            if (event.description) {
                html += `<div class="event-description">${escapeHtml(event.description)}</div>`;
            }
 
            html += `</div>`;
        });
 
        html += `</div>`;
    });
 
    html += `<div class="generated-note">
        Calendar updated: ${new Date().toLocaleString()}<br>
        Data sourced from <a href="https://groups.io/g/hchams">HCHAMS groups.io</a>
    </div>
    </div>
</body>
</html>`;
 
    return html;
}
 
// Utility function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
 
// Main execution
async function main() {
    try {
        console.log('Fetching calendar data from groups.io...');
        const icsData = await fetchCalendar();
 
        console.log('Generating calendar HTML...');
        const html = generateCalendarHTML(icsData);
 
        console.log('Writing to file...');
        fs.writeFileSync(OUTPUT_FILE, html);
 
        console.log(`✓ Calendar generated successfully: ${OUTPUT_FILE}`);
    } catch (error) {
        console.error('Error generating calendar:', error);
        process.exit(1);
    }
}
 
main();
 
