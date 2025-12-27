import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { useTranslation } from '../../i18n/useTranslation';
import { Header } from './Header';

export function AboutPage() {
  const navigate = useLocaleNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header currentPage="about" />

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-16">
        {/* Title */}
        <h1 className="text-[#1a1f4d] text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">{t('aboutPage.title')}</h1>

        {/* Text Content */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6 text-[#1a1f4d] text-sm sm:text-base leading-relaxed mb-8 sm:mb-12 md:mb-16">
          <p>
            {t('aboutPage.text1')}
          </p>

          <p>
            {t('aboutPage.text2')}
          </p>

          <p>
            {t('aboutPage.text3')}
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <h2 className="text-[#4db8b8] text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">{t('aboutPage.joinUsTitle')}</h2>

          <p className="text-[#1a1f4d] text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
            {t('aboutPage.joinUsText')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/participants')}
              className="w-full sm:w-auto bg-[#1a1f4d] text-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded text-xs sm:text-sm font-medium hover:bg-[#2a2f5d] transition-colors"
            >
              {t('aboutPage.participate')}
            </button>
            <button
              onClick={() => navigate('/partners')}
              className="w-full sm:w-auto bg-white text-[#1a1f4d] px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded border-2 border-[#1a1f4d] text-xs sm:text-sm font-medium hover:bg-[#f5f5f5] transition-colors"
            >
              {t('aboutPage.becomePartner')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}