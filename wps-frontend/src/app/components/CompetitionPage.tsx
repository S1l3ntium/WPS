import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Header } from './Header';
import { competitionsAPI, CompetitionData, CompetitionFaqData, getLocalized, COMPETITION_TYPES } from '../../services/api';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';

export function CompetitionPage() {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useTranslation();
  const localeNavigate = useLocaleNavigate();
  const [competition, setCompetition] = useState<(CompetitionData & { faqItems?: CompetitionFaqData[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await competitionsAPI.getById(Number(id));
        setCompetition(data);
      } catch (err) {
        console.error('Failed to load competition:', err);
        setError(t('common.error'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompetition();
    }
  }, [id, t]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-dvh bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-600">{t('common.loading')}</div>
        </main>
      </div>
    );
  }

  if (error || !competition) {
    return (
      <div className="flex flex-col min-h-dvh bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">{error || t('common.noData')}</p>
            <button
              onClick={() => localeNavigate('/')}
              className="text-[#4db8b8] hover:underline"
            >
              {t('buttons.back')}
            </button>
          </div>
        </main>
      </div>
    );
  }

  const competitionName = getLocalized(competition.name, locale as 'ru' | 'en');
  const competitionDescription = getLocalized(competition.description, locale as 'ru' | 'en');

  // Render logo - either custom from admin or default SVG
  const renderCompetitionLogo = () => {
    // If custom logo exists, show image
    if (competition.has_custom_logo && competition.logo_url) {
      return (
        <img
          src={competition.logo_url}
          alt={getLocalized(competition.name, locale as 'ru' | 'en')}
          className="w-full h-full object-cover rounded"
        />
      );
    }

    // Default SVG logo
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Outer circle border */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="#1a1f4d" strokeWidth="3"/>
        {/* Blue left part */}
        <path d="M 100 100 L 100 10 A 90 90 0 0 1 100 190 Z" fill="#1a1f4d"/>
        {/* Orange right part */}
        <path d="M 100 100 L 100 10 A 90 90 0 0 0 100 190 Z" fill="#e8a54d"/>
        {/* Green circle */}
        <circle cx="85" cy="100" r="22" fill="#5ba55f"/>
        {/* White circle with border */}
        <circle cx="115" cy="100" r="22" fill="white" stroke="#4db8b8" strokeWidth="2"/>
        <circle cx="115" cy="100" r="10" fill="#4db8b8"/>
      </svg>
    );
  };

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 justify-start">
            <button onClick={() => localeNavigate('/')} className="hover:text-[#4db8b8] transition-colors">
              {t('common.home')}
            </button>
            <span>/</span>
            <span className="text-[#4db8b8]">{competitionName}</span>
          </div>
        </div>
      </div>

      {/* Hero Section with Logo and Info */}
      <section className="flex-1 py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 items-start">
            {/* Competition Logo */}
            <div className="flex-shrink-0">
              <div className="relative w-40 sm:w-48 md:w-56 lg:w-64 h-40 sm:h-48 md:h-56 lg:h-64">
                {renderCompetitionLogo()}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                {COMPETITION_TYPES[competition.type.toLowerCase() as keyof typeof COMPETITION_TYPES]?.[locale as 'ru' | 'en'] || competition.type}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 font-bold text-[#4db8b8]">
                {competitionName}
              </h1>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-3xl">
                {competitionDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section (if dates exist) */}
      {(competition.timeline_opening_formatted || competition.timeline_closing_formatted || competition.timeline_announcement_formatted) && (
        <section className="py-8 sm:py-10 md:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {competition.timeline_opening_formatted && (
                <div className="border-t-4 border-[#1a1f4d] pt-6">
                  <h3 className="text-2xl text-[#1a1f4d] mb-4">{competition.timeline_opening_formatted}</h3>
                  <p className="text-gray-700">{t('grantsCompetitionPage.timelineDescription1')}</p>
                </div>
              )}
              {competition.timeline_closing_formatted && (
                <div className="border-t-4 border-[#4db8b8] pt-6">
                  <h3 className="text-2xl text-[#1a1f4d] mb-4">{competition.timeline_closing_formatted}</h3>
                  <p className="text-gray-700">{t('grantsCompetitionPage.timelineDescription2')}</p>
                </div>
              )}
              {competition.timeline_announcement_formatted && (
                <div className="border-t-4 border-[#1a1f4d] pt-6">
                  <h3 className="text-2xl text-[#1a1f4d] mb-4">{competition.timeline_announcement_formatted}</h3>
                  <p className="text-gray-700">{t('grantsCompetitionPage.timelineDescription3')}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Who Can Participate Section (if eligibility exists) */}
      {(competition.eligibility_age_min || competition.eligibility_age_max || competition.eligibility_requirements) && (
        <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 sm:gap-8 md:gap-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4db8b8]">{t('grantsCompetitionPage.participationTitle')}</h2>
              <div>
                {(competition.eligibility_age_min || competition.eligibility_age_max) && (
                  <>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                      {competition.eligibility_age_min && competition.eligibility_age_max
                        ? `${t('grantsCompetitionPage.participationIntro')} ${competition.eligibility_age_min} - ${competition.eligibility_age_max} ${t('common.yearsOld')}`
                        : competition.eligibility_age_min
                        ? `${t('grantsCompetitionPage.participationIntro')} ${competition.eligibility_age_min} ${t('common.yearsOldAbove')}`
                        : `${t('grantsCompetitionPage.participationIntro')} ${competition.eligibility_age_max} ${t('common.yearsOldBelow')}`}
                    </p>
                  </>
                )}

                {competition.eligibility_requirements && competition.eligibility_requirements.length > 0 && (
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {competition.eligibility_requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm sm:text-base">{req}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Condition subsection */}
                <div className="border-t-4 border-[#4db8b8] pt-4 sm:pt-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#1a1f4d] mb-2 sm:mb-3">{t('grantsCompetitionPage.conditionTitle')}</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    {t('grantsCompetitionPage.conditionText')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Competition Goal Section (if description exists) */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 sm:gap-8 md:gap-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4db8b8]">{t('grantsCompetitionPage.goalTitle')}</h2>
            <div className="text-sm sm:text-base text-gray-700">
              <p className="mb-4">
                {competitionDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Directions Section (if support_areas exist) */}
      {competition.support_areas && competition.support_areas.length > 0 && (
        <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 sm:gap-8 md:gap-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4db8b8]">{t('grantsCompetitionPage.directionsTitle')}</h2>
              <div>
                <ul className="space-y-2 sm:space-y-3">
                  {competition.support_areas.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-3">
                      <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm md:text-base text-gray-700">
                        {area}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section (if exists) */}
      {competition.faqItems && competition.faqItems.length > 0 && (
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4db8b8] mb-6 sm:mb-8">{t('grantsCompetitionPage.faqTitle')}</h2>
            <div className="space-y-3 sm:space-y-4">
              {competition.faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-3 sm:pb-4">
                  <div
                    className="flex items-start cursor-pointer gap-2 sm:gap-3"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <ChevronRight
                      className={`w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-0.5 ${
                        openFaqIndex === index ? 'rotate-90' : ''
                      }`}
                    />
                    <span className="text-xs sm:text-sm md:text-base text-gray-700">
                      {getLocalized(item.question, locale as 'ru' | 'en')}
                    </span>
                  </div>
                  {openFaqIndex === index && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">{getLocalized(item.answer, locale as 'ru' | 'en')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Download Button Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <button
            onClick={() => window.location.href = `/api/documents/download/competition-${id}`}
            className="bg-[#1a1f4d] text-white px-4 py-2 sm:px-8 sm:py-3 md:px-12 md:py-4 rounded hover:bg-[#2a3f6d] transition-colors text-xs sm:text-sm md:text-base font-medium"
          >
            {t('grantsCompetitionPage.downloadButton')}
          </button>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4db8b8] text-center mb-4 sm:mb-6">{t('grantsCompetitionPage.contactTitle')}</h2>
          <p className="text-center text-xs sm:text-sm md:text-base text-gray-700">
            <a href="mailto:worldcivilassembly@gmail.com" className="text-[#4db8b8] hover:underline font-medium">
              worldcivilassembly@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
