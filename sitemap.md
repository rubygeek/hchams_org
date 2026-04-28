# HCHAMS Website Sitemap

**Site Name:** Houston Cultural Heritage Amateur Radio and Multisport Society  
**Domain:** https://hchams.org  
**Last Updated:** 2026-04-28

---

## Quick Navigation

| Page | URL | Purpose |
|------|-----|---------|
| 🏠 Home | `/` | Site entry point |
| ℹ️ About | `/About.html` | Organization info |
| 📚 Learn More | `/LearnMore.html` | Additional resources |
| 📅 Schedule | `/schedule.html` | Events & meetings |
| 🎉 Swap Fest | `/may-2026-swap-fest.html` | May 2026 event |
| 📝 Membership | `/MembershipForm.html` | Join HCHAMS |
| 📧 Contact | `/Contact.html` | Get in touch |

---

## Pages by Category

### 🏠 Main Pages

#### Home
- **URL:** `/` (index.html)
- **Priority:** 🔴 Critical
- **Updated:** Weekly
- **Purpose:** Entry point and main hub for the site
- **Typical Content:** Welcome message, featured events, quick links

#### About Us
- **URL:** `/About.html`
- **Priority:** 🔴 Critical
- **Updated:** Monthly
- **Purpose:** Organization overview
- **Typical Content:** Mission, history, values, leadership, club description

#### Learn More
- **URL:** `/LearnMore.html`
- **Priority:** 🟡 Medium
- **Updated:** Monthly
- **Purpose:** Extended information and resources
- **Typical Content:** FAQ, resources, additional details, educational content

---

### 📅 Events & Activities

#### Schedule
- **URL:** `/schedule.html`
- **Priority:** 🔴 Critical
- **Updated:** Weekly
- **Purpose:** Event calendar and meeting information
- **Typical Content:** Meeting dates, times, locations, upcoming activities

#### May 2026 Swap Fest
- **URL:** `/may-2026-swap-fest.html`
- **Priority:** 🔴 Critical
- **Updated:** Weekly
- **Purpose:** Dedicated event page
- **Typical Content:** Event details, registration, location, vendors, schedule, contact info
- **Event Date:** May 2026

---

### 👥 Membership & Contact

#### Membership Form
- **URL:** `/MembershipForm.html`
- **Priority:** 🟡 Medium
- **Updated:** Monthly
- **Purpose:** Join the organization
- **Typical Content:** Application form, membership benefits, requirements, FAQs

#### Contact Us
- **URL:** `/Contact.html`
- **Priority:** 🟡 Medium
- **Updated:** Monthly
- **Purpose:** Communication and support
- **Typical Content:** Contact form, email, phone, mailing address, social media links

---

## Page Relationships

```
Home (index.html)
├── About.html
│   ├── LearnMore.html
│   └── MembershipForm.html
├── schedule.html
│   ├── may-2026-swap-fest.html
│   └── Contact.html
└── Contact.html
```

---

## Agent Navigation Hints

### For Information Queries
- **"Tell me about HCHAMS"** → `/About.html`
- **"What are you about?"** → `/About.html` or `/LearnMore.html`
- **"How do I join?"** → `/MembershipForm.html` or `/About.html`

### For Event Queries
- **"When is the next meeting?"** → `/schedule.html`
- **"Tell me about the swap fest"** → `/may-2026-swap-fest.html`
- **"What events do you have?"** → `/schedule.html`

### For Contact Queries
- **"How do I reach you?"** → `/Contact.html`
- **"Where is your office?"** → `/Contact.html`
- **"How can I get more information?"** → `/Contact.html`

---

## Content Structure Map

```
hchams_org/
├── index.html                    ← Homepage
├── About.html                    ← Organization info
├── LearnMore.html               ← Extended resources
├── schedule.html                ← Events calendar
├── may-2026-swap-fest.html      ← Specific event
├── MembershipForm.html          ← Membership application
├── Contact.html                 ← Contact information
├── ClubApplicationForm.pdf      ← Application form (PDF)
├── Content/                     ← Assets directory
│   ├── Site.css                 ← Main styles
│   ├── bootstrap.css            ← Bootstrap framework
│   └── bootstrap.min.css        ← Minified Bootstrap
├── Pictures/                    ← Image assets
├── scripts/                     ← JavaScript files
└── sitemap.* (all formats)      ← Navigation files
```

---

## Crawling Instructions for Agents

### Recommended Visit Order (Cold Start)
1. `index.html` - Understand the site purpose
2. `About.html` - Get organization context
3. `schedule.html` - Check for current events
4. `Contact.html` - Get communication methods

### Link Following Strategy
- Follow `href` attributes in navigation elements
- Prioritize links in header/navigation sections
- Look for CTA (Call-To-Action) buttons
- Check footer for additional links

### Content Extraction Tips
- Page titles convey main topics
- First paragraphs summarize content
- Look for contact information in footers
- Form pages have specific data collection purposes
- Event pages have date/time/location data

---

## Key Data Points by Page

### Contact Information
- Find on: `/Contact.html`
- Look for: Email, phone, address, form

### Membership Details
- Find on: `/MembershipForm.html` and `/About.html`
- Look for: Requirements, benefits, application process

### Events
- Find on: `/schedule.html` and `/may-2026-swap-fest.html`
- Look for: Dates, times, locations, registration

### Organization Info
- Find on: `/About.html` and `/LearnMore.html`
- Look for: Mission, history, activities, contact

---

## File Format Notes

This sitemap is available in multiple formats for different use cases:

- **`sitemap.md`** ← You are here (Markdown - agent-friendly)
- **`sitemap.json`** (Structured data for APIs)
- **`sitemap.xml`** (Standard for search engines)
- **`sitemap.html`** (Interactive for browsers)
- **`sitemap.txt`** (Plain text reference)

---

## Update Frequency Guide

| Section | Frequency | Why |
|---------|-----------|-----|
| Schedule | Weekly | Events change frequently |
| Home | Weekly | May feature current events |
| About | Monthly | Stable content |
| Learn More | Monthly | Reference material |
| Membership | Monthly | Forms/benefits stable |
| Contact | Monthly | Rarely changes |
| Swap Fest | Weekly | Event details evolving |

---

## Agent Best Practices

✅ **DO:**
- Check modification dates before assuming stale content
- Follow all internal links to discover hidden pages
- Extract structured data from forms and lists
- Cache frequently accessed pages like home and schedule
- Respect robots.txt directives

❌ **DON'T:**
- Assume page structure without visiting
- Skip pages marked as "secondary"
- Make assumptions about event dates without checking schedule
- Ignore contact forms - they're important engagement points
- Cache forever - content updates frequently

---

## Integration Points

### For Contact/Communication
- `/Contact.html` has the contact form and methods

### For Event Information  
- `/schedule.html` - General schedule
- `/may-2026-swap-fest.html` - Specific event details

### For New Members
- `/About.html` - Overview
- `/MembershipForm.html` - Application
- `/Contact.html` - Support

### For General Information
- `/LearnMore.html` - FAQ and resources

---

**End of Sitemap Document**
