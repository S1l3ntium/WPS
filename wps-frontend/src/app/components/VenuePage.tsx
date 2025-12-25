import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { useSEO } from '../../hooks/useSEO';
import { Helmet } from 'react-helmet-async';
const venueImage = 'placeholder.png';

export function VenuePage() {
  const navigate = useNavigate();
  const localeNavigate = useLocaleNavigate();
  const { t, locale } = useTranslation();

  // SEO Configuration
  const seoConfig = {
    title: locale === 'ru'
      ? 'Место проведения - Всемирное публичное собрание'
      : 'Venue - World Public Assembly',
    description: locale === 'ru'
      ? 'Всемирное публичное собрание проходит в Москве. Информация о месте проведения, адресе, транспортной доступности, на территории выставочного центра в центре Москвы.'
      : 'The World Public Assembly takes place in Moscow. Information about the venue location, address, transport accessibility at the exhibition center in central Moscow.',
    keywords: locale === 'ru'
      ? ['место проведения', 'москва', 'центр выставочный', 'адрес', 'транспорт', 'доступность']
      : ['venue', 'moscow', 'exhibition center', 'address', 'transport', 'accessibility'],
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200',
    ogType: 'website' as const
  };

  useSEO(seoConfig);
  return (
    <div className="flex flex-col min-h-dvh bg-gray-50">
      <Header currentPage="home" />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => localeNavigate('/')} className="hover:text-[#4db8b8]">{t('venuePage.breadcrumbHome')}</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1a1f4d]">{t('venuePage.breadcrumbVenue')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Title */}
          <h1 className="text-[#1a1f4d] text-center mb-16">{t('venuePage.pageTitle')}</h1>

          {/* Venue Info */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-[#1a1f4d] mb-4">{t('venuePage.venueTitle')}</h2>
              <p className="text-gray-700 mb-6">
                {t('venuePage.venueLocation')}
              </p>
              <a
                href="https://maps.yandex.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#4db8b8] hover:text-[#3da3a3] transition-colors"
              >
                {t('venuePage.directions')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div>
              <img
                src={venueImage}
                alt={t('venuePage.venueTitle')}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* How to Get There */}
          <div>
            <h2 className="text-[#1a1f4d] mb-12">{t('venuePage.directions')}</h2>

            <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
              {/* By Metro */}
              <div>
                <h3 className="text-[#1a1f4d] mb-4">{t('venuePage.publicTransport')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  Метро «Улица 1905 года» (выход к ул. Красная Пресня), Автобус №323С от метро «Улица 1905 года» (заезжает на территорию ЦМТ)
                </p>
              </div>

              {/* Walking from Metro */}
              <div>
                <h3 className="text-[#1a1f4d] mb-4">Пешком от метро</h3>
                <p className="text-gray-700 leading-relaxed">
                  Путь пешком занимает около 20 минут (примерно 1 км): следует идти вниз по улице 1905 года по направлению к Краснопресненской набережной до комплекса зданий Центра международной торговли
                </p>
              </div>

              {/* By Car */}
              <div>
                <h3 className="text-[#1a1f4d] mb-4">{t('venuePage.taxi')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  Въезды со стороны Краснопресненской набережной и Мантулинской улицы
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}