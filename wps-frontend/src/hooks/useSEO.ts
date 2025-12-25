import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { 
  SEOConfig, 
  generateCanonicalUrl, 
  generateAlternateLanguageUrl 
} from '../utils/seo';

/**
 * Hook to manage SEO meta tags for a page
 * Returns Helmet component with proper meta tags configured
 */
export function useSEO(config: SEOConfig) {
  const location = useLocation();
  const { locale } = useLocale();

  const canonicalUrl = config.canonicalUrl || generateCanonicalUrl(location.pathname);
  const alternateUrl = generateAlternateLanguageUrl(
    location.pathname,
    locale === 'ru' ? 'en' : 'ru'
  );

  // Return a tuple: [HelmetComponent, schemaScripts]
  const helmet = () => (
    <Helmet>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      {config.keywords && (
        <meta name="keywords" content={config.keywords.join(', ')} />
      )}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hreflang={locale === 'ru' ? 'en' : 'ru'} href={alternateUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />
      <meta property="og:type" content={config.ogType || 'website'} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:url" content={canonicalUrl} />
      {config.image && <meta property="og:image" content={config.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      {config.image && <meta name="twitter:image" content={config.image} />}
    </Helmet>
  );

  return helmet();
}
