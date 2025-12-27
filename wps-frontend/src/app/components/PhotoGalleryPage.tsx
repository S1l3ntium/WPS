import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
const galleryImage1 = 'placeholder.png';

export function PhotoGalleryPage() {
  const navigate = useNavigate();
  const localeNavigate = useLocaleNavigate();
  const { t } = useTranslation();
  const photoGalleries = [
    {
      id: '1',
      titleKey: 'photoGalleryPage.gallery1Title',
      image: galleryImage1,
      photosCount: 45
    },
    {
      id: '2',
      titleKey: 'photoGalleryPage.gallery2Title',
      image: galleryImage1,
      photosCount: 52
    },
    {
      id: '3',
      titleKey: 'photoGalleryPage.gallery3Title',
      image: galleryImage1,
      photosCount: 38
    },
    {
      id: '4',
      titleKey: 'photoGalleryPage.gallery4Title',
      image: galleryImage1,
      photosCount: 27
    }
  ];

  const tabs = [
    { id: 'all', labelKey: 'photoGalleryPage.tab1', path: 'press-center' },
    { id: 'news', labelKey: 'photoGalleryPage.tab2', path: 'press-center' },
    { id: 'articles', labelKey: 'photoGalleryPage.tab3', path: 'press-center' },
    { id: 'photo', labelKey: 'photoGalleryPage.tab4', path: 'photo-gallery' },
    { id: 'video', labelKey: 'photoGalleryPage.tab5', path: 'press-center' }
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-gray-50">
      <Header currentPage="press-center" />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => localeNavigate('/')} className="hover:text-[#4db8b8]">{t('photoGalleryPage.breadcrumbHome')}</button>
            <ChevronRight className="w-4 h-4" />
            <button onClick={() => localeNavigate('/press-center')} className="hover:text-[#4db8b8]">{t('photoGalleryPage.breadcrumbPress')}</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1a1f4d]">{t('photoGalleryPage.breadcrumbPhoto')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#1a1f4d] text-center mb-8 sm:mb-10 md:mb-12">{t('photoGalleryPage.pageTitle')}</h1>

          {/* Tabs */}
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.path === 'press-center') {
                    localeNavigate('/press-center');
                  }
                }}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded transition-colors text-xs sm:text-sm md:text-base ${
                  tab.id === 'photo'
                    ? 'bg-[#4db8b8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-gray-700">
            <p>
              {t('photoGalleryPage.description1')}
            </p>
            <p>
              {t('photoGalleryPage.description2')}{' '}
              <strong>{t('photoGalleryPage.description2Bold')}</strong>
            </p>
            <p>
              {t('photoGalleryPage.description3')}{' '}
              <a
                href="https://picture.tass.photo/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4db8b8] hover:underline"
              >
                {t('photoGalleryPage.description3Link')}
              </a>
            </p>
          </div>

          {/* Photo Galleries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {photoGalleries.map(gallery => (
              <div key={gallery.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={gallery.image}
                  alt={t(gallery.titleKey)}
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                />
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl text-[#1a1f4d] mb-3 sm:mb-4">
                    {t(gallery.titleKey)}
                  </h3>
                  <button onClick={() => window.open(`https://picture.tass.photo/gallery/${gallery.id}`, '_blank')} className="bg-[#1a1f4d] text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded hover:bg-[#252d6b] transition-colors w-full text-xs sm:text-sm md:text-base">
                    {t('photoGalleryPage.viewButton')}
                  </button>
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
