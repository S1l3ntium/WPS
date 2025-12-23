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
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => localeNavigate('/')} className="hover:text-[#4db8b8] transition-colors">
            {t('grantsCompetitionPage.breadcrumbHome')}
          </button>
          <span>/</span>
          <span className="text-[#4db8b8]">{t('grantsCompetitionPage.breadcrumbGrants')}</span>
        </div>
      </div>

      {/* Hero Section with Logo and Info */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-12 items-start">
            {/* Competition Logo */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48">
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
              <div className="text-sm text-gray-600 mb-2">{t('grantsCompetitionPage.competitionLabel')}</div>
              <h1 className="text-5xl mb-6 text-[#4db8b8]">{t('grantsCompetitionPage.competitionTitle')}</h1>
              <p className="text-gray-700 text-lg max-w-3xl">
                {t('grantsCompetitionPage.competitionDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Timeline Item 1 */}
            <div className="border-t-4 border-[#1a1f4d] pt-6">
              <h3 className="text-2xl text-[#1a1f4d] mb-4">01.07. — 30.07.2025 г.</h3>
              <p className="text-gray-700">Сроки подачи заявок</p>
            </div>

            {/* Timeline Item 2 */}
            <div className="border-t-4 border-[#4db8b8] pt-6">
              <h3 className="text-2xl text-[#1a1f4d] mb-4">20.09.2025 г.</h3>
              <p className="text-gray-700">Вручение грантов в рамках Всемирной Общественной Ассамблеи</p>
            </div>

            {/* Timeline Item 3 */}
            <div className="border-t-4 border-[#1a1f4d] pt-6">
              <h3 className="text-2xl text-[#1a1f4d] mb-4">01.01. — 30.06.2026 г.</h3>
              <p className="text-gray-700">Сроки реализация проектов победителей</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Participate Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-[300px_1fr] gap-12">
            <h2 className="text-3xl text-[#4db8b8]">{t('grantsCompetitionPage.participationTitle')}</h2>
            <div>
              <p className="text-gray-700 mb-6">
                {t('grantsCompetitionPage.participationIntro')}
              </p>
              <ul className="space-y-3 mb-8">
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
              <div className="border-t-4 border-[#4db8b8] pt-6">
                <h3 className="text-xl text-[#1a1f4d] mb-3">{t('grantsCompetitionPage.conditionTitle')}</h3>
                <p className="text-gray-700">
                  {t('grantsCompetitionPage.conditionText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Goal Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-[300px_1fr] gap-12">
            <h2 className="text-3xl text-[#4db8b8]">{t('grantsCompetitionPage.goalTitle')}</h2>
            <div className="text-gray-700">
              <p className="mb-4">
                {t('grantsCompetitionPage.goalText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Directions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-[300px_1fr] gap-12">
            <h2 className="text-3xl text-[#4db8b8]">{t('grantsCompetitionPage.directionsTitle')}</h2>
            <div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    {t('grantsCompetitionPage.direction1')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    {t('grantsCompetitionPage.direction2')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    {t('grantsCompetitionPage.direction3')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    {t('grantsCompetitionPage.direction4')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl text-[#4db8b8] mb-8">{t('grantsCompetitionPage.faqTitle')}</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <ChevronRight
                    className={`w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-1 ${
                      openFaqIndex === index ? 'rotate-90' : ''
                    }`}
                  />
                  <span className="text-gray-700 ml-3">{item.question}</span>
                </div>
                {openFaqIndex === index && (
                  <p className="text-gray-600 mt-3">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Button Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <button className="bg-[#1a1f4d] text-white px-12 py-4 rounded hover:bg-[#2a3f6d] transition-colors text-lg">
            {t('grantsCompetitionPage.downloadButton')}
          </button>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl text-[#4db8b8] text-center mb-6">{t('grantsCompetitionPage.contactTitle')}</h2>
          <p className="text-center text-gray-700">
            <a href="mailto:worldcivilassembly@gmail.com" className="text-[#4db8b8] hover:underline">
              worldcivilassembly@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}