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
      <section className="relative bg-gradient-to-br from-[#1a1f4d] via-[#2a3580] to-[#1a1f4d] py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#4db8b8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#4db8b8] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl mb-4 text-white">
              {t('awardPage.pageTitle')}
            </h1>
            <p className="text-xl text-[#4db8b8]">{t('awardPage.fullAwardName')}</p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="flex-1 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-gray-700 space-y-4">
              <p>
                {t('awardPage.awardDescription1')}
              </p>
              <p>
                {t('awardPage.awardDescription2')}
              </p>
            </div>
            <div className="text-gray-700 space-y-4">
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl mb-16 text-[#1a1f4d]">{t('awardPage.awardGoalsTitle')}</h2>

          <div className="grid md:grid-cols-3 gap-x-16 gap-y-12">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-[320px_1fr] gap-12 items-start">
            <h2 className="text-4xl text-[#4db8b8]">{t('awardPage.whoCanWinTitle')}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t('awardPage.whoCanWinText')}
            </p>
          </div>
        </div>
      </section>

      {/* Award Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl mb-12 text-[#1a1f4d] text-center">{t('awardPage.awardProcessTitle')}</h2>

          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-20 text-[#4db8b8] text-xl">{t('awardPage.submitApplication')}</div>
              <div>
                <h3 className="text-xl mb-2 text-[#1a1f4d]">Выдвижение номинаций Организациями</h3>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-20 text-[#4db8b8] text-xl">{t('awardPage.reviewProcess')}</div>
              <div>
                <h3 className="text-xl mb-2 text-[#1a1f4d]">Отбор и определение Генеральным Советов Ассамблеи</h3>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-20 text-[#4db8b8] text-xl">{t('awardPage.awardCeremony')}</div>
              <div>
                <h3 className="text-xl mb-2 text-[#1a1f4d]">Утверждение списка лауреатов Генеральным секретарятом</h3>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#1a1f4d] hover:bg-[#2a3580] text-white px-8 py-4 rounded transition-colors">
              {t('buttons.submitApplication')}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}