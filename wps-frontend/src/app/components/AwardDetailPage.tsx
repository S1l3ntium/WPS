import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { awardsAPI, AwardData, getLocalized } from '../../services/api';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { useSEO } from '../../hooks/useSEO';

export function AwardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useTranslation();
  const localeNavigate = useLocaleNavigate();
  const [award, setAward] = useState<AwardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useSEO({
    title: award ? getLocalized(award.title, locale as 'ru' | 'en') : t('awardPage.pageTitle'),
    description: award ? getLocalized(award.description, locale as 'ru' | 'en') : '',
  });

  useEffect(() => {
    const loadAward = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) {
          setError(t('common.notFound'));
          return;
        }
        const data = await awardsAPI.getById(Number(id));
        setAward(data);
      } catch (err) {
        console.error('Failed to load award:', err);
        setError(t('common.error'));
      } finally {
        setLoading(false);
      }
    };

    loadAward();
  }, [id, t]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-dvh bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-gray-600">{t('common.loading')}</div>
        </main>
      </div>
    );
  }

  if (error || !award) {
    return (
      <div className="flex flex-col min-h-dvh bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">{error || t('common.noData')}</p>
            <button
              onClick={() => localeNavigate('/award')}
              className="text-[#4db8b8] hover:underline"
            >
              {t('buttons.back')}
            </button>
          </div>
        </main>
      </div>
    );
  }

  const title = getLocalized(award.title, locale as 'ru' | 'en');
  const description = getLocalized(award.description, locale as 'ru' | 'en');
  const winnerBio = getLocalized(award.winnerBio, locale as 'ru' | 'en');

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <button 
            onClick={() => localeNavigate('/')} 
            className="hover:text-[#4db8b8] transition-colors"
          >
            {t('common.home')}
          </button>
          <span>/</span>
          <button 
            onClick={() => localeNavigate('/award')} 
            className="hover:text-[#4db8b8] transition-colors"
          >
            {t('awardPage.pageTitle')}
          </button>
          <span>/</span>
          <span className="text-[#4db8b8]">{title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Image */}
            {award.image && (
              <div className="md:col-span-1">
                <img
                  src={award.image}
                  alt={title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Content */}
            <div className={award.image ? 'md:col-span-2' : 'md:col-span-3'}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#1a1f4d]">
                {title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">{t('awardPage.year')}</p>
                  <p className="text-lg font-semibold text-[#4db8b8]">{award.awardYear}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('awardPage.type')}</p>
                  <p className="text-lg font-semibold text-[#4db8b8]">{award.awardType}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-[#1a1f4d] mb-3">{t('awardPage.winner')}</h2>
                <p className="text-lg font-semibold text-gray-800 mb-3">{award.winnerName}</p>
                {winnerBio && (
                  <p className="text-gray-700">{winnerBio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      {description && (
        <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#1a1f4d]">
              {t('awardPage.description')}
            </h2>
            <div className="prose prose-sm sm:prose max-w-none text-gray-700">
              <p>{description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Achievement Section */}
      {award.achievement && (
        <section className="py-8 sm:py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#1a1f4d]">
              {t('awardPage.achievement')}
            </h2>
            <div className="prose prose-sm sm:prose max-w-none text-gray-700">
              <p>{getLocalized(award.achievement, locale as 'ru' | 'en')}</p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
