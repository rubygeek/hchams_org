# Agent Navigation Guide for HCHAMS

## Overview

This guide helps AI agents and automated systems navigate and understand the HCHAMS website structure, content patterns, and data locations.

---

## Part 1: Site Understanding

### Organization Identity
- **Full Name:** Houston Cultural Heritage Amateur Radio and Multisport Society
- **Acronym:** HCHAMS
- **Type:** Amateur radio club + Multisport organization
- **Location:** Houston (likely Texas, USA)
- **Domain:** hchams.org

### Primary Purposes
1. **Community Building** - Bring together amateur radio and multisport enthusiasts
2. **Event Hosting** - Organize and promote events (Swap Fest, meetings)
3. **Member Management** - Recruitment and membership operations
4. **Information Sharing** - Educate about amateur radio and activities

---

## Part 2: Page Navigation Guide

### Starting Point: Home (`/` or `index.html`)

**What to expect:**
- Welcome message for the organization
- Links to main sections
- Featured upcoming events
- Call-to-action buttons (Join, Learn More, Contact)
- Navigation menu with main links

**How to navigate:**
```
Look for: <nav>, <header>, <a> tags pointing to:
  - About pages
  - Schedule/Events
  - Contact form
  - Membership signup
```

**Key information to extract:**
- Organization name and tagline
- Main value proposition
- Featured events
- Navigation structure

---

### Section 1: Organization Info

#### Path A: About (`/About.html`)

**Content Type:** Informational  
**Update Frequency:** Monthly  
**Typical Sections:**

```markdown
- Hero/Header Section
  └─ Organization name, tagline, hero image

- Mission & Vision
  └─ Why the organization exists
  └─ Long-term goals

- History
  └─ When founded
  └─ Key milestones
  └─ Evolution of the organization

- What We Do
  └─ Amateur radio activities
  └─ Multisport activities
  └─ Events hosted
  └─ Community benefits

- Leadership/Team
  └─ Key people
  └─ Roles
  └─ Contact info

- Call-to-Action
  └─ Join button
  └─ Learn more link
  └─ Contact form
```

**Data extraction strategy:**
- Look for `<h1>`, `<h2>` tags for structure
- Extract contact emails and phone numbers
- Identify leadership names
- Find links to related pages

---

#### Path B: Learn More (`/LearnMore.html`)

**Content Type:** Educational/Reference  
**Update Frequency:** Monthly  
**Typical Sections:**

```markdown
- FAQ
  └─ Common questions
  └─ Beginner information
  └─ Amateur radio basics

- Resources
  └─ Links to external sites
  └─ Reading materials
  └─ Tutorial links

- Getting Started
  └─ How to join
  └─ Required equipment
  └─ Training opportunities

- Additional Info
  └─ Detailed explanations
  └─ Technical information
  └─ Activity descriptions
```

**Navigation tip:** This page often references back to About and Membership pages.

---

### Section 2: Events & Activities

#### Path C: Schedule (`/schedule.html`)

**Content Type:** Calendar/Reference  
**Update Frequency:** Weekly (🔴 High)  
**Critical for:** Event discovery, meeting times

**What to extract:**

```yaml
For each event:
  - Date (YYYY-MM-DD)
  - Time (HH:MM format, with timezone)
  - Title/Name
  - Location (address or virtual link)
  - Description
  - Who should attend
  - Registration link (if applicable)
  - Contact for questions
```

**Parsing strategies:**
```
Look for:
- <table> with dates and events
- <ul> with event items
- <div class="event"> containers
- <time> elements with datetime attributes
- Recurring event patterns (weekly meetings, monthly gatherings)
```

**Example data extraction:**
```
Meeting: General Membership Meeting
When: Every 2nd Tuesday, 7:00 PM CT
Where: [Location from page]
More info: /Contact.html
```

---

#### Path D: May 2026 Swap Fest (`/may-2026-swap-fest.html`)

**Content Type:** Event Details  
**Update Frequency:** Weekly (🔴 High - event-specific)  
**Critical for:** Event-specific queries

**What to extract:**

```yaml
Event Details:
  - Event name: May 2026 Swap Fest
  - Date: [Extract from page]
  - Time: [Extract from page]
  - Location: [Address]
  - Coordinates: [If provided]

Event Info:
  - Description: [What is it?]
  - Who can attend: [Restrictions?]
  - Cost: [Entry fee?]
  - Parking: [Available?]
  - Food/Facilities: [Available?]

Registration:
  - How to register: [Link or form]
  - Deadline: [If applicable]
  - Contact: [Email/phone for questions]

Vendor Info:
  - How to become vendor: [Process]
  - Fees: [Cost to vend]
  - Setup time: [When/how early]
  - Contact: [Vendor coordinator]
```

**Parsing strategies:**
```
Look for:
- Date/time information in multiple formats
- Address or map embeds
- Registration form or button
- Contact information sections
- Vendor tables or sections
- Frequently asked questions
```

---

### Section 3: Member Engagement

#### Path E: Membership Form (`/MembershipForm.html`)

**Content Type:** Form/Application  
**Update Frequency:** Monthly  
**Purpose:** New member acquisition

**Form field extraction:**

```
Look for:
- Input fields (text, email, phone, etc.)
- Select dropdowns (membership type, experience level)
- Checkboxes (interests, agreement to terms)
- Text areas (comments, introduction)
- Submit button
- Terms and conditions
```

**Data to capture:**
```
Form structure:
├─ Personal Information
│  ├─ Name
│  ├─ Email
│  ├─ Phone
│  └─ Address (if required)
├─ Experience Level
│  ├─ Amateur radio experience
│  ├─ Multisport experience
│  └─ Skills/interests
└─ Submission info
   ├─ Where form posts to
   ├─ Confirmation method
   └─ Next steps
```

**Navigation pattern:**
- Usually accessed from: Home, About, Contact
- Often links back to: Contact page for questions
- Related page: Learn More (prerequisites)

---

#### Path F: Contact Us (`/Contact.html`)

**Content Type:** Contact/Form  
**Update Frequency:** Monthly  
**Priority:** 🔴 Critical for agent-user interaction

**Information to extract:**

```markdown
### Contact Methods
- Email: [main contact email]
- Phone: [contact number]
- Mailing Address: [physical address]
- Office Hours: [if applicable]
- Social Media: [links to social profiles]

### Contact Form
- Fields required
- Submission destination
- Confirmation method
- Response time expectations

### Department/Person Contacts
- President/Leader: [name, email, phone]
- Event Coordinator: [name, email, phone]
- Membership: [name, email, phone]
- Technical/Amateur Radio: [contact info]

### Response Protocol
- Average response time
- Best method to reach them
- Support hours
```

**Parsing strategies:**
```
Look for:
- <a href="mailto:"> tags
- <a href="tel:"> tags
- Address in multiple formats
- Contact form with action URL
- Business hours
- Social media icons/links
```

---

## Part 3: Cross-Page Navigation Patterns

### Natural Navigation Flows

```
Flow 1: First Time Visitor
Home → About → Learn More → Schedule → Membership/Contact

Flow 2: Event-Interested
Home → Schedule → [Specific Event Page] → Contact/Register

Flow 3: New Member Path
Home → About → Learn More → Membership → Contact

Flow 4: Quick Information
Home → Contact

Flow 5: Event Vendor
Schedule → [Event Page] → Contact [Ask about vendor info]
```

### Page Link Relationships

```
index.html
├─ Links to: About, LearnMore, schedule, Contact, Membership
├─ Linked from: All pages (in nav/footer)
└─ Meta info: Home page, entry point

About.html
├─ Links to: LearnMore, Membership, Contact
├─ Linked from: Home, schedule, Contact
└─ Meta info: Organization overview

LearnMore.html
├─ Links to: About, schedule, Membership
├─ Linked from: Home, About
└─ Meta info: Additional resources

schedule.html
├─ Links to: may-2026-swap-fest, Contact, Home
├─ Linked from: Home, Membership, Contact
└─ Meta info: Calendar view - update frequently

may-2026-swap-fest.html
├─ Links to: schedule, Contact, Home
├─ Linked from: schedule, Home
└─ Meta info: Event detail page

Membership.html
├─ Links to: About, Contact, LearnMore
├─ Linked from: Home, About, Contact
└─ Meta info: Application form

Contact.html
├─ Links to: Home, About, Membership, schedule
├─ Linked from: All pages
└─ Meta info: Hub for inquiries
```

---

## Part 4: Data Extraction Patterns

### For Information Queries

**Query: "Tell me about HCHAMS"**
```
Primary source: /About.html
Secondary sources: /LearnMore.html, home
Data points:
  - What they do
  - When founded
  - Key activities
  - Leadership
```

**Query: "How do I join?"**
```
Primary source: /MembershipForm.html
Secondary sources: /About.html, /Contact.html
Data points:
  - Requirements
  - Application process
  - Benefits
  - Contact for questions
```

**Query: "What events do you have?"**
```
Primary source: /schedule.html
Secondary source: /may-2026-swap-fest.html
Data points:
  - Event dates/times
  - Locations
  - Descriptions
  - Registration info
```

### For Contact Queries

**Query: "How do I reach HCHAMS?"**
```
Primary source: /Contact.html
Data points:
  - Email address
  - Phone number
  - Physical address
  - Social media
  - Response time
```

---

## Part 5: Technical Navigation Notes

### URL Patterns
```
Base domain: https://hchams.org

HTML files at root:
  / or /index.html     → Home
  /About.html          → About
  /LearnMore.html      → Learn More
  /schedule.html       → Schedule
  /may-2026-swap-fest.html → Event
  /MembershipForm.html → Membership
  /Contact.html        → Contact

Assets directories:
  /Content/            → CSS and stylesheets
  /Pictures/           → Images
  /scripts/            → JavaScript
```

### Sitemap Access
```
Machine-readable sitemaps available at:
  /sitemap.xml         → Standard XML (search engines)
  /sitemap.json        → Structured JSON (APIs/agents)
  /sitemap.md          → Markdown (agent-friendly)
  /sitemap.html        → Interactive HTML (browsers)
  /sitemap.txt         → Plain text (reference)

robots.txt location: /robots.txt
```

### HTTP Status and Performance
- All pages should return 200 OK
- Expect HTML content-type
- Forms post to server (check target)
- External links to PDF (ClubApplicationForm.pdf)

---

## Part 6: Best Practices for Agents

### ✅ DO:

1. **Validate navigation patterns**
   ```
   - Start at home
   - Follow all internal links
   - Verify link destinations
   - Check for circular references
   ```

2. **Extract structured data**
   ```
   - Event dates and times
   - Contact information
   - Form fields
   - Navigation structure
   ```

3. **Cache intelligently**
   ```
   - About/Learn More: Cache for weeks
   - Schedule: Refresh daily
   - Events: Refresh weekly
   - Contact: Cache for months
   ```

4. **Handle forms correctly**
   ```
   - Identify form action/method
   - Extract required fields
   - Validate email/phone formats
   - Provide form instruction to users
   ```

5. **Check for updates**
   ```
   - Compare Last-Modified headers
   - Check publication dates on content
   - Look for "updated" or "last modified" indicators
   ```

### ❌ DON'T:

1. **Assume static content**
   - Schedule changes weekly
   - Events have deadlines
   - Contact info may change
   - Leadership may rotate

2. **Skip pages**
   - All pages contain useful information
   - Some details only on secondary pages
   - Contact info distributed across pages

3. **Cache forever**
   - Event pages are time-sensitive
   - Schedule updates frequently
   - New events announced regularly

4. **Ignore form fields**
   - Forms have required fields
   - Field order matters
   - Some fields may be conditional

5. **Miss navigation context**
   - Breadcrumbs help understand structure
   - Related links show page relationships
   - Footers often have additional navigation

---

## Part 7: Common Agent Tasks

### Task 1: Get Current Events

```
1. Navigate to /schedule.html
2. Extract all event entries
3. Parse dates, times, locations
4. Check /may-2026-swap-fest.html for details
5. Return formatted list with:
   - Event name
   - Date/time
   - Location
   - Registration link (if any)
```

### Task 2: Answer "How do I join?"

```
1. Navigate to /MembershipForm.html
2. Extract form requirements
3. Note required fields
4. Get contact info from /Contact.html
5. Provide step-by-step guidance
6. Offer contact info for questions
```

### Task 3: Provide Organization Overview

```
1. Go to /About.html
2. Extract: mission, history, activities
3. Check /LearnMore.html for details
4. Get contact from /Contact.html
5. Compile concise overview
```

### Task 4: Find Specific Contact

```
1. Navigate to /Contact.html
2. Look for: email, phone, specific roles
3. Check /About.html for leadership names
4. Extract office hours if available
5. Provide best contact method
```

### Task 5: Event Registration

```
1. Go to /schedule.html
2. Find specific event
3. Navigate to event details
4. Extract registration link/process
5. Get contact for questions
6. Provide step-by-step instructions
```

---

## Part 8: Content Quality Markers

### High-Quality Information Indicators
- ✅ Dates and times are specific
- ✅ Addresses are complete
- ✅ Contact info is current
- ✅ Forms are functional
- ✅ Links are working
- ✅ Last-modified dates are recent

### Stale Content Indicators
- ⚠️ Events in the past
- ⚠️ "Coming soon" placeholders
- ⚠️ Broken links
- ⚠️ Old contact information
- ⚠️ Date inconsistencies
- ⚠️ No recent modifications

---

## Quick Reference Table

| Need | Best Page | Alt Sources |
|------|-----------|-------------|
| Organization info | `/About.html` | Home, Learn More |
| How to join | `/MembershipForm.html` | About, Contact |
| Events/meetings | `/schedule.html` | Home, Contact |
| Event details | `/may-2026-swap-fest.html` | Schedule, Contact |
| Contact info | `/Contact.html` | About, Membership |
| FAQs | `/LearnMore.html` | About, Contact |
| General overview | `index.html` | About |

---

## Version History

- **v1.0** - 2026-04-28 - Initial agent navigation guide
- Contains navigation patterns for 7 main pages
- Includes data extraction strategies
- Best practices for agent behavior

---

**End of Agent Navigation Guide**  
*For updates, check the modification date of pages or monitor /schedule.html and event pages weekly*
