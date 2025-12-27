import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Header } from './Header';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';

export function GrantsCompetitionPage() {
  const navigate = useNavigate();
  const localeNavigate = useLocaleNavigate();
  const { t } = useTranslation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: t('grantsCompetitionPage.faq1Question'),
      answer: t('grantsCompetitionPage.faq1Answer')
    },
    {
      question: t('grantsCompetitionPage.faq2Question'),
      answer: t('grantsCompetitionPage.faq2Answer')
    },
    {
      question: t('grantsCompetitionPage.faq3Question'),
      answer: t('grantsCompetitionPage.faq3Answer')
    },
    {
      question: t('grantsCompetitionPage.faq4Question'),
      answer: t('grantsCompetitionPage.faq4Answer')
    }
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header currentPage="grants-competition" />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <button onClick={() => localeNavigate('/')} className="hover:text-[#4db8b8] transition-colors">
            {t('grantsCompetitionPage.breadcrumbHome')}
          </button>
          <span>/</span>
          <span className="text-[#4db8b8]">{t('grantsCompetitionPage.breadcrumbGrants')}</span>
        </div>
      </div>

      {/* Hero Section with Logo and Info */}
      <section className="flex-1 py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 items-start">
            {/* Competition Logo */}
            <div className="flex-shrink-0">
              <div className="relative w-40 sm:w-48 md:w-56 lg:w-64 h-40 sm:h-48 md:h-56 lg:h-64">
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
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{t('grantsCompetitionPage.competitionLabel')}</div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 font-bold text-[#4db8b8]">{t('grantsCompetitionPage.competitionTitle')}</h1>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-3xl">
                {t('grantsCompetitionPage.competitionDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Timeline Item 1 */}
            <div className="border-t-4 border-[#1a1f4d] pt-6">
              <h3 className="text-2xl text-[#1a1f4d] mb-4">{t('grantsCompetitionPage.timelineDate1')}</h3>
              <p className="text-gray-700">{t('grantsCompetitionPage.timelineDescription1')}</p>
            </div>

            {/* Timeline Item 2 */}
            <div className="border-t-4 border-[#4db8b8] pt-6">
              <h3 className="text-2xl text-[#1a1f4d] mb-4">{t('grantsCompetitionPage.timelineDate2')}</h3>
              <p className="text-gray-700">{t('grantsCompetitionPage.timelineDescription2')}</p>
            </div>

            {/* Timeline Item 3 */}
            <div className="border-t-4 border-[#1a1f4d] pt-6">
              <h3 className="text-2xl text-[#1a1f4d] mb-4">{t('grantsCompetitionPage.timelineDate3')}</h3>
              <p className="text-gray-700">{t('grantsCompetitionPage.timelineDescription3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Participate Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 sm:gap-8 md:gap-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4db8b8]">{t('grantsCompetitionPage.participationTitle')}</h2>
            <div>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                {t('grantsCompetitionPage.participationIntro')}
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{t('grantsCompetitionPage.field1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{t('grantsCompetitionPage.field2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{t('grantsCompetitionPage.field3')}</span>
                </li>
              </ul>

              {/* Условие subsection */}
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

      {/* Competition Goal Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 sm:gap-8 md:gap-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4db8b8]">{t('grantsCompetitionPage.goalTitle')}</h2>
            <div className="text-sm sm:text-base text-gray-700">
              <p className="mb-4">
                {t('grantsCompetitionPage.goalText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Directions Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 sm:gap-8 md:gap-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4db8b8]">{t('grantsCompetitionPage.directionsTitle')}</h2>
            <div>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm md:text-base text-gray-700">
                    {t('grantsCompetitionPage.direction1')}
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm md:text-base text-gray-700">
                    {t('grantsCompetitionPage.direction2')}
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm md:text-base text-gray-700">
                    {t('grantsCompetitionPage.direction3')}
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm md:text-base text-gray-700">
                    {t('grantsCompetitionPage.direction4')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4db8b8] mb-6 sm:mb-8">{t('grantsCompetitionPage.faqTitle')}</h2>
          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((item, index) => (
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
                  <span className="text-xs sm:text-sm md:text-base text-gray-700">{item.question}</span>
                </div>
                {openFaqIndex === index && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Button Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <button onClick={() => window.location.href = '/api/documents/download/grants-competition'} className="bg-[#1a1f4d] text-white px-4 py-2 sm:px-8 sm:py-3 md:px-12 md:py-4 rounded hover:bg-[#2a3f6d] transition-colors text-xs sm:text-sm md:text-base font-medium">
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