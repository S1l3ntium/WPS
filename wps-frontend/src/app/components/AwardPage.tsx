import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Award, Users, Globe, TrendingUp, CheckCircle } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

export function AwardPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header currentPage="award" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a1f4d] via-[#2a3580] to-[#1a1f4d] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#4db8b8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#4db8b8] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white">
              {t('awardPage.pageTitle')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#4db8b8]">{t('awardPage.fullAwardName')}</p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="flex-1 py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <div className="text-gray-700 text-sm sm:text-base space-y-4">
              <p>
                {t('awardPage.awardDescription1')}
              </p>
              <p>
                {t('awardPage.awardDescription2')}
              </p>
            </div>
            <div className="text-gray-700 text-sm sm:text-base space-y-4">
              <p>
                Премия символизирует высшей общественной признания за дальновидность вклад в продвижение гуманных, благотворительных идей на пунктах культуры, здравоохранения, образования, науки, техники, экологии и других важных для человечества сферах.
              </p>
              <p>
                Лауреаты Премии становятся почётными членами мирового сообщества выдающихся персон, представляющих образец верного служения прогрессу.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 md:mb-16 text-[#1a1f4d]">{t('awardPage.awardGoalsTitle')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-x-16 md:gap-y-12">
            {/* Goal 1 */}
            <div>
              <div className="w-4 h-4 bg-[#4db8b8] rounded-full mb-6"></div>
              <h3 className="text-xl mb-4 text-[#4db8b8]">{t('awardPage.awardGoal1')}</h3>
              <p className="text-gray-600">
                в сфере общественной дипломатии, международного и межкультурного сотрудничества
              </p>
            </div>

            {/* Goal 2 */}
            <div>
              <div className="w-4 h-4 bg-[#4db8b8] rounded-full mb-6"></div>
              <h3 className="text-xl mb-4 text-[#4db8b8]">{t('awardPage.awardGoal2')}</h3>
              <p className="text-gray-600">
                в служении человечеству и продвижении гуманистических ценностей
              </p>
            </div>

            {/* Goal 3 */}
            <div>
              <div className="w-4 h-4 bg-[#4db8b8] rounded-full mb-6"></div>
              <h3 className="text-xl mb-4 text-[#4db8b8]">{t('awardPage.awardGoal3')}</h3>
              <p className="text-gray-600">
                лидеров общественного мнения, продвигающих идеи осознанного единства, дружбы, согласия и добрососедства
              </p>
            </div>

            {/* Goal 4 */}
            <div>
              <div className="w-4 h-4 bg-[#4db8b8] rounded-full mb-6"></div>
              <h3 className="text-xl mb-4 text-[#4db8b8]">{t('awardPage.awardGoal4')}</h3>
              <p className="text-gray-600">
                позитивных гуманитарных инициатив, формирование образа лидера общественного служения
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Be Laureate Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 sm:gap-8 md:gap-12 items-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4db8b8]">{t('awardPage.whoCanWinTitle')}</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
              {t('awardPage.whoCanWinText')}
            </p>
          </div>
        </div>
      </section>

      {/* Award Process Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-[#1a1f4d] text-center">{t('awardPage.awardProcessTitle')}</h2>

          <div className="space-y-6 sm:space-y-7 md:space-y-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex gap-4 sm:gap-5 md:gap-6 items-start">
              <div className="flex-shrink-0 w-16 sm:w-18 md:w-20 text-[#4db8b8] text-lg sm:text-xl">{t('awardPage.submitApplication')}</div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl mb-2 text-[#1a1f4d] font-medium">Выдвижение номинаций Организациями</h3>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 sm:gap-5 md:gap-6 items-start">
              <div className="flex-shrink-0 w-16 sm:w-18 md:w-20 text-[#4db8b8] text-lg sm:text-xl">{t('awardPage.reviewProcess')}</div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl mb-2 text-[#1a1f4d] font-medium">Отбор и определение Генеральным Советов Ассамблеи</h3>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 sm:gap-5 md:gap-6 items-start">
              <div className="flex-shrink-0 w-16 sm:w-18 md:w-20 text-[#4db8b8] text-lg sm:text-xl">{t('awardPage.awardCeremony')}</div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl mb-2 text-[#1a1f4d] font-medium">Утверждение списка лауреатов Генеральным секретарятом</h3>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <button onClick={() => window.location.href = 'https://forms.worldpublicsummit.test/award'} className="bg-[#1a1f4d] hover:bg-[#2a3580] text-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded text-xs sm:text-sm font-medium transition-colors">
              {t('buttons.submitApplication')}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}