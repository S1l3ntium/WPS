import { useLocale } from '../context/LocaleContext';
import { translations } from './translations';
import { useCallback } from 'react';

type LocaleKey = 'ru' | 'en';
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<(typeof translations)['ru']>;

/**
 * Get translation by key path (e.g., "nav.about", "buttons.participate")
 */
function getTranslation(locale: LocaleKey, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  if (!value || typeof value !== 'string') {
    console.warn(`Translation key not found: ${key}`);
    // Fallback to key itself
    return key;
  }

  return value;
}

export function useTranslation() {
  const { locale } = useLocale();

  // Memoize the translation function to prevent unnecessary useEffect triggers
  const t = useCallback(
    (key: TranslationKey): string => getTranslation(locale as LocaleKey, key),
    [locale]
  );

  return {
    t,
    locale,
  };
}
