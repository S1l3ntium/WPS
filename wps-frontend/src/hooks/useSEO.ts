import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { 
  SEOConfig, 
  generateCanonicalUrl, 
  generateAlternateLanguageUrl 
} from '../utils/seo';

/**
 * Hook to manage SEO meta tags for a page
 * Updates canonical and hreflang tags based on current location and locale
 */
export function useSEO(config: SEOConfig) {
  const location = useLocation();
  const { locale } = useLocale();

  const canonicalUrl = config.canonicalUrl || generateCanonicalUrl(location.pathname);
  const alternateUrl = generateAlternateLanguageUrl(
    location.pathname,
    locale === 'ru' ? 'en' : 'ru'
  );

  useEffect(() => {
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // Update alternate language link
    let alternateLink = document.querySelector('link[rel="alternate"][hreflang]');
    if (!alternateLink) {
      alternateLink = document.createElement('link');
      alternateLink.rel = 'alternate';
      alternateLink.hreflang = locale === 'ru' ? 'en' : 'ru';
      document.head.appendChild(alternateLink);
    }
    alternateLink.href = alternateUrl;

    // Update title
    document.title = config.title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = config.description;

    // Update keywords if provided
    if (config.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = config.keywords.join(', ');
    }

    // Update Open Graph tags
    const ogTags = [
      { property: 'og:type', content: config.ogType || 'website' },
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:url', content: canonicalUrl },
    ];

    if (config.image) {
      ogTags.push({ property: 'og:image', content: config.image });
    }

    ogTags.forEach(tag => {
      let meta = document.querySelector(`meta[property="${tag.property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        document.head.appendChild(meta);
      }
      meta.content = tag.content;
    });

    // Update Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
    ];

    if (config.image) {
      twitterTags.push({ name: 'twitter:image', content: config.image });
    }

    twitterTags.forEach(tag => {
      let meta = document.querySelector(`meta[name="${tag.name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = tag.name;
        document.head.appendChild(meta);
      }
      meta.content = tag.content;
    });
  }, [config, canonicalUrl, alternateUrl, locale]);
}
