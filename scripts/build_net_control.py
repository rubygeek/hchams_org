#!/usr/bin/env python3
"""
Convert ham radio net control rotation text to HTML table format.
Transforms lines like "May 5: Bob W31BOB" into HTML table rows.
"""
 
import re
from datetime import datetime
 
def parse_net_control_text(text, month="May", year=2026, day_of_week="Tuesday", time="7:30 PM"):
    """
    Parse net control rotation text and return HTML table.
 
    Args:
        text: Multi-line string with format "Month Day: Name CALLSIGN"
        month: Month name (default: "May")
        year: Year (default: 2026)
        day_of_week: Day of week for all entries (default: "Tuesday")
        time: Time for all entries (default: "7:30 PM")
 
    Returns:
        HTML string with complete table
    """
    lines = text.strip().split('\n')
    rows_html = []
 
    for line in lines:
        # Parse format: "May 5: Brian W1BTB"
        match = re.match(r'(\w+)\s+(\d+):\s+(.+?)\s+([A-Z0-9]{1,})\s*$', line.strip())
        if match:
            month_str, day, name, callsign = match.groups()
 
            # Format date
            date_str = f"{day_of_week}, {month} {day}"
 
            # Build table row
            row = f'''          <tr>
            <td>{date_str}</td>
            <td>{time}</td>
            <td>{name} <span class="callsign">{callsign}</span></td>
          </tr>'''
            rows_html.append(row)
 
    # Assemble complete HTML
    html = f'''<h3>{month} Net Control Rotation</h3>
    <div class="table-responsive-wrap">
      <table class="table table-striped netcontrol-table" style="max-width: 650px;">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Net Control</th>
          </tr>
        </thead>
        <tbody>
{''.join(rows_html)}
        </tbody>
      </table>
    </div>'''
 
    return html
 
 
if __name__ == "__main__":
    # Example input text
    input_text = """May 5: Brian W1BTB
May 12: Gary W5GW
May 19: Phil KD5MMM
May 26: Jim KA6J"""
 
    # Generate HTML
    html_output = parse_net_control_text(input_text, month="May")
 
    print(html_output)
 
    # Optionally save to file
    with open('net_control_rotation.html', 'w') as f:
        f.write(html_output)
    print("\n✓ HTML saved to net_control_rotation.html")
