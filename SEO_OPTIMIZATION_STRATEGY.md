# SEO Optimization Strategy - World Public Assembly Website

**Date:** December 25, 2025  
**Current Status:** 🟡 Basic SEO setup exists, needs comprehensive optimization  
**Priority:** High - Multi-language site needs advanced SEO implementation

---

## Current State Analysis

### ✅ What's Already Done
```
✓ Basic meta tags in index.html
✓ OG (Open Graph) tags for social sharing
✓ Canonical URL
✓ Favicon
✓ Russian and English versions available
✓ Proper URL structure with /ru/ and /en/ prefixes
```

### ❌ Critical Gaps
```
✗ No dynamic page title/meta tags per route
✗ No structured data (JSON-LD, Schema.org)
✗ No robots.txt or sitemap.xml
✗ No hreflang tags for multi-language support
✗ No Open Graph images
✗ No Twitter Card tags
✗ Static home meta only (no per-page SEO)
✗ No canonical URL management for duplicate content
✗ No breadcrumb schema
✗ No FAQ schema for FAQ pages
```

---

## SEO Strategy Overview

### Phase 1: Core Infrastructure (PRIORITY HIGH)
**Goal:** Set up foundational SEO system

#### 1.1 React Helmet Integration
- Install `react-helmet-async`
- Create SEO management system
- Dynamic page title/description per route
- Meta tags for each page

#### 1.2 Structured Data (JSON-LD)
- Schema.org markup
- Event schema (for conference)
- Organization schema
- BreadcrumbList schema
- FAQPage schema
- NewsArticle schema (for news pages)

#### 1.3 Multi-Language SEO
- Implement hreflang tags (for /ru/ ↔ /en/)
- Alternate language meta tags
- Proper URL structure verification
- Language-specific sitemap

#### 1.4 Technical SEO Files
- robots.txt (with sitemap path)
- sitemap.xml (dynamic)
- sitemap-ru.xml (Russian pages)
- sitemap-en.xml (English pages)

### Phase 2: Content Optimization (PRIORITY HIGH)
**Goal:** Optimize each page for search visibility

#### 2.1 Homepage SEO
- Compelling title/description
- H1 optimization
- Meta keywords (Russian + English)
- Featured keywords: "Всемирная Ассамблея", "World Public Assembly", "international conference"

#### 2.2 News/Article Pages
- Unique title per article
- Article publish date
- Author information
- Article schema markup

#### 2.3 Event Pages
- Event schema with dates/location
- Event JSON-LD
- Structured pricing info
- Availability markup

#### 2.4 Partner/Participant Pages
- Organization schema
- Local business schema
- Review/rating schema

### Phase 3: Advanced Features (PRIORITY MEDIUM)
**Goal:** Improve rankings and engagement metrics

#### 3.1 Open Graph Images
- Dynamic OG images per page
- Event-specific images
- Article preview images
- Brand image optimization

#### 3.2 Social Integration
- Twitter Card tags
- LinkedIn optimization
- Facebook sharing metadata
- WhatsApp preview optimization

#### 3.3 Performance SEO
- Core Web Vitals optimization
- Image lazy loading verification
- CSS/JS minification
- Font loading optimization

#### 3.4 Analytics Integration
- Google Analytics 4 setup
- Search Console integration
- Conversion tracking
- User behavior tracking

### Phase 4: Content Strategy (PRIORITY MEDIUM)
**Goal:** Improve organic visibility

#### 4.1 Keyword Research
- Primary keywords (conference, events, assembly)
- Long-tail keywords
- Local keywords (Moscow, venue)
- International keywords (English)

#### 4.2 Content Enhancement
- Internal linking strategy
- Breadcrumb navigation
- Related articles
- FAQ optimization

#### 4.3 Local SEO
- Google My Business optimization
- Local schema markup
- Address/contact optimization
- Location-based keywords

---

## Implementation Roadmap

### Week 1: Foundation
- [ ] Install react-helmet-async
- [ ] Create SEO configuration system
- [ ] Implement page title/description management
- [ ] Add basic schema markup

### Week 2: Multi-Language Support
- [ ] Implement hreflang tags
- [ ] Create dynamic sitemap
- [ ] Set up robots.txt
- [ ] Language canonicalization

### Week 3: Content Optimization
- [ ] Optimize each page for target keywords
- [ ] Add structured data to all pages
- [ ] Implement breadcrumb schema
- [ ] Add FAQ schema

### Week 4: Advanced Features
- [ ] Social media meta tags
- [ ] Open Graph images
- [ ] Analytics integration
- [ ] Search Console setup

---

## Detailed Implementation Plan

### 1. React Helmet Setup

**Files to Create:**
- `src/utils/seo.ts` - SEO utilities
- `src/hooks/useSEO.ts` - SEO hook
- `src/context/SEOContext.tsx` - SEO context
- `src/components/SEOHead.tsx` - SEO component

**Key Features:**
```typescript
interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  canonicalUrl?: string
  ogType?: string
  article?: {
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    tags?: string[]
  }
  breadcrumbs?: Array<{
    name: string
    url: string
  }>
}

function useSEO(config: SEOConfig) {
  // Sets page title, description, canonical, OG tags, etc.
}
```

### 2. Sitemap Generation

**Dynamic sitemap with:**
- All pages with lastmod
- Priority scores
- Change frequency
- Separate sitemaps for /ru/ and /en/
- Image sitemap for gallery

```typescript
// src/utils/sitemap.ts
export function generateSitemap() {
  return {
    homepage: { priority: 1.0, changefreq: 'weekly' },
    program: { priority: 0.9, changefreq: 'weekly' },
    news: { priority: 0.8, changefreq: 'daily' },
    // ... etc
  }
}
```

### 3. Schema Markup

**Implement:**
- Event schema (conference details, date, location)
- Organization schema (contact, logo, social profiles)
- BreadcrumbList (navigation structure)
- FAQPage (FAQ sections)
- NewsArticle (article pages)
- LocalBusiness (if applicable)

```typescript
// Example: Event Schema
const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "World Public Assembly 2025",
  "description": "...",
  "image": "...",
  "startDate": "2025-09-20T09:00:00Z",
  "endDate": "2025-09-21T18:00:00Z",
  "location": {
    "@type": "Place",
    "name": "CMT Congress Center",
    "address": "..."
  },
  "organizer": {...},
  "url": "https://worldpublicsummit.test/"
}
```

### 4. robots.txt

**Location:** `/public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://worldpublicsummit.test/sitemap.xml
Sitemap: https://worldpublicsummit.test/sitemap-ru.xml
Sitemap: https://worldpublicsummit.test/sitemap-en.xml
```

### 5. Hreflang Implementation

**For every page, add:**
```html
<link rel="alternate" hreflang="ru" href="https://worldpublicsummit.test/ru/..." />
<link rel="alternate" hreflang="en" href="https://worldpublicsummit.test/en/..." />
<link rel="alternate" hreflang="x-default" href="https://worldpublicsummit.test/" />
```

### 6. Page-Specific SEO Config

**Each page needs:**
```typescript
// HomePage.tsx
const seoConfig = {
  title: "World Public Assembly 2025 | New World of Conscious Unity",
  description: "International communication platform for finding meanings of common future...",
  keywords: ["world assembly", "international conference", "Moscow 2025"],
  image: "og-home.jpg",
  ogType: "website"
}

// ProgramPage.tsx
const seoConfig = {
  title: "Program | World Public Assembly 2025",
  description: "Full program schedule, sessions, speakers, and events...",
  keywords: ["program", "schedule", "sessions", "speakers"]
}

// NewsPage.tsx (single article)
const seoConfig = {
  title: articleData.title,
  description: articleData.excerpt,
  image: articleData.image,
  article: {
    publishedTime: articleData.publishedAt,
    modifiedTime: articleData.updatedAt,
    authors: [articleData.author],
    tags: articleData.tags
  }
}
```

---

## SEO Checklist by Page

### Homepage ✓ Priority
- [ ] Unique title/description
- [ ] H1 optimization
- [ ] Keyword targeting (conference, assembly)
- [ ] Event schema
- [ ] Organization schema
- [ ] OG tags with image
- [ ] Twitter cards

### Program Page ✓ Priority
- [ ] Title: "Program | [Event Name]"
- [ ] Structured event data
- [ ] Session schema for each session
- [ ] Speaker information markup
- [ ] BreadcrumbList

### News/Articles ✓ Priority
- [ ] Unique title per article
- [ ] Meta description from excerpt
- [ ] Article schema (author, date, etc.)
- [ ] OG image from article image
- [ ] Related articles
- [ ] Proper heading hierarchy

### Participants/Hotels ✓ Priority
- [ ] LocalBusiness schema
- [ ] Address/contact schema
- [ ] Review/rating markup
- [ ] Operating hours
- [ ] Hotel amenities

### Partners Page ✓ Priority
- [ ] Organization schema for each partner
- [ ] Logo/image URLs
- [ ] Partnership benefits highlighted
- [ ] Internal linking

### Awards/Competition ✓ Priority
- [ ] Event schema
- [ ] Participant criteria
- [ ] Prize information
- [ ] Application deadline (time-sensitive)

---

## Technical Implementation Details

### 1. Package Installation
```bash
npm install react-helmet-async
npm install --save-dev @types/react-helmet-async
```

### 2. Main.tsx Setup
```typescript
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </BrowserRouter>
  </HelmetProvider>
)
```

### 3. SEO Hook Example
```typescript
// src/hooks/useSEO.ts
import { Helmet } from 'react-helmet-async'

export function useSEO(config: SEOConfig) {
  return (
    <Helmet>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      {config.keywords && (
        <meta name="keywords" content={config.keywords.join(', ')} />
      )}
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      {config.image && <meta property="og:image" content={config.image} />}
      {config.canonicalUrl && <link rel="canonical" href={config.canonicalUrl} />}
      
      {/* Hreflang for multi-language */}
      <link rel="alternate" hreflang="en" href={config.canonicalUrl?.replace('/ru/', '/en/')} />
      <link rel="alternate" hreflang="ru" href={config.canonicalUrl?.replace('/en/', '/ru/')} />
    </Helmet>
  )
}
```

---

## Keywords Strategy

### Primary Keywords (High Priority)
```
Russian:
- "Всемирная Ассамблея"
- "Всемирная Общественная Ассамблея"
- "международная конференция"
- "Москва сентябрь 2025"
- "конференция 2025"

English:
- "World Public Assembly"
- "World Assembly 2025"
- "international conference"
- "Moscow conference"
- "global dialogue"
```

### Long-Tail Keywords
```
Russian:
- "программа Всемирной Ассамблеи 2025"
- "как стать участником конференции"
- "партнерство с Ассамблеей"
- "гранты и конкурсы 2025"

English:
- "World Assembly 2025 program"
- "how to participate in conference"
- "become a partner"
- "grants and competitions 2025"
```

---

## Metrics to Track

### Google Search Console
- Clicks from search results
- Impressions
- Average CTR
- Average ranking position
- Mobile vs Desktop performance

### Google Analytics 4
- Organic traffic sources
- Landing page performance
- Conversion paths
- User engagement
- Bounce rate by page

### Core Web Vitals
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

---

## Quick Wins (Implement First)

1. **Add React Helmet** (1 day)
   - Install package
   - Setup in main.tsx
   - Update 2-3 pages

2. **Create robots.txt** (30 min)
   - Add to public folder
   - Include sitemap paths

3. **Add JSON-LD Schema** (2 days)
   - Event schema for homepage
   - Organization schema
   - BreadcrumbList

4. **Update Meta Tags** (3 days)
   - Optimize each page title
   - Create unique descriptions
   - Add OG images

5. **Implement Hreflang** (1 day)
   - Add to all pages
   - Verify alternate language links

---

## Tools & Resources

### SEO Tools
- Google Search Console (ranking tracking)
- Google PageSpeed Insights (Core Web Vitals)
- Screaming Frog (site crawl)
- SEMrush/Ahrefs (competitive analysis)
- Yoast SEO (content optimization)

### Testing Tools
- Structured Data Testing Tool
- Mobile-Friendly Test
- Rich Results Test
- Open Graph Debugger

---

## Success Criteria

✅ Achieve within 3 months:
- 50% increase in organic traffic
- Top 10 ranking for primary keywords
- All pages have unique meta tags
- JSON-LD schema on 100% of pages
- 90+ Lighthouse SEO score
- Mobile-friendly (100%)
- Core Web Vitals passing

---

## Priority Order

### 🔴 CRITICAL (Week 1-2)
1. React Helmet setup
2. Page title/description optimization
3. Basic schema markup
4. robots.txt creation

### 🟠 HIGH (Week 3-4)
1. Multi-language hreflang tags
2. Dynamic sitemap generation
3. Structured data implementation
4. OG image optimization

### 🟡 MEDIUM (Month 2)
1. Advanced schema (FAQPage, etc.)
2. Social media optimization
3. Analytics integration
4. Content optimization

### 🟢 LOW (Month 3+)
1. Link building strategy
2. Local SEO optimization
3. Competitive analysis
4. Ongoing monitoring

---

**Status:** Ready for implementation

Next steps:
1. Approve strategy
2. Install packages
3. Begin Phase 1 implementation
4. Set up tracking in Google Search Console

