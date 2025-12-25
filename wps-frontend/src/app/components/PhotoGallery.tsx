import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/useTranslation';

const galleryImage1 = 'placeholder.png';

export function PhotoGallery() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const photoGalleries = [
    {
      id: '1',
      title: t('photoGallery.day1'),
      image: galleryImage1,
      photosCount: 45
    },
    {
      id: '2',
      title: t('photoGallery.day2'),
      image: galleryImage1,
      photosCount: 52
    },
    {
      id: '3',
      title: t('photoGallery.day3'),
      image: galleryImage1,
      photosCount: 38
    },
    {
      id: '4',
      title: t('photoGallery.panelDiscussions'),
      image: galleryImage1,
      photosCount: 27
    }
  ];

  return (
    <>
      {/* Description */}
      <div className="max-w-4xl mx-auto mb-12 space-y-4 text-gray-700">
        <p>
          {t('photoGallery.tassPartner')}
        </p>
        <p>
          {t('photoGallery.photosAvailable')}
        </p>
        <p>
          {t('photoGallery.usageTerms')}{' '}
          <a
            href="https://picture.tass.photo/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4db8b8] hover:underline"
          >
            {t('photoGallery.usageTermsLink')}
          </a>
        </p>
      </div>

      {/* Photo Galleries Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {photoGalleries.map(gallery => (
          <div key={gallery.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <img
              src={gallery.image}
              alt={gallery.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-[#1a1f4d] mb-4">
                {gallery.title}
              </h3>
              <button className="bg-[#1a1f4d] text-white px-6 py-3 rounded hover:bg-[#252d6b] transition-colors w-full">
                {t('photoGallery.viewPhotos')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
