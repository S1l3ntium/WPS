import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { useTranslation } from '../../i18n/useTranslation';
import { Header } from './Header';
import { Footer } from './Footer';

export function MissionPage() {
  const navigate = useLocaleNavigate();
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentPage="mission" />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#1a1f4d] mb-10 sm:mb-12 md:mb-16">
              {t('missionPage.title')}
            </h1>

            {/* Миссия */}
            <div className="mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl text-[#4db8b8] mb-4 sm:mb-5 md:mb-6">
                {t('missionPage.missionTitle')}
              </h2>
              <p className="text-sm sm:text-base text-[#1a1f4d] leading-relaxed">
                {t('missionPage.missionText')}
              </p>
            </div>

            {/* Цель */}
            <div className="mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl text-[#4db8b8] mb-4 sm:mb-5 md:mb-6">
                {t('missionPage.goalTitle')}
              </h2>
              <p className="text-sm sm:text-base text-[#1a1f4d] leading-relaxed">
                {t('missionPage.goalText')}
              </p>
            </div>

            {/* Задачи */}
            <div className="mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl text-[#4db8b8] mb-4 sm:mb-5 md:mb-6">
                {t('missionPage.objectivesTitle')}
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[#4db8b8] mr-3 mt-1.5 flex-shrink-0">•</span>
                  <span className="text-[#1a1f4d] leading-relaxed">
                    {t('missionPage.objective1')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#4db8b8] mr-3 mt-1.5 flex-shrink-0">•</span>
                  <span className="text-[#1a1f4d] leading-relaxed">
                    {t('missionPage.objective2')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#4db8b8] mr-3 mt-1.5 flex-shrink-0">•</span>
                  <span className="text-[#1a1f4d] leading-relaxed">
                    {t('missionPage.objective3')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
