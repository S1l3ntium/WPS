import { useNavigate } from 'react-router-dom';

const galleryImage1 = 'placeholder.png';

export function PhotoGallery() {
  const navigate = useNavigate();
  const photoGalleries = [
    {
      id: '1',
      title: 'Всемирная Общественная Ассамблея 2025. День 1',
      image: galleryImage1,
      photosCount: 45
    },
    {
      id: '2',
      title: 'Всемирная Общественная Ассамблея 2025. День 2',
      image: galleryImage1,
      photosCount: 52
    },
    {
      id: '3',
      title: 'Всемирная Общественная Ассамблея 2025. День 3',
      image: galleryImage1,
      photosCount: 38
    },
    {
      id: '4',
      title: 'Панельные дискуссии',
      image: galleryImage1,
      photosCount: 27
    }
  ];

  return (
    <>
      {/* Description */}
      <div className="max-w-4xl mx-auto mb-12 space-y-4 text-gray-700">
        <p>
          ТАСС является генеральным информационным партнером Всемирной Общественной Ассамблеи и выступает официальным
          фотохост-агентством Ассамблеи.
        </p>
        <p>
          Фотографии доступны участникам Мероприятия, а также СМИ в целях освещения Мероприятия{' '}
          <strong>с обязательным указанием имени автора и источника в следующем порядке: «Автор/Фотохост-агентство ТАСС».</strong>
        </p>
        <p>
          Подробные условия использования размещены по ссылке{' '}
          <a
            href="https://picture.tass.photo/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4db8b8] hover:underline"
          >
            worldpublicassembly.tass.photo/terms
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
                Смотреть фото-материалы
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
