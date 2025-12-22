import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

type Locale = 'ru' | 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (data: { ru?: string; en?: string } | string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { locale: urlLocale } = useParams<{ locale?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Normalize locale from URL (ensure it's 'ru' or 'en')
  const normalizeLocale = (loc: string | undefined): Locale => {
    if (loc === 'en') return 'en';
    return 'ru';
  };

  // Get initial locale from URL or localStorage
  const getInitialLocale = (): Locale => {
    if (urlLocale) {
      return normalizeLocale(urlLocale);
    }
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved && (saved === 'en' || saved === 'ru')) {
      return saved;
    }
    return 'ru';
  };

  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  // Update locale when URL changes
  useEffect(() => {
    const normalized = normalizeLocale(urlLocale);
    setLocaleState(normalized);
  }, [urlLocale]);

  // Handle locale change and navigate to new URL with new locale
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Persist to localStorage
    localStorage.setItem('locale', newLocale);

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
