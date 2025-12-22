import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';

export function useLocaleNavigate() {
  const navigate = useNavigate();
  const { locale } = useLocale();

  return (path: string) => {
    // If path already starts with /ru or /en, navigate as-is
    if (path.startsWith('/ru') || path.startsWith('/en')) {
      navigate(path);
    } else {
      // Otherwise prepend locale
      navigate(`/${locale}${path}`);
    }
  };
}
