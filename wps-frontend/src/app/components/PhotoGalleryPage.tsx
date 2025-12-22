import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChevronRight } from 'lucide-react';
const galleryImage1 = 'placeholder.png';

export function PhotoGalleryPage() {
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

  const tabs = [
    { id: 'all', label: 'Все публикации', path: 'press-center' },
    { id: 'news', label: 'Новости', path: 'press-center' },
    { id: 'articles', label: 'Статьи', path: 'press-center' },
    { id: 'photo', label: 'Фото', path: 'photo-gallery' },
    { id: 'video', label: 'Видео', path: 'press-center' }
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-gray-50">
      <Header currentPage="press-center" />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-[#4db8b8]">Главная</button>
            <ChevronRight className="w-4 h-4" />
            <button onClick={() => navigate('/press-center')} className="hover:text-[#4db8b8]">Пресс-центр</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1a1f4d]">Фото</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Title */}
          <h1 className="text-[#1a1f4d] text-center mb-12">Фото</h1>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.path === 'press-center') {
                    navigate('/press-center');
                  }
                }}
                className={`px-6 py-3 rounded transition-colors ${
                  tab.id === 'photo'
                    ? 'bg-[#4db8b8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

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
        </div>
      </section>

      <Footer />
    </div>
  );
}
