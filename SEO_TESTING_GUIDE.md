# SEO Testing and Validation Guide

**Date:** December 25, 2025
**Status:** Phase 3 - Testing & Validation
**Build:** Frontend 1676 modules, Backend SitemapController implemented

---

## Overview

This guide provides comprehensive testing procedures to validate the SEO implementation across the World Public Assembly website. It covers manual testing, automated validation, and tools for monitoring SEO performance.

---

## Quick Test Checklist

- [ ] Homepage loads with correct meta tags
- [ ] Language switching updates page titles
- [ ] Sitemaps are accessible and valid
- [ ] JSON-LD schemas are properly formatted
- [ ] Canonical URLs are correct
- [ ] hreflang tags present for language switching
- [ ] robots.txt allows proper crawling
- [ ] Build completes without errors (1676 modules)

---

## 1. Manual Testing

### 1.1 Browser Inspector Tests

**Test 1: Check Meta Tags on Homepage**

1. Open your browser DevTools (F12)
2. Go to https://worldpublicsummit.test/ru/
3. In the Inspector, search for `<head>` section
4. Verify these meta tags are present:

```html
<!-- Page Title -->
<title>Всемирное публичное собрание - Международный форум</title>

<!-- Description -->
<meta name="description" content="Всемирное публичное собрание - площадка для диалога...">

<!-- Keywords -->
<meta name="keywords" content="всемирное собрание, международный форум, диалог культур...">

<!-- Canonical URL -->
<link rel="canonical" href="https://worldpublicsummit.test/">

<!-- Alternate Language -->
<link rel="alternate" hreflang="en" href="https://worldpublicsummit.test/en/">

<!-- Open Graph Tags -->
<meta property="og:type" content="website">
<meta property="og:title" content="Всемирное публичное собрание - Международный форум">
<meta property="og:description" content="...">
<meta property="og:url" content="https://worldpublicsummit.test/">
<meta property="og:image" content="https://images.unsplash.com/...">

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

**Expected Result:** ✓ All tags present and properly formatted

---

**Test 2: Language Switching Updates Meta Tags**

1. Open https://worldpublicsummit.test/ru/
2. Check page title in browser tab: "Всемирное публичное собрание - Международный форум"
3. Check meta description in Inspector
4. Click language switcher to English
5. URL should change to /en/
6. Page title should change to "World Public Assembly - International Forum"
7. Check meta description updated to English version

**Expected Result:** ✓ All meta tags update dynamically when language changes

---

**Test 3: Check Different Pages**

Test each page to verify SEO configuration:

| Page | URL | Expected Title (Russian) | Expected Keywords |
|------|-----|--------------------------|-------------------|
| Home | /ru/ | Всемирное публичное собрание - Международный форум | всемирное собрание |
| Program | /ru/program | Программа - Всемирное публичное собрание | программа конференции |
| Press Center | /ru/press-center | Пресс-центр - Всемирное публичное собрание | пресс-центр |
| News (dynamic) | /ru/news/1 | {Article Title} - News | новости |

**Expected Result:** ✓ Each page has unique, relevant SEO tags

---

### 1.2 JSON-LD Schema Testing

**Test: Inspect JSON-LD Schemas**

1. Open DevTools Console
2. Run this JavaScript to find and display JSON-LD schemas:

```javascript
// Find all JSON-LD scripts
const scripts = document.querySelectorAll('script[type="application/ld+json"]');
scripts.forEach((script, index) => {
  console.log(`Schema ${index + 1}:`, JSON.parse(script.textContent));
});
```

**Expected Output:** Should show Event and Organization schemas with proper structure:

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Всемирное публичное собрание",
  "description": "...",
  "startDate": "2025-12-15T09:00:00Z",
  "endDate": "2025-12-17T18:00:00Z",
  "location": {
    "@type": "Place",
    "name": "Москва, Россия"
  },
  "image": "https://images.unsplash.com/...",
  "url": "https://worldpublicsummit.test/ru/"
}
```

**Expected Result:** ✓ Schemas properly formatted and validate

---

### 1.3 Robots.txt Testing

**Test: Verify robots.txt Configuration**

1. Open https://worldpublicsummit.test/robots.txt
2. Verify content:

```
User-agent: *
Allow: /
Allow: /ru/
Allow: /en/

Disallow: /admin/
Disallow: /api/
Disallow: /private/

Sitemap: https://worldpublicsummit.test/sitemap.xml
Sitemap: https://worldpublicsummit.test/sitemap-ru.xml
Sitemap: https://worldpublicsummit.test/sitemap-en.xml
```

**Expected Result:** ✓ robots.txt accessible and properly configured

---

### 1.4 Sitemap Testing

**Test: Check Sitemap Index**

1. Open https://worldpublicsummit.test/sitemap.xml
2. Should see sitemap index with links to:
   - /sitemap-ru.xml (Russian sitemap)
   - /sitemap-en.xml (English sitemap)
3. Verify lastmod timestamps are current

**Expected Result:** ✓ Sitemap index returns valid XML

---

**Test: Validate Language-Specific Sitemaps**

1. Open https://worldpublicsummit.test/sitemap-ru.xml
2. Verify XML structure contains:
   - Static pages: /, /program, /press-center, /participants, /partners, /hotels
   - URLs with /ru/ prefix
   - lastmod, changefreq, priority attributes
   - HTML entities properly escaped

3. Open https://worldpublicsummit.test/sitemap-en.xml
4. Verify same structure with /en/ prefix URLs

**Expected Result:** ✓ Both sitemaps valid, URLs properly formatted

---

## 2. Automated Testing Tools

### 2.1 Google Rich Results Test

**Purpose:** Validate JSON-LD schemas are recognized by Google

1. Go to https://search.google.com/test/rich-results
2. Enter: https://worldpublicsummit.test/ru/
3. Click "Test URL"

**Expected Results:**
- ✓ No errors detected
- ✓ Event schema detected
- ✓ Organization schema detected
- ✓ Breadcrumb schema (when added)

**Common Issues & Fixes:**
- Missing required fields in schema → Add to seo.ts generators
- Invalid dates → Use ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
- Incorrect JSON structure → Validate with JSON Schema validator

---

### 2.2 XML Sitemap Validator

**Purpose:** Verify sitemap XML is well-formed

**Online Tools:**
- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- https://www.screaming-frog.co.uk/

**Test Steps:**
1. Go to XML validator
2. Enter: https://worldpublicsummit.test/sitemap.xml
3. Click validate

**Expected Result:** ✓ "Valid sitemap"

---

### 2.3 Mobile-Friendly Test

**Purpose:** Ensure SEO tags work on mobile

1. Go to https://search.google.com/test/mobile-friendly
2. Enter: https://worldpublicsummit.test/ru/
3. Click "Test URL"

**Expected Result:** ✓ "Page is mobile friendly"

---

### 2.4 Lighthouse SEO Audit

**Purpose:** Comprehensive SEO score from Google

1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "SEO" category
4. Click "Analyze page load"

**Expected Scores:**
- ✓ 90+ (Good) for properly implemented SEO
- Common issues to fix:
  - Missing meta description
  - Missing canonical URL
  - Invalid hreflang tags
  - Images without alt text

---

## 3. Implementation Verification

### 3.1 Code Review Checklist

- [ ] **useSEO Hook** exists in `src/hooks/useSEO.ts`
  - [ ] Updates canonical links dynamically
  - [ ] Updates hreflang tags for language switching
  - [ ] Sets document.title
  - [ ] Updates meta description, keywords
  - [ ] Updates Open Graph tags
  - [ ] Updates Twitter Card tags

- [ ] **SEO Utils** exist in `src/utils/seo.ts`
  - [ ] generateCanonicalUrl() function
  - [ ] generateAlternateLanguageUrl() function
  - [ ] generateEventSchema() for Event pages
  - [ ] generateOrganizationSchema() for homepage

- [ ] **Pages Updated:**
  - [ ] HomePage.tsx - imports useSEO and Helmet
  - [ ] ProgramPage.tsx - SEO config added
  - [ ] NewsPage.tsx - Dynamic SEO for articles
  - [ ] PressCenterPage.tsx - Press center SEO

- [ ] **Backend Routes** in `routes/web.php`
  - [ ] GET /sitemap.xml → SitemapController@index
  - [ ] GET /sitemap-ru.xml → SitemapController@russian
  - [ ] GET /sitemap-en.xml → SitemapController@english

- [ ] **SitemapController** created with:
  - [ ] Proper XML generation
  - [ ] Language-specific URL patterns
  - [ ] Dynamic content from models
  - [ ] Correct Content-Type headers

---

### 3.2 Build Verification

```bash
# Frontend build check
cd wps-frontend
npm run build

# Expected output:
# ✓ 1676 modules transformed
# ✓ built in ~1.1s
# No errors or warnings
```

---

## 4. Performance Testing

### 4.1 Page Load Speed

1. Open https://worldpublicsummit.test/ru/
2. Open DevTools → Network tab
3. Record page load
4. Check:
   - Total page size
   - Load time
   - Number of requests
   - HTML size (should be minimal for SPA)

**Targets:**
- ✓ Page load < 3 seconds
- ✓ HTML < 2 kB
- ✓ Total CSS < 150 kB
- ✓ Total JS < 500 kB (gzipped 130 kB)

---

### 4.2 SEO Score Tracking

**Setup Google Search Console:**

1. Go to https://search.google.com/search-console
2. Add property: https://worldpublicsummit.test
3. Verify ownership via DNS/HTML file
4. Submit sitemaps:
   - /sitemap.xml
   - /sitemap-ru.xml
   - /sitemap-en.xml

**Monitor:**
- Pages indexed (target: 50+ pages within 30 days)
- Coverage issues
- Mobile usability
- Core Web Vitals
- Search appearance

---

## 5. Troubleshooting Guide

### Issue: Meta tags not updating on language switch

**Diagnosis:**
- Check useEffect dependencies in useSEO hook
- Verify locale context is properly updated
- Check browser console for JavaScript errors

**Solution:**
- Ensure `[config, canonicalUrl, alternateUrl, locale]` in dependencies
- Test locale context: `console.log(useLocale())`
- Clear browser cache (Ctrl+Shift+Delete)

---

### Issue: Sitemap returns 404

**Diagnosis:**
- Route not registered
- Controller not found
- Base URL incorrect

**Solution:**
```bash
# Verify routes registered
php artisan route:list | grep sitemap

# Check controller exists
ls app/Http/Controllers/SitemapController.php

# Verify base URL in controller
# Update $baseUrl property if needed
```

---

### Issue: JSON-LD schema not validated

**Diagnosis:**
- Invalid JSON structure
- Missing required fields
- HTML entity encoding issue

**Solution:**
- Use https://jsonlint.com to validate JSON
- Check required fields for each schema type:
  - Event: name, startDate, endDate, location, url
  - Organization: name, url, logo, contactPoint
- Ensure dates in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ

---

### Issue: hreflang tags not working

**Diagnosis:**
- Incorrect language code (should be 'ru' or 'en', not 'RU' or 'EN')
- Canonical URL incorrect
- Missing x-default hreflang

**Solution:**
- Check locale values are lowercase
- Verify canonical URL matches pathname
- Add x-default hreflang pointing to language-agnostic URL

---

## 6. Monitoring & Maintenance

### Weekly Tasks
- [ ] Check Google Search Console for new errors
- [ ] Monitor page indexation
- [ ] Review search queries and impressions
- [ ] Check for crawl errors in robots.txt

### Monthly Tasks
- [ ] Run Lighthouse audit on top 5 pages
- [ ] Validate all JSON-LD schemas
- [ ] Check mobile-friendly status
- [ ] Review Core Web Vitals scores

### Quarterly Tasks
- [ ] Comprehensive SEO audit
- [ ] Keyword ranking tracking
- [ ] Competitor analysis
- [ ] Content optimization opportunities

---

## 7. SEO Metrics Dashboard

Track these KPIs for SEO success:

| Metric | Target | Frequency | Tool |
|--------|--------|-----------|------|
| Pages Indexed | 50+ | Monthly | GSC |
| Organic Impressions | 1000+ | Monthly | GSC |
| Click-Through Rate | 3%+ | Monthly | GSC |
| Avg. Position | Top 10 | Monthly | GSC |
| Core Web Vitals | "Good" | Weekly | PageSpeed |
| Mobile Usability | 0 issues | Weekly | GSC |
| Crawl Errors | 0 | Weekly | GSC |
| Schema Validation | 100% | Monthly | Rich Results |

---

## 8. Implementation Timeline

**Already Completed:**
- ✓ Phase 1: React Helmet infrastructure
- ✓ Phase 2: SEO configuration for 4 key pages
- ✓ Phase 3: Dynamic sitemap endpoints
- ✓ robots.txt configuration

**Next Steps (Phase 4):**
- [ ] Google Search Console setup
- [ ] Submit sitemaps to GSC
- [ ] Add SEO to remaining pages (Partners, Participants, Hotels)
- [ ] Implement breadcrumb schema
- [ ] Add FAQ schema for FAQs
- [ ] Monitor indexation and search performance
- [ ] Content optimization based on keywords
- [ ] Link building strategy
- [ ] Local SEO optimization

---

## Contact & Resources

**Documentation:**
- SEO Strategy: SEO_OPTIMIZATION_STRATEGY.md
- Quick Start: SEO_QUICK_START_EXAMPLES.md
- Implementation: SEO_IMPLEMENTATION_SUMMARY.md

**External Resources:**
- Google Search Central: https://developers.google.com/search
- Schema.org: https://schema.org
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Google Search Console: https://search.google.com/search-console

---

**Last Updated:** December 25, 2025
**Version:** 1.0
**Status:** Phase 3 Testing Guide Complete
