import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const partnershipImage = 'placeholder.png';
import { Header } from './Header';
import { Footer } from './Footer';
import { PartnerPackage } from './PartnerPackage';
import { useTranslation } from '../../i18n/useTranslation';
import { useSEO } from '../../hooks/useSEO';
import { Helmet } from 'react-helmet-async';

const partnerPackages = [
  {
    id: 'strategic',
    category: 'strategic',
    i18nKey: 'strategicPartner',
    descriptionI18nKey: 'partnersPage.strategicDescription',
    benefits: [
      'partnersPage.benefit1',
      'partnersPage.benefit2',
      'partnersPage.benefit3',
      'partnersPage.benefit4',
      'partnersPage.benefit5',
      'partnersPage.benefit6',
      'partnersPage.benefit7',
      'partnersPage.benefit8',
      'partnersPage.benefit9',
      'partnersPage.benefit10',
      'partnersPage.benefit11',
      'partnersPage.benefit12'
    ],
    downloadLink: 'Стратегический_партнер_(АНЕ).docx',
    priceI18nKey: 'partnersPage.priceStrategic'
  },
  {
    id: 'general',
    category: 'general',
    i18nKey: 'generalPartner',
    descriptionI18nKey: 'partnersPage.generalDescription',
    benefits: [
      'partnersPage.generalBenefit1',
      'partnersPage.generalBenefit2',
      'partnersPage.generalBenefit3',
      'partnersPage.generalBenefit4',
      'partnersPage.generalBenefit5',
      'partnersPage.generalBenefit6',
      'partnersPage.generalBenefit7',
      'partnersPage.generalBenefit8',
      'partnersPage.generalBenefit9',
      'partnersPage.generalBenefit10',
      'partnersPage.generalBenefit11',
      'partnersPage.generalBenefit12',
      'partnersPage.generalBenefit13'
    ],
    downloadLink: 'Генеральный_партнер_(АНЕ).docx',
    priceI18nKey: 'partnersPage.priceGeneral'
  },
  {
    id: 'official',
    category: 'official',
    i18nKey: 'officialPartner',
    descriptionI18nKey: 'partnersPage.officialDescription',
    benefits: [
      'partnersPage.officialBenefit1',
      'partnersPage.officialBenefit2',
      'partnersPage.officialBenefit3'
    ],
    priceI18nKey: 'partnersPage.priceOfficial'
  },
  {
    id: 'sessions',
    category: 'sessions',
    i18nKey: 'partnersPage.sessionPartner',
    descriptionI18nKey: 'partnersPage.sessionsDescription',
    benefits: [
      'partnersPage.sessionBenefit1',
      'partnersPage.sessionBenefit2',
      'partnersPage.sessionBenefit3',
      'partnersPage.sessionBenefit4'
    ],
    priceI18nKey: 'partnersPage.priceSessions'
  },
  {
    id: 'cultural',
    category: 'cultural',
    i18nKey: 'partnersPage.culturalPartner',
    descriptionI18nKey: 'partnersPage.culturalDescription',
    benefits: [
      'partnersPage.culturalBenefit1',
      'partnersPage.culturalBenefit2',
      'partnersPage.culturalBenefit3',
      'partnersPage.culturalBenefit4'
    ],
    priceI18nKey: 'partnersPage.priceCultural'
  },
  {
    id: 'supplier',
    category: 'supplier',
    i18nKey: 'partnersPage.supplierPartner',
    descriptionI18nKey: 'partnersPage.supplierDescription',
    benefits: [
      'partnersPage.supplierBenefit1',
      'partnersPage.supplierBenefit2',
      'partnersPage.supplierBenefit3',
      'partnersPage.supplierBenefit4'
    ],
    priceI18nKey: 'partnersPage.priceSupplier'
  }
];

export function PartnersPage() {
  const navigate = useNavigate();
  const { t, locale } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // SEO Configuration
  const seoConfig = {
    title: locale === 'ru'
      ? 'Партнёры - Всемирное публичное собрание'
      : 'Partners - World Public Assembly',
    description: locale === 'ru'
      ? 'Станьте партнёром Всемирного публичного собрания. Различные уровни партнёрства: стратегические, генеральные, сессионные, культурные партнёры. Узнайте о преимуществах и условиях сотрудничества.'
      : 'Become a partner of the World Public Assembly. Various partnership levels: strategic, general, session, and cultural partners. Learn about benefits and cooperation terms.',
    keywords: locale === 'ru'
      ? ['партнёры', 'партнёрство', 'спонсорство', 'сотрудничество', 'конференция']
      : ['partners', 'partnership', 'sponsorship', 'cooperation', 'conference'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200',
    ogType: 'website' as const
  };

  useSEO(seoConfig);

  const filteredPackages = activeFilter === 'all'
    ? partnerPackages
    : partnerPackages.filter(pkg => pkg.category === activeFilter);

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header currentPage="partners" />

      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-white px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-16">
              <div className="flex-1">
                <h1 className="text-5xl mb-8 text-[#1a1f4d] leading-tight">
                  {t('partnersPage.pageTitle')}
                </h1>
                <p className="mb-6 leading-relaxed text-gray-700">
                  {t('partnersPage.subtitle')}
                </p>
                <p className="mb-8 leading-relaxed text-[#1a1f4d]">
                  {t('partnersPage.benefitsDescription')}
                </p>
                <button className="bg-[#4db8b8] hover:bg-[#3da8a8] text-white px-8 py-3 rounded transition-colors">
                  {t('buttons.downloadPresentation')}
                </button>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={partnershipImage}
                  alt={t('partnersPage.pageTitle')}
                  className="w-[480px] h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partner packages section */}
        <section className="py-16 max-w-7xl mx-auto">
          <h2 className="text-3xl mb-8">{t('partnersPage.packagesSectionTitle')}</h2>

          {/* Filters */}
          <div className="flex gap-3 mb-8 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#4db8b8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('partnersPage.allCategories')}
            </button>
            <button
              onClick={() => setActiveFilter('strategic')}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                activeFilter === 'strategic'
                  ? 'bg-[#4db8b8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('partnersPage.strategicPartner')}
            </button>
            <button
              onClick={() => setActiveFilter('general')}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                activeFilter === 'general'
                  ? 'bg-[#4db8b8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('partnersPage.generalPartner')}
            </button>
            <button
              onClick={() => setActiveFilter('specialized')}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                activeFilter === 'specialized'
                  ? 'bg-[#4db8b8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('partnersPage.specializedPartners')}
            </button>
          </div>

          {/* Partner packages list */}
          <div className="space-y-8">
            {filteredPackages.map(pkg => (
              <PartnerPackage key={pkg.id} package={pkg} />
            ))}
          </div>

          {/* Contact section */}
          <div className="mt-16 border-t pt-8">
            <h3 className="text-2xl mb-4">{t('partnersPage.limitedSpots')}</h3>
            <p className="mb-4 text-gray-600">
              {t('partnersPage.applyInstructions')}
            </p>
            <button className="bg-[#1a1f4d] hover:bg-[#2c3570] text-white px-6 py-3 rounded transition-colors">
              {t('buttons.contactUs')}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}