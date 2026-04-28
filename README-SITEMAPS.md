# HCHAMS Website Sitemaps - Complete Guide

**Organization:** Houston Cultural Heritage Amateur Radio and Multisport Society  
**Website:** https://hchams.org  
**Sitemap Version:** 1.0  
**Last Updated:** 2026-04-28

---

## 📋 Available Sitemap Formats

This directory contains **6 different sitemap formats** optimized for different use cases:

### 1. **`sitemap.md`** - Markdown Format ⭐ **FOR AGENTS**
- **Best for:** AI agents, automated systems, markdown parsers
- **Format:** Clean markdown tables and lists
- **Content:** Quick nav, categories, relationships, hints, best practices
- **Size:** Medium - detailed but readable
- **Use cases:**
  - AI agent navigation
  - Documentation systems
  - Markdown processors
  - Version control friendly (diffs are readable)

### 2. **`AGENT-GUIDE.md`** - Comprehensive Agent Manual ⭐ **FOR AGENTS**
- **Best for:** Training AI agents on site structure
- **Format:** Detailed markdown guide with sections
- **Content:** 
  - Page understanding
  - Navigation strategies
  - Data extraction patterns
  - Common tasks
  - Best practices
- **Size:** Large - comprehensive reference
- **Use cases:**
  - Agent onboarding
  - Complex query handling
  - Multi-page navigation
  - Data extraction training

### 3. **`sitemap.json`** - Structured Data Format ⭐ **FOR APIs/AGENTS**
- **Best for:** Machine-readable data, APIs, structured queries
- **Format:** JSON with hierarchical structure
- **Content:**
  - Page metadata
  - Relationships
  - Categories
  - Navigation hierarchy
- **Size:** Small-Medium - compact
- **Use cases:**
  - REST APIs
  - Agent API calls
  - Frontend navigation menus
  - JavaScript processing

### 4. **`sitemap.xml`** - Standard SEO Format
- **Best for:** Search engines (Google, Bing, etc.)
- **Format:** XML with standard schema
- **Content:** URLs, priority, change frequency, last modified
- **Size:** Small
- **Use cases:**
  - Google Search Console
  - Bing Webmaster Tools
  - SEO crawlers
  - Standard sitemap readers

### 5. **`sitemap.html`** - Interactive Web Page
- **Best for:** Human visitors, browsers, visual navigation
- **Format:** Fully styled HTML with CSS
- **Content:**
  - Interactive navigation
  - Quick links
  - Organized categories
  - Hover effects
- **Size:** Medium
- **Use cases:**
  - Website visitors
  - Manual browsing
  - Visual reference
  - Accessibility

### 6. **`sitemap.txt`** - Plain Text Format
- **Best for:** Simple reference, accessibility, raw data
- **Format:** ASCII text with clear structure
- **Content:** Simple lists, navigation flows, data points
- **Size:** Small
- **Use cases:**
  - Command-line tools
  - Text editors
  - Accessibility
  - Email/document sharing

---

## 🎯 Which Format Should I Use?

### I'm an **AI Agent or Chatbot**
→ Use **`AGENT-GUIDE.md`** (comprehensive) or **`sitemap.md`** (quick reference)

### I'm **Building an API or Web Service**
→ Use **`sitemap.json`** (structured data)

### I'm a **Search Engine**
→ Use **`sitemap.xml`** (standard format)

### I'm a **Website Visitor**
→ Use **`sitemap.html`** (interactive page) or **`sitemap.md`** (readable)

### I need **Simple Text Reference**
→ Use **`sitemap.txt`** (plain text)

---

## 📊 Format Comparison

| Feature | MD | JSON | XML | HTML | TXT | AGENT |
|---------|----|----|-----|------|-----|-------|
| AI Friendly | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Human Readable | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Structured | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| SEO Optimized | ⭐ | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐ | ⭐ |
| Web Viewable | ⭐ | ⭐ | ⭐ | ⭐⭐⭐⭐⭐ | ⭐ | ⭐ |
| Learning Resource | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🚀 Quick Start by Role

### For AI/LLM Agents

1. **Start with:** `AGENT-GUIDE.md`
   - Read Part 1-2 for site understanding
   - Learn page structures in Part 2
   - Review common tasks in Part 7

2. **Reference:** `sitemap.md`
   - Quick lookup of pages
   - Navigation hints
   - Agent best practices

3. **Use:** `sitemap.json`
   - Programmatic navigation
   - Structured queries
   - Page relationships

### For Web Developers

1. **Understand site:** `AGENT-GUIDE.md` Part 1
2. **Build menu from:** `sitemap.json`
3. **Validate with:** `sitemap.xml`
4. **Display with:** `sitemap.html`

### For SEO/Marketing

1. **Submit to search engines:** `sitemap.xml`
2. **Monitor crawlability:** `sitemap.json`
3. **Display on website:** `sitemap.html`
4. **Internal reference:** `sitemap.md`

### For Content Managers

1. **Understand structure:** `sitemap.md`
2. **Plan updates:** `AGENT-GUIDE.md`
3. **Track relationships:** `sitemap.json`

---

## 📝 Site Structure at a Glance

### Pages (7 total)
```
Home (index.html) - Entry point
├─ About.html - Organization info
├─ LearnMore.html - Resources
├─ schedule.html - Events calendar ⚠️ Updates weekly
├─ may-2026-swap-fest.html - Event details ⚠️ Updates weekly
├─ MembershipForm.html - Join form
└─ Contact.html - Get in touch
```

### Update Frequency
- 🔴 **Weekly:** Home, Schedule, Events
- 🟡 **Monthly:** About, Learn More, Membership, Contact

### Page Relationships
- **Hubs:** Home, Contact (linked from/to many pages)
- **Entry paths:** About, Schedule (common starting points)
- **Conversion:** Membership, Contact (action pages)

---

## 🔍 How Agents Should Use These Sitemaps

### Phase 1: Initialization
```
Agent starts → Reads AGENT-GUIDE.md (Parts 1-2)
              ↓
         Understands site purpose and structure
              ↓
         Reads sitemap.md for quick reference
```

### Phase 2: Navigation
```
User asks question
              ↓
Agent determines relevant page(s)
              ↓
Uses navigation hints from sitemap.md
              ↓
Follows URL patterns from sitemap.json
              ↓
Navigates to appropriate page
```

### Phase 3: Data Extraction
```
Agent on target page
              ↓
Uses patterns from AGENT-GUIDE.md Part 4
              ↓
Extracts relevant information
              ↓
Returns answer with links
```

### Phase 4: Follow-up
```
User needs more info
              ↓
Agent consults page relationships
              ↓
Recommends related pages
              ↓
Provides additional context
```

---

## 💡 Agent Best Practices

### ✅ DO

- **Read AGENT-GUIDE.md first** - Understand site semantics
- **Reference sitemap.md for quick lookups** - When in doubt
- **Use sitemap.json for relationships** - Build context
- **Check update frequencies** - Know what's static vs dynamic
- **Cache intelligently** - About pages can be cached weeks, Schedule needs daily refresh
- **Validate links** - Ensure pages still exist
- **Extract structured data** - Events have dates, Contact page has info

### ❌ DON'T

- **Skip the agent guide** - Context matters
- **Assume page structure** - HTML can change
- **Cache event pages forever** - They update frequently
- **Ignore contact information** - It's critical for engagement
- **Miss related pages** - They contain complementary info
- **Assume static URLs** - Verify before storing

---

## 📂 File Organization

Place all sitemaps in the root of your site:

```
hchams_org/
├── sitemap.md              ← Markdown format (agents love this)
├── AGENT-GUIDE.md          ← Comprehensive agent manual
├── sitemap.json            ← Structured data
├── sitemap.xml             ← Search engine format
├── sitemap.html            ← Interactive web page
├── sitemap.txt             ← Plain text reference
├── robots.txt              ← Should reference sitemap.xml
│
├── index.html
├── About.html
├── Contact.html
├── LearnMore.html
├── schedule.html
├── may-2026-swap-fest.html
├── MembershipForm.html
│
├── Content/
├── Pictures/
└── scripts/
```

---

## 🔄 Updating Sitemaps

### When to Update

- **After adding/removing pages:** Update all formats
- **After changing URLs:** Update all except AGENT-GUIDE.md
- **After changing navigation:** Update AGENT-GUIDE.md + sitemap.md
- **After content updates:** Just update Last-Modified in XML/JSON
- **After event changes:** Update schedule dates in all formats

### Update Priority

1. **CRITICAL:** Update `AGENT-GUIDE.md` (agent training)
2. **CRITICAL:** Update `sitemap.json` (structured data)
3. **IMPORTANT:** Update `sitemap.md` (agent reference)
4. **IMPORTANT:** Update `sitemap.xml` (SEO)
5. **NICE-TO-HAVE:** Update `sitemap.html` (display)
6. **REFERENCE:** Update `sitemap.txt` (documentation)

---

## 🎓 Integration Examples

### Using in Python (Agent)
```python
import json
import markdown

# Load structured data
with open('sitemap.json') as f:
    site_map = json.load(f)

# Parse markdown
with open('AGENT-GUIDE.md') as f:
    guide = markdown.markdown(f.read())

# Navigate: Find relevant page
def find_page(query):
    for page in site_map['site']['pages']:
        if query.lower() in page['description'].lower():
            return page['url']
```

### Using in JavaScript
```javascript
// Load sitemaps
const json_map = await fetch('/sitemap.json').then(r => r.json());
const markdown = await fetch('/sitemap.md').then(r => r.text());

// Get page relationships
function getRelated(pageId) {
    return json_map.site.pages
        .find(p => p.id === pageId)
        .relatedPages;
}
```

### Using with SEO/Crawlers
```
Request: GET /sitemap.xml
Purpose: Index pages, determine crawl priority
Parser:  Standard XML sitemap parser
Action:  Add all URLs to crawl queue
```

---

## 📞 Support & Questions

For questions about site navigation or structure:
1. Check `AGENT-GUIDE.md` - Likely answered there
2. See `sitemap.md` section "Agent Navigation Hints"
3. Visit `/Contact.html` on the actual website
4. Check `/About.html` for organization context

---

## 📈 Analytics & Monitoring

### Pages to Monitor Frequently
- `/schedule.html` - Changes weekly
- `/may-2026-swap-fest.html` - Event-specific updates
- `/index.html` - Featured content changes

### Pages to Monitor Monthly
- `/About.html` - Leadership changes
- `/MembershipForm.html` - Form updates
- `/Contact.html` - Contact info updates

### Pages to Check Quarterly
- `/LearnMore.html` - Resource links

---

## ✅ Checklist for Implementation

Before deploying sitemaps to your site:

- [ ] Copy all 6 sitemap files to site root
- [ ] Update `robots.txt` to reference `sitemap.xml`
- [ ] Add sitemap link to `sitemap.html` in footer
- [ ] Test all links in `sitemap.html`
- [ ] Validate `sitemap.xml` with Google Search Console
- [ ] Verify `sitemap.json` parses correctly
- [ ] Check `sitemap.md` renders properly
- [ ] Ensure `AGENT-GUIDE.md` is readable
- [ ] Share `AGENT-GUIDE.md` with any API/agent partners
- [ ] Monitor update frequency of dynamic pages

---

## 📋 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-28 | Initial release - 6 format sitemaps + agent guide |

---

## 🎯 Next Steps

1. **Copy all files** to `/Users/nola/code/hchams_org/`
2. **Update `robots.txt`** to add: `Sitemap: https://hchams.org/sitemap.xml`
3. **Link to `sitemap.html`** from your footer (optional)
4. **Share `AGENT-GUIDE.md`** with any AI agents/partners you work with
5. **Test navigation** using each format
6. **Monitor page updates** according to frequency guidelines

---

**Ready to enable agent navigation!** 🚀  
All formats work together to help both humans and machines understand your site structure.
