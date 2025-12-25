import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type Locale = 'ru' | 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (data: { ru?: string; en?: string } | string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Constants for localStorage and defaults
const LOCALE_STORAGE_KEY = 'wps_locale';
const DEFAULT_LOCALE: Locale = 'ru';

// Utility function to safely access localStorage
const getStoredLocale = (): Locale | null => {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === 'en' || saved === 'ru') {
      return saved;
    }
  } catch (e) {
    console.warn('localStorage not available:', e);
  }
  return null;
};

const setStoredLocale = (locale: Locale): void => {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch (e) {
    console.warn('Failed to save locale to localStorage:', e);
  }
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Normalize locale from URL (ensure it's 'ru' or 'en')
  const normalizeLocale = (loc: string | undefined): Locale => {
    if (loc === 'en') return 'en';
    return DEFAULT_LOCALE;
  };

  // Extract locale from URL pathname (e.g., "/en/press-center" -> "en")
  // This works reliably because it doesn't depend on useParams timing
  const extractLocaleFromPathname = (): Locale => {
    const pathname = location.pathname;
    if (pathname.startsWith('/en')) return 'en';
    if (pathname.startsWith('/ru')) return 'ru';
    return DEFAULT_LOCALE;
  };

  // Get initial locale with priority: URL pathname > localStorage > browser language > default
  const getInitialLocale = (): Locale => {
    // Priority 1: URL pathname (extracted directly)
    const pathnameLocale = extractLocaleFromPathname();
    if (pathnameLocale !== DEFAULT_LOCALE) {
      setStoredLocale(pathnameLocale);
      return pathnameLocale;
    }

    // Priority 2: Saved in localStorage
    const stored = getStoredLocale();
    if (stored) {
      return stored;
    }

    // Priority 3: Browser language preference
    try {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        setStoredLocale('en');
        return 'en';
      }
    } catch (e) {
      console.warn('Could not determine browser language:', e);
    }

    // Priority 4: Default locale
    setStoredLocale(DEFAULT_LOCALE);
    return DEFAULT_LOCALE;
  };

  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  // Sync state with URL pathname changes (more reliable than useParams)
  useEffect(() => {
    const pathnameLocale = extractLocaleFromPathname();
    if (pathnameLocale !== locale) {
      setLocaleState(pathnameLocale);
      setStoredLocale(pathnameLocale);
    }
  }, [location.pathname, locale]);

  // Handle locale change and navigate to new URL with new locale
  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return; // No change needed

    setLocaleState(newLocale);
    setStoredLocale(newLocale);

    // Get current pathname without locale prefix
    let currentPath = location.pathname;

    // Remove existing locale prefix if present
    if (currentPath.startsWith('/ru/') || currentPath.startsWith('/en/')) {
      currentPath = currentPath.substring(3);
    } else if (currentPath === '/ru' || currentPath === '/en') {
      currentPath = '/';
    }

    // Navigate to path with new locale prefix
    const newPath = currentPath === '/' ? `/${newLocale}` : `/${newLocale}${currentPath}`;
    navigate(newPath);
  };

  const t = (data: { ru?: string; en?: string } | string): string => {
    if (typeof data === 'string') return data;
    if (!data) return '';
    return data[locale] || data['en'] || data['ru'] || '';
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
