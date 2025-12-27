import { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { partnerPackagesAPI, PartnerPackageData, getLocalized } from '../../services/api';
import { useTranslation } from '../../i18n/useTranslation';
import { useSEO } from '../../hooks/useSEO';
import { Helmet } from 'react-helmet-async';

export function PartnersPage() {
  const { t, locale } = useTranslation();
  const [packages, setPackages] = useState<PartnerPackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useSEO({
    title: t('partnersPage.pageTitle'),
    description: t('partnersPage.pageDescription') || 'Partner packages and opportunities',
  });

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await partnerPackagesAPI.getAll({ per_page: 100 });
        setPackages(response.data);
      } catch (err) {
        console.error('Failed to load partner packages:', err);
        setError(t('common.error'));
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, [t]);

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Helmet>
        <title>{t('partnersPage.pageTitle')}</title>
        <meta name="description" content={t('partnersPage.pageDescription') || ''} />
      </Helmet>

      <Header currentPage="partners" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a1f4d] via-[#2a3580] to-[#1a1f4d] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#4db8b8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#4db8b8] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              {t('partnersPage.pageTitle')}
            </h1>
            <p className="text-base sm:text-lg text-[#4db8b8] max-w-2xl mx-auto">
              {t('partnersPage.subtitle') || 'Join our partnership program'}
            </p>
          </div>
        </div>
      </section>

      {/* Partner Packages Section */}
      <section className="flex-1 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-gray-600">{t('common.loading')}</div>
            </div>
          ) : error ? (
            <div className="flex justify-center py-12">
              <div className="text-red-600">{error}</div>
            </div>
          ) : packages.length === 0 ? (
            <div className="flex justify-center py-12">
              <div className="text-gray-600">{t('common.noData')}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#4db8b8] hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6 sm:p-8 flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1a1f4d] mb-2">
                        {getLocalized(pkg.title, locale as 'ru' | 'en')}
                      </h3>
                      {pkg.category && (
                        <p className="text-sm font-medium text-[#4db8b8]">
                          {pkg.category}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    {pkg.description && (
                      <p className="text-gray-600 text-sm sm:text-base mb-6">
                        {getLocalized(pkg.description, locale as 'ru' | 'en')}
                      </p>
                    )}

                    {/* Benefits */}
                    {pkg.benefits && pkg.benefits.length > 0 && (
                      <div className="mb-6 flex-grow">
                        <h4 className="font-semibold text-[#1a1f4d] mb-3">
                          {t('partnersPage.benefits')}
                        </h4>
                        <ul className="space-y-2">
                          {pkg.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 bg-[#4db8b8] rounded-full mt-1.5 flex-shrink-0"></span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Price */}
                    {pkg.price && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">{t('partnersPage.price')}</p>
                        <p className="text-lg font-bold text-[#4db8b8]">
                          {getLocalized(pkg.price, locale as 'ru' | 'en')}
                        </p>
                      </div>
                    )}

                    {/* Download Link */}
                    {pkg.downloadLink && (
                      <a
                        href={pkg.downloadLink}
                        download
                        className="block w-full text-center py-3 px-4 bg-[#1a1f4d] text-white font-medium rounded hover:bg-[#2a3f6d] transition-colors"
                      >
                        {t('partnersPage.downloadButton')}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#1a1f4d]">
            {t('partnersPage.ctaTitle')}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('partnersPage.ctaDescription')}
          </p>
          <a
            href="mailto:worldcivilassembly@gmail.com"
            className="inline-block py-3 px-8 bg-[#1a1f4d] text-white font-medium rounded hover:bg-[#2a3f6d] transition-colors"
          >
            {t('partnersPage.contactButton')}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
