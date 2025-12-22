import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { PhotoGallery } from './PhotoGallery';
import { ChevronRight } from 'lucide-react';
import { newsAPI } from '../../services/api';
import { useLocale } from '../../context/LocaleContext';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';

const newsImage = 'placeholder.png';

type TabType = 'all' | 'news' | 'articles' | 'photo' | 'video';

interface Publication {
  id: number;
  type: 'news' | 'article';
  image: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
}

interface Tab {
  id: TabType;
  label: string;
  title: string;
  breadcrumb: string;
}

export function PressCenterPage() {
  const navigate = useLocaleNavigate();
  const { locale, t } = useLocale();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiNews = await newsAPI.getAll();

        const transformedNews: Publication[] = apiNews.map((item: any) => ({
          id: item.id,
          type: item.type,
          image: item.image,
          category: item.category,
          title: t(item.title || ''),
          excerpt: t(item.excerpt || ''),
          date: item.date
        }));

        setPublications(transformedNews);
      } catch (err) {
        console.error('Failed to fetch publications:', err);
        setError(locale === 'ru' ? 'Не удалось загрузить публикации. Пожалуйста, попробуйте позже.' : 'Failed to load publications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, [locale, t]);

  const defaultPublications: Publication[] = [
    {
      id: 1,
      type: 'news',
      image: newsImage,
      category: 'НОВОСТИ',
      title: 'Время наступило: участники Всемирной Общественной Ассамблеи приняли «Декларацию счастья»',
      excerpt: 'Особенностью Первой Всемирной общественной Ассамблеи стало одно из необычных направлений – среди международных практик построения будущего эксперты представили и раскрыли понятие «дипломатия счастья» как инструмент народной дипломатии.',
      date: '03.10.2025'
    },
    {
      id: 2,
      type: 'news',
      image: newsImage,
      category: 'НОВОСТИ',
      title: 'Семья – начало всех начал: на Всемирной Общественной Ассамблеее обсудили родовую культуру как ответ глобальным вызовам',
      excerpt: 'Мир стремительно меняется. Глобальные трансформации стирают границы, но вместе с ними уходят корни, основные институты семьи, рвется нити поколений, утрачивается культурная идентичность.',
      date: '03.10.2025'
    },
    {
      id: 3,
      type: 'news',
      image: newsImage,
      category: 'НОВОСТИ',
      title: 'Сила доброй воли: на Всемирной Ассамблее обсудили феномен народной дипломатии',
      excerpt: 'Одним из ключевых событий Первой Всемирной Общественной Ассамблеи стала панельная дискуссия «Феномен народной дипломатии», объединившая представителей разных стран и культур.',
      date: '03.10.2025'
    },
    {
      id: 4,
      type: 'news',
      image: newsImage,
      category: 'НОВОСТИ',
      title: 'Как новые медиа формируют ценности и героев нашего времени обсудили на полях Всемирной Общественной Ассамблеи',
      excerpt: '21 сентября в рамках Всемирной Общественной Ассамблеи в Санкт-Петербурге прошла панельная сессия «Новые медиа в служении человечеству: герои, подвиги и вызовы».',
      date: '03.10.2025'
    },
    {
      id: 5,
      type: 'news',
      image: newsImage,
      category: 'НОВОСТИ',
      title: 'Всемирная Общественная Ассамблея объединила представителей из 47 стран',
      excerpt: 'В Таврическом дворце состоялась Первая Всемирная Общественная Ассамблея, собравшая лидеров общественных организаций из разных уголков планеты.',
      date: '02.10.2025'
    },
    {
      id: 6,
      type: 'news',
      image: newsImage,
      category: 'НОВОСТИ',
      title: 'Открытие Всемирной Общественной Ассамблеи: диалог ради будущего',
      excerpt: 'Сегодня в Санкт-Петербурге началась работа Первой Всемирной Общественной Ассамблеи – масштабной международной площадки для обсуждения глобальных вызовов современности.',
      date: '01.10.2025'
    },
    {
      id: 7,
      type: 'article',
      image: newsImage,
      category: 'СТАТЬИ',
      title: 'Роль народной дипломатии в современном мире',
      excerpt: 'Экспертный взгляд на значение народной дипломатии в решении глобальных конфликтов и укреплении международного сотрудничества.',
      date: '28.09.2025'
    },
    {
      id: 8,
      type: 'article',
      image: newsImage,
      category: 'СТАТЬИ',
      title: 'Межкультурный диалог как основа мирного сосуществования',
      excerpt: 'Анализ успешных практик межкультурного взаимодействия на примере проектов Всемирной Общественной Ассамблеи.',
      date: '25.09.2025'
    }
  ];

  const tabs: Tab[] = [
    { id: 'all', label: 'Все публикации', title: 'Пресс-центр', breadcrumb: 'Пресс-центр' },
    { id: 'news', label: 'Новости', title: 'Новости', breadcrumb: 'Новости' },
    { id: 'articles', label: 'Статьи', title: 'Статьи', breadcrumb: 'Статьи' },
    { id: 'photo', label: 'Фото', title: 'Фотогалерея', breadcrumb: 'Фотогалерея' },
    { id: 'video', label: 'Видео', title: 'Видео', breadcrumb: 'Видео' }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  // Simple filtering logic
  const getFilteredPublications = (): Publication[] => {
    switch (activeTab) {
      case 'all':
        return publications;
      case 'news':
        return publications.filter(pub => pub.type === 'news');
      case 'articles':
        return publications.filter(pub => pub.type === 'article');
      case 'photo':
      case 'video':
        return [];
      default:
        return publications;
    }
  };

  const filteredPublications = getFilteredPublications();

  return (
    <div className="flex flex-col min-h-dvh bg-gray-50">
      <Header currentPage="press-center" />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-[#4db8b8]">{locale === 'ru' ? 'Главная' : 'Home'}</button>
            <ChevronRight className="w-4 h-4" />
            <button onClick={() => navigate('/press-center')} className="hover:text-[#4db8b8]">{locale === 'ru' ? 'Пресс-центр' : 'Press Center'}</button>
            {activeTab !== 'all' && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#1a1f4d]">{currentTab.breadcrumb}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="bg-white py-16 flex-1">
        <div className="max-w-7xl mx-auto px-8">
          {/* Title */}
          <h1 className="text-[#1a1f4d] text-center mb-12">{currentTab.title}</h1>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#4db8b8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Photo Gallery Tab */}
          {activeTab === 'photo' ? (
            <PhotoGallery />
          ) : (
            <>
              {loading && (
                <div className="text-center py-16 text-gray-500">
                  {locale === 'ru' ? 'Загрузка публикаций...' : 'Loading publications...'}
                </div>
              )}
              {error && (
                <div className="text-center py-16 text-red-500">
                  {error}
                </div>
              )}
              {!loading && !error && (
                <>
                  {/* Publications Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredPublications.map(item => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="text-[#4db8b8] text-sm mb-3">{item.category}</div>
                      <h3 className="text-[#1a1f4d] mb-3 line-clamp-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {item.excerpt}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">{item.date}</p>
                      <button
                        className="border border-[#1a1f4d] text-[#1a1f4d] px-6 py-2 rounded hover:bg-[#1a1f4d] hover:text-white transition-colors"
                        onClick={() => navigate(`/news/${item.id}`)}
                      >
                        {locale === 'ru' ? 'Подробнее' : 'Read more'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

                  {/* Empty State */}
                  {filteredPublications.length === 0 && (
                    <div className="text-center py-16">
                      {activeTab === 'video' ? (
                        <p className="text-gray-500">{locale === 'ru' ? 'Видеоматериалы скоро появятся' : 'Videos coming soon'}</p>
                      ) : (
                        <p className="text-gray-500">{locale === 'ru' ? 'Публикации в данной категории скоро появятся' : 'Publications in this category coming soon'}</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}