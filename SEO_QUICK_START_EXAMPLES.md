# SEO Quick Start - Implementation Examples

**Date:** December 25, 2025  
**Purpose:** Ready-to-use code examples for SEO implementation  
**Status:** Complete reference for developers

---

## 1. React Helmet Setup

### Step 1: Install Package
```bash
cd wps-frontend
npm install react-helmet-async
npm install --save-dev @types/react-helmet-async
```

### Step 2: Update main.tsx
```typescript
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./app/App.tsx";
import { ErrorBoundary } from "./app/ErrorBoundary.tsx";
import { LocaleProvider } from "./context/LocaleContext.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <HelmetProvider>
      <BrowserRouter>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </BrowserRouter>
    </HelmetProvider>
  </ErrorBoundary>
);
```

---

## 2. SEO Utilities

### Create: src/utils/seo.ts
```typescript
import { useLocale } from '../context/LocaleContext';
import { useLocation } from 'react-router-dom';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'event';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export function generateCanonicalUrl(pathname: string): string {
  const baseUrl = 'https://worldpublicsummit.test';
  // Remove locale prefix for canonical (canonical should be language-agnostic)
  const cleanPath = pathname.replace(/^\/(ru|en)/, '');
  return `${baseUrl}${cleanPath || '/'}`;
}

export function generateAlternateLanguageUrl(pathname: string, locale: 'ru' | 'en'): string {
  const baseUrl = 'https://worldpublicsummit.test';
  let cleanPath = pathname.replace(/^\/(ru|en)/, '');
  return `${baseUrl}/${locale}${cleanPath || ''}`;
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

export function generateEventSchema(eventData: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: eventData.name,
    description: eventData.description,
    image: eventData.image || 'https://worldpublicsummit.test/og-image.jpg',
    startDate: eventData.startDate,
    endDate: eventData.endDate,
    location: {
      '@type': 'Place',
      name: eventData.location
    },
    url: eventData.url || 'https://worldpublicsummit.test',
    organizer: {
      '@type': 'Organization',
      name: 'Eurasian Peoples Assembly',
      url: 'https://worldpublicsummit.test'
    }
  };
}

export function generateArticleSchema(articleData: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: articleData.headline,
    description: articleData.description,
    image: articleData.image,
    datePublished: articleData.datePublished,
    dateModified: articleData.dateModified || articleData.datePublished,
    author: {
      '@type': 'Organization',
      name: articleData.author || 'World Public Assembly'
    }
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'World Public Assembly',
    url: 'https://worldpublicsummit.test',
    logo: 'https://worldpublicsummit.test/assets/logo.svg',
    description: 'International communication platform for global dialogue',
    sameAs: [
      'https://facebook.com/worldpublicassembly',
      'https://twitter.com/wpa2025',
      'https://instagram.com/worldpublicassembly'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-495-197-67-79',
      contactType: 'Customer Service'
    }
  };
}
```

---

## 3. SEO Hook

### Create: src/hooks/useSEO.ts
```typescript
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { 
  SEOConfig, 
  generateCanonicalUrl, 
  generateAlternateLanguageUrl 
} from '../utils/seo';

export function useSEO(config: SEOConfig) {
  const location = useLocation();
  const { locale } = useLocale();

  // Auto-generate canonical URL if not provided
  const canonicalUrl = config.canonicalUrl || generateCanonicalUrl(location.pathname);
  const alternateUrl = generateAlternateLanguageUrl(
    location.pathname,
    locale === 'ru' ? 'en' : 'ru'
  );

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      {config.keywords && (
        <meta name="keywords" content={config.keywords.join(', ')} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate Language Links */}
      <link rel="alternate" hreflang={locale === 'ru' ? 'en' : 'ru'} href={alternateUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={config.ogType || 'website'} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:url" content={canonicalUrl} />
      {config.image && <meta property="og:image" content={config.image} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      {config.image && <meta name="twitter:image" content={config.image} />}

      {/* Article Specific Tags */}
      {config.article && (
        <>
          <meta property="article:published_time" content={config.article.publishedTime} />
          {config.article.modifiedTime && (
            <meta property="article:modified_time" content={config.article.modifiedTime} />
          )}
          {config.article.authors?.map((author) => (
            <meta key={author} property="article:author" content={author} />
          ))}
          {config.article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Breadcrumb Schema */}
      {config.breadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: config.breadcrumbs.map((crumb, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: crumb.name,
              item: crumb.url
            }))
          })}
        </script>
      )}
    </Helmet>
  );
}
```

---

## 4. HomePage SEO Example

### Update: src/app/components/HomePage.tsx
```typescript
import { useSEO } from '../../hooks/useSEO';
import { generateEventSchema, generateOrganizationSchema } from '../../utils/seo';
import { useTranslation } from '../../i18n/useTranslation';

export function HomePage() {
  const { t, locale } = useTranslation();

  const seoConfig = {
    title: locale === 'ru' 
      ? 'Первая Всемирная Общественная Ассамблея 2025 | Новый мир осознанного единства'
      : 'World Public Assembly 2025 | New World of Conscious Unity',
    
    description: locale === 'ru'
      ? 'Новая международная коммуникационная площадка поиска смыслов общего будущего. Москва, 20-21 сентября 2025'
      : 'International communication platform for finding meanings of our common future. Moscow, September 20-21, 2025',
    
    keywords: locale === 'ru'
      ? ['Всемирная Ассамблея', 'международная конференция', 'Москва 2025', 'осознанное единство']
      : ['World Assembly', 'international conference', 'Moscow 2025', 'conscious unity'],
    
    image: 'https://worldpublicsummit.test/og-home.jpg',
    ogType: 'website'
  };

  useSEO(seoConfig);

  // Add schema markup
  const eventSchema = generateEventSchema({
    name: locale === 'ru' 
      ? 'Первая Всемирная Общественная Ассамблея 2025'
      : 'First World Public Assembly 2025',
    description: seoConfig.description,
    startDate: '2025-09-20T09:00:00Z',
    endDate: '2025-09-21T18:00:00Z',
    location: 'CMT Congress Center, Moscow',
    image: 'https://worldpublicsummit.test/og-home.jpg',
    url: 'https://worldpublicsummit.test'
  });

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(eventSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Rest of component */}
      <div>
        <h1>{t('homePage.mainTitle')}</h1>
        {/* ... */}
      </div>
    </>
  );
}
```

---

## 5. NewsPage SEO Example

### Update: src/app/components/NewsPage.tsx
```typescript
import { useSEO } from '../../hooks/useSEO';
import { generateArticleSchema } from '../../utils/seo';

export function NewsPage() {
  const { newsId } = useParams<{ newsId: string }>();
  const [news, setNews] = useState(null);

  // ... fetch news data

  const seoConfig = news ? {
    title: news.title,
    description: news.excerpt,
    keywords: news.tags || [],
    image: news.image,
    ogType: 'article' as const,
    article: {
      publishedTime: news.publishedAt,
      modifiedTime: news.updatedAt,
      authors: [news.author],
      tags: news.tags
    },
    breadcrumbs: [
      { name: 'Home', url: 'https://worldpublicsummit.test' },
      { name: 'News', url: 'https://worldpublicsummit.test/press-center' },
      { name: news.title, url: `https://worldpublicsummit.test/news/${newsId}` }
    ]
  } : null;

  if (seoConfig) {
    useSEO(seoConfig);
    
    const articleSchema = generateArticleSchema({
      headline: news.title,
      description: news.excerpt,
      image: news.image,
      datePublished: news.publishedAt,
      dateModified: news.updatedAt,
      author: news.author
    });

    return (
      <>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        {/* Rest of component */}
      </>
    );
  }

  return <div>Loading...</div>;
}
```

---

## 6. robots.txt

### Create: wps-frontend/public/robots.txt
```
User-agent: *
Allow: /
Allow: /ru/
Allow: /en/

Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /*?*sort=
Disallow: /*?*filter=

# Crawl delay
Crawl-delay: 1

# Sitemaps
Sitemap: https://worldpublicsummit.test/sitemap.xml
Sitemap: https://worldpublicsummit.test/sitemap-ru.xml
Sitemap: https://worldpublicsummit.test/sitemap-en.xml
Sitemap: https://worldpublicsummit.test/sitemap-images.xml
```

---

## 7. Sitemap Generation

### Create: src/utils/sitemap.ts
```typescript
import { XMLBuilder } from 'fast-xml-parser';

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: Array<{ hreflang: string; href: string }>;
}

export function generateSitemap(entries: SitemapEntry[]): string {
  const builder = new XMLBuilder({ ignoreAttributes: false });

  const urlset = {
    '?xml': { version: '1.0', encoding: 'UTF-8' },
    urlset: {
      '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      '@_xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
      url: entries.map(entry => ({
        loc: entry.url,
        lastmod: entry.lastmod,
        changefreq: entry.changefreq || 'weekly',
        priority: entry.priority || 0.5,
        ...(entry.alternates && {
          'xhtml:link': entry.alternates.map(alt => ({
            '@_rel': 'alternate',
            '@_hreflang': alt.hreflang,
            '@_href': alt.href
          }))
        })
      }))
    }
  };

  return builder.build(urlset);
}

export function generateImageSitemap(images: Array<{
  loc: string;
  title?: string;
  caption?: string;
}>): string {
  const builder = new XMLBuilder({ ignoreAttributes: false });

  const urlset = {
    '?xml': { version: '1.0', encoding: 'UTF-8' },
    urlset: {
      '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      '@_xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
      url: images.map(img => ({
        loc: img.loc,
        'image:image': {
          'image:loc': img.loc,
          ...(img.title && { 'image:title': img.title }),
          ...(img.caption && { 'image:caption': img.caption })
        }
      }))
    }
  };

  return builder.build(urlset);
}

// Predefined sitemap entries for all pages
export const defaultSitemapEntries: SitemapEntry[] = [
  {
    url: 'https://worldpublicsummit.test/ru/',
    priority: 1.0,
    changefreq: 'weekly',
    alternates: [{ hreflang: 'en', href: 'https://worldpublicsummit.test/en/' }]
  },
  {
    url: 'https://worldpublicsummit.test/ru/program',
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    url: 'https://worldpublicsummit.test/ru/press-center',
    priority: 0.8,
    changefreq: 'daily'
  },
  {
    url: 'https://worldpublicsummit.test/ru/participants',
    priority: 0.8,
    changefreq: 'weekly'
  },
  {
    url: 'https://worldpublicsummit.test/ru/partners',
    priority: 0.7,
    changefreq: 'weekly'
  },
  {
    url: 'https://worldpublicsummit.test/ru/award',
    priority: 0.7,
    changefreq: 'monthly'
  },
  // ... English versions
];
```

---

## 8. Lighthouse SEO Check Commands

### Run Lighthouse SEO Audit
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Audit SEO
lighthouse https://worldpublicsummit.test --only-categories=seo

# Full audit with output
lighthouse https://worldpublicsummit.test --output-path=./lighthouse-report.html
```

---

## 9. Structured Data Validation

### Test Tools
```
Google Structured Data Testing Tool:
https://developers.google.com/search/docs/advanced/structured-data

Rich Results Test:
https://search.google.com/test/rich-results

Schema Validator:
https://validator.schema.org/
```

---

## 10. Testing Checklist

### Before Going Live
- [ ] React Helmet installed and configured
- [ ] Helmet Provider wraps entire app in main.tsx
- [ ] robots.txt created in public folder
- [ ] Sitemap generated and accessible
- [ ] Each page has unique title/description
- [ ] Hreflang tags on all pages
- [ ] JSON-LD schema on homepage
- [ ] OG tags with images
- [ ] Twitter cards implemented
- [ ] Lighthouse SEO score > 90
- [ ] Mobile-friendly test passing
- [ ] Rich results test passing for schema
- [ ] Google Search Console setup
- [ ] Analytics tracking installed

---

**Quick Implementation Steps:**

1. **Day 1:** Install packages, update main.tsx, create utils
2. **Day 2:** Create useSEO hook, update 2-3 pages
3. **Day 3:** robots.txt, sitemap generation, breadcrumbs
4. **Day 4:** Add schema markup to all pages
5. **Day 5:** Testing, validation, submission to Search Console

