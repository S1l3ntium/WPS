import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
const groupImage = 'placeholder.png';

export function LeadershipCompetitionPage() {
  const navigate = useNavigate();
  const localeNavigate = useLocaleNavigate();
  const { t } = useTranslation();
  const newsItems = [
    {
      image: groupImage,
      date: t('leadershipCompetitionPage.news1Date'),
      titleKey: 'leadershipCompetitionPage.news1Title',
      excerptKey: 'leadershipCompetitionPage.news1Excerpt',
      highlightKey: 'leadershipCompetitionPage.news1Highlight'
    },
    {
      image: groupImage,
      date: t('leadershipCompetitionPage.news2Date'),
      titleKey: 'leadershipCompetitionPage.news2Title',
      excerptKey: 'leadershipCompetitionPage.news2Excerpt'
    },
    {
      image: groupImage,
      date: t('leadershipCompetitionPage.news3Date'),
      titleKey: 'leadershipCompetitionPage.news3Title',
      excerptKey: 'leadershipCompetitionPage.news3Excerpt'
    },
    {
      image: groupImage,
      date: t('leadershipCompetitionPage.news4Date'),
      titleKey: 'leadershipCompetitionPage.news4Title',
      excerptKey: 'leadershipCompetitionPage.news4Excerpt'
    },
    {
      image: groupImage,
      date: t('leadershipCompetitionPage.news5Date'),
      titleKey: 'leadershipCompetitionPage.news5Title',
      excerptKey: 'leadershipCompetitionPage.news5Excerpt'
    }
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-gray-50">
      <Header currentPage="leadership-competition" />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => localeNavigate('/')} className="hover:text-[#4db8b8]">{t('leadershipCompetitionPage.breadcrumbHome')}</button>
            <ChevronRight className="w-4 h-4" />
            <span>{t('leadershipCompetitionPage.breadcrumbCompetitions')}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1a1f4d]">{t('leadershipCompetitionPage.breadcrumbLeadership')}</span>
          </div>
        </div>
      </div>

      {/* Hero Section with Image */}
      <section className="flex-1 bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Text */}
            <div>
              <div className="text-gray-500 mb-3">
                {t('leadershipCompetitionPage.competitionLabel')}
              </div>
              <h1 className="text-[#4db8b8] mb-6">
                {t('leadershipCompetitionPage.competitionTitle')}
              </h1>
              <p className="text-gray-700 mb-8">
                {t('leadershipCompetitionPage.competitionDescription')}
              </p>
              <button className="bg-[#4db8b8] text-white px-8 py-3 rounded hover:bg-[#3da0a0] transition-colors">
                {t('leadershipCompetitionPage.downloadButton')}
              </button>
            </div>

            {/* Right Column - Image */}
            <div>
              <img 
                src={groupImage} 
                alt="Участники конкурса" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-5xl text-[#4db8b8] mb-2">4</div>
              <p className="text-gray-700">{t('leadershipCompetitionPage.continents')}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-5xl text-[#4db8b8] mb-2">47</div>
              <p className="text-gray-700">{t('leadershipCompetitionPage.countries')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Participate Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left - Title */}
            <div className="lg:col-span-2">
              <h2 className="text-[#4db8b8]">{t('leadershipCompetitionPage.participationTitle')}</h2>
            </div>

            {/* Right - Content */}
            <div className="lg:col-span-3">
              <p className="text-gray-700 mb-4">
                {t('leadershipCompetitionPage.participationDescription')}
              </p>
              <p className="text-gray-700 italic">
                {t('leadershipCompetitionPage.participationNote')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Participation Models Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left - Title */}
            <div className="lg:col-span-2">
              <h2 className="text-[#1a1f4d]">{t('leadershipCompetitionPage.modelsTitle')}</h2>
            </div>

            {/* Right - Content */}
            <div className="lg:col-span-3 space-y-4">
              <p className="text-gray-700">
                {t('leadershipCompetitionPage.modelsDescription')}
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{t('leadershipCompetitionPage.model1')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{t('leadershipCompetitionPage.model2')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{t('leadershipCompetitionPage.model3')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{t('leadershipCompetitionPage.model4')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{t('leadershipCompetitionPage.model5')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{t('leadershipCompetitionPage.model6')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left - Title */}
            <div className="lg:col-span-2">
              <h2 className="text-[#1a1f4d]">{t('leadershipCompetitionPage.awardsTitle')}</h2>
            </div>

            {/* Right - Content */}
            <div className="lg:col-span-3">
              <p className="text-gray-700 mb-6">
                {t('leadershipCompetitionPage.awardsIntro')}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-[#1a1f4d] mb-1">{t('leadershipCompetitionPage.award1Title')}</h3>
                    <p className="text-gray-600 text-sm">{t('leadershipCompetitionPage.award1Desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-[#1a1f4d] mb-1">{t('leadershipCompetitionPage.award2Title')}</h3>
                    <p className="text-gray-600 text-sm">{t('leadershipCompetitionPage.award2Desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-[#1a1f4d] mb-1">{t('leadershipCompetitionPage.award3Title')}</h3>
                    <p className="text-gray-600 text-sm">{t('leadershipCompetitionPage.award3Desc')}</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700">
                {t('leadershipCompetitionPage.ceremonyInfo')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Stages */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-[#1a1f4d] text-center mb-12">{t('leadershipCompetitionPage.stagesTitle')}</h2>

          <div className="space-y-0 divide-y divide-gray-200">
            {/* Stage 1 */}
            <div className="grid grid-cols-5 gap-12 py-8">
              <div className="col-span-1">
                <div className="text-[#4db8b8]">{t('leadershipCompetitionPage.stage1Label')}</div>
              </div>
              <div className="col-span-4">
                <h3 className="text-[#4db8b8] mb-3">
                  {t('leadershipCompetitionPage.stage1Title')}
                </h3>
                <p className="text-[#1a1f4d] mb-4">{t('leadershipCompetitionPage.stage1Date')}</p>
                <p className="text-gray-700">
                  {t('leadershipCompetitionPage.stage1Desc')}
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="grid grid-cols-5 gap-12 py-8">
              <div className="col-span-1">
                <div className="text-[#4db8b8]">{t('leadershipCompetitionPage.stage2Label')}</div>
              </div>
              <div className="col-span-4">
                <h3 className="text-[#4db8b8] mb-3">
                  {t('leadershipCompetitionPage.stage2Title')}
                </h3>
                <p className="text-[#1a1f4d] mb-4">{t('leadershipCompetitionPage.stage2Date')}</p>
                <p className="text-gray-700 mb-2">
                  {t('leadershipCompetitionPage.stage2Desc1')}
                </p>
                <p className="text-gray-700">
                  {t('leadershipCompetitionPage.stage2Desc2')}
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="grid grid-cols-5 gap-12 py-8">
              <div className="col-span-1">
                <div className="text-[#4db8b8]">{t('leadershipCompetitionPage.stage3Label')}</div>
              </div>
              <div className="col-span-4">
                <h3 className="text-[#4db8b8] mb-3">
                  {t('leadershipCompetitionPage.stage3Title')}
                </h3>
                <p className="text-[#1a1f4d] mb-4">{t('leadershipCompetitionPage.stage3Date')}</p>
                <p className="text-gray-700">
                  {t('leadershipCompetitionPage.stage3Desc')}
                </p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="grid grid-cols-5 gap-12 py-8">
              <div className="col-span-1">
                <div className="text-[#4db8b8]">{t('leadershipCompetitionPage.stage4Label')}</div>
              </div>
              <div className="col-span-4">
                <h3 className="text-[#4db8b8] mb-3">
                  {t('leadershipCompetitionPage.stage4Title')}
                </h3>
                <p className="text-[#1a1f4d] mb-4">{t('leadershipCompetitionPage.stage4Date')}</p>
                <p className="text-gray-700">
                  {t('leadershipCompetitionPage.stage4Desc')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="bg-[#1a1f4d] text-white px-8 py-3 rounded hover:bg-[#252b5e] transition-colors">
              {t('leadershipCompetitionPage.submitButton')}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-[#1a1f4d] mb-8">{t('leadershipCompetitionPage.contactTitle')}</h2>

          <div className="space-y-3">
            <div>
              <p className="text-[#1a1f4d]">{t('leadershipCompetitionPage.contactPerson')}</p>
              <a href="tel:+79313331020" className="text-[#4db8b8] hover:underline">{t('leadershipCompetitionPage.contactPhone')}</a>
            </div>
            <div>
              <a href="mailto:diplomacy@n-mir.org" className="text-[#4db8b8] hover:underline">{t('leadershipCompetitionPage.contactEmail')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-[#4db8b8] mb-12">{t('leadershipCompetitionPage.newsTitle')}</h2>

          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <div key={index} className="flex gap-6 hover:opacity-80 transition-opacity cursor-pointer">
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="w-72 h-48 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-gray-500 text-sm mb-3">{item.date}</p>
                  <h3 className="text-[#1a1f4d] mb-3">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-gray-700 mb-2">{t(item.excerptKey)}</p>
                  {item.highlightKey && (
                    <p className="text-[#1a1f4d]">{t(item.highlightKey)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}