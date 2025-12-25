/**
 * SEO Utilities for generating schema markup and managing URLs
 * Date: December 25, 2025
 */

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

const BASE_URL = 'https://worldpublicsummit.test';

export function generateCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.replace(/^\/(ru|en)/, '');
  return BASE_URL + (cleanPath || '/');
}

export function generateAlternateLanguageUrl(pathname: string, locale: 'ru' | 'en'): string {
  const cleanPath = pathname.replace(/^\/(ru|en)/, '');
  return BASE_URL + '/' + locale + (cleanPath || '');
}

export function generateEventSchema(eventData: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: eventData.name,
    description: eventData.description,
    image: eventData.image || (BASE_URL + '/og-image.jpg'),
    startDate: eventData.startDate,
    endDate: eventData.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: eventData.location,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'RU',
        addressLocality: 'Moscow'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: eventData.organizerName || 'World Public Assembly',
      url: eventData.url || BASE_URL
    }
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'World Public Assembly',
    url: BASE_URL,
    logo: BASE_URL + '/assets/logo.svg',
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
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU',
      addressLocality: 'Moscow'
    }
  };
}

export function generateArticleSchema(articleData: any) {
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
    },
    publisher: {
      '@type': 'Organization',
      name: 'World Public Assembly',
      logo: {
        '@type': 'ImageObject',
        url: BASE_URL + '/assets/logo.svg'
      }
    }
  };
}

export function generateBreadcrumbSchema(breadcrumbs: any[]) {
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

export function generateFAQSchema(faqs: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function schemaToJsonLd(schema: any): string {
  return JSON.stringify(schema);
}
