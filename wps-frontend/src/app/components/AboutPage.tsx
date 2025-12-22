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
      <div className="flex-1 max-w-4xl mx-auto px-8 py-16">
        {/* Title */}
        <h1 className="text-[#1a1f4d] mb-8">{t('aboutPage.title')}</h1>

        {/* Text Content */}
        <div className="space-y-6 text-[#1a1f4d] leading-relaxed mb-16">
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
        <div className="mt-20">
          <h2 className="text-[#4db8b8] mb-6">{t('aboutPage.joinUsTitle')}</h2>

          <p className="text-[#1a1f4d] mb-8 text-lg">
            {t('aboutPage.joinUsText')}
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/participants')}
              className="bg-[#1a1f4d] text-white px-8 py-4 rounded hover:bg-[#2a2f5d] transition-colors"
            >
              {t('aboutPage.participate')}
            </button>
            <button
              onClick={() => navigate('/partners')}
              className="bg-white text-[#1a1f4d] px-8 py-4 rounded border-2 border-[#1a1f4d] hover:bg-[#f5f5f5] transition-colors"
            >
              {t('aboutPage.becomePartner')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}