import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Plane, Users, MapPin, AlertCircle } from 'lucide-react';
import { hotelsAPI, getLocalized } from '../../services/api';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { useSEO } from '../../hooks/useSEO';
import { Helmet } from 'react-helmet-async';

type Tab = 'accommodation' | 'transfer' | 'badges';

const hotels = {
  recommended: [
    {
      id: 1,
      name: 'Lotte Hotel Moscow',
      address: 'Москва, Новинский бул., д. 8, стр. 2',
      metro: 'м. Смоленская',
      price: 'от 25 000 ₽',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzY1OTc3MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      name: 'Radisson Collection Hotel Moscow',
      address: 'Москва, Кутузовский пр-т, д. 2/1, стр. 1',
      metro: 'м. Киевская',
      price: 'от 20 000 ₽',
      image: 'https://images.unsplash.com/photo-1572177215152-32f247303126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGJлдровоом8ZW58MXx8fHwxNzY1OTY4ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      name: 'Hotel Baltschug Moscow',
      address: 'Москва, ул. Балчуг, д. 1',
      metro: 'м. Новокузнецкая',
      price: 'от 18 000 ₽',
      image: 'https://images.unsplash.com/photo-1662841540530-2f04bb3291e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2MDMyOTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 4,
      name: 'Plaza Garden Moscow WTC',
      address: 'Москва, Краснопресненская наб., д. 12',
      metro: 'м. Выставочная',
      price: 'от 15 000 ₽',
      image: 'https://images.unsplash.com/photo-1652881389205-9f85f82888c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaG90ZWwlMjByb29tfGVufDF8fHx8MTc2NTk3MTcxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 5,
      name: 'Harbour Access Lyon',
      address: 'Москва, Пресненская наб., д. 6, стр. 2',
      metro: 'м. Деловой центр',
      price: 'от 12 000 ₽',
      image: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjYwMDM5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ],
  championship: [
    {
      id: 6,
      name: 'Москва Мариотт Клубхаус',
      address: 'Москва, Петровка ул., д. 6/1',
      metro: 'м. Театральная',
      price: 'от 10 000 ₽',
      image: 'https://images.unsplash.com/photo-1661258279966-cfeb51c98327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaG90ZWwlMjByb29tfGVufDF8fHx8MTc2NjA5MDA2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 7,
      name: 'Амари Москва Клубхаус',
      address: 'Москва, Смоленская пл., д. 6',
      metro: 'м. Смоленская',
      price: 'от 8 000 ₽',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzY1OTc3MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ],
  verified: [
    {
      id: 8,
      name: 'Ибис Москва Павелецкая',
      address: 'Москва, ул. Кожевническая, д. 8, стр. 3',
      metro: 'м. Павелецкая',
      price: 'от 5 500 ₽',
      image: 'https://images.unsplash.com/photo-1572177215152-32f247303126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGJлдровоом8ZW58MXx8fHwxNzY1OTY4ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ]
};

export function ParticipantsPage() {
  const navigate = useLocaleNavigate();
  const { t, locale } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('accommodation');
  const [hotelsByCategory, setHotelsByCategory] = useState<Record<string, any[]>>({ recommended: [], championship: [], verified: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // SEO Configuration
  const seoConfig = {
    title: locale === 'ru'
      ? 'Участникам - Всемирное публичное собрание'
      : 'Participants - World Public Assembly',
    description: locale === 'ru'
      ? 'Информация для участников Всемирного публичного собрания. Размещение, трансферы, аккредитация, необходимые документы. Рекомендуемые отели в Москве.'
      : 'Information for participants of the World Public Assembly. Accommodation, transfers, accreditation, required documents. Recommended hotels in Moscow.',
    keywords: locale === 'ru'
      ? ['участники', 'размещение', 'отели', 'аккредитация', 'трансфер', 'Москва']
      : ['participants', 'accommodation', 'hotels', 'accreditation', 'transfer', 'Moscow'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200',
    ogType: 'website' as const
  };

  useSEO(seoConfig);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await hotelsAPI.getAll();

        const grouped = {
          recommended: [] as any[],
          championship: [] as any[],
          verified: [] as any[]
        };

        response.data.forEach((hotel: any) => {
          const transformedHotel = {
            id: hotel.id,
            name: getLocalized(hotel.name, locale as 'ru' | 'en'),
            address: getLocalized(hotel.address, locale as 'ru' | 'en'),
            metro: getLocalized(hotel.metro, locale as 'ru' | 'en'),
            price: hotel.price,
            image: hotel.image,
            category: hotel.category
          };

          if (hotel.category === 'recommended') {
            grouped.recommended.push(transformedHotel);
          } else if (hotel.category === 'championship') {
            grouped.championship.push(transformedHotel);
          } else if (hotel.category === 'verified') {
            grouped.verified.push(transformedHotel);
          }
        });

        setHotelsByCategory(grouped);
      } catch (err) {
        console.error('Failed to fetch hotels:', err);
        setError(t('participantsPage.errorLoadingHotels'));
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, [locale, t]); // Reload when language changes

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header currentPage="participants" />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Tabs */}
          <div className="flex gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('accommodation')}
              className={`pb-4 px-2 transition-colors relative ${
                activeTab === 'accommodation'
                  ? 'text-[#1a1f4d]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Размещение
              {activeTab === 'accommodation' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4db8b8]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('transfer')}
              className={`pb-4 px-2 transition-colors relative ${
                activeTab === 'transfer'
                  ? 'text-[#1a1f4d]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Трансфер
              {activeTab === 'transfer' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4db8b8]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`pb-4 px-2 transition-colors relative ${
                activeTab === 'badges'
                  ? 'text-[#1a1f4d]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Выдача бейджей
              {activeTab === 'badges' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4db8b8]" />
              )}
            </button>
          </div>

          {/* Content */}
          {activeTab === 'accommodation' && (
            <div>
              {loading && (
                <div className="text-center py-12 text-gray-500">
                  Загрузка информации об отелях...
                </div>
              )}
              {error && (
                <div className="text-center py-12 text-red-500">
                  {error}
                </div>
              )}
              {!loading && !error && (
                <>
                  {/* Title and Description */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#1a1f4d]">Гостиницы</h1>
                  <div className="mb-8 text-gray-600 space-y-4">
                    <p>Официальный платеж даты:</p>
                    <p>
                      Полная оплата одноместного размещения с проживанием и завтраком в отелях категории:
                      3*, 4*, и 5*. Номера для других категорий участников предоставляются двухместного типа.
                      Вступлене членского взноса осуществляется на основании выставленного счета.
                    </p>
                  </div>

                  {/* Recommended Hotels */}
                  <section className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-[#1a1f4d]">Рекомендуемые отели</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      {hotelsByCategory.recommended.map(hotel => (
                    <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden">
                        <ImageWithFallback
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-5 md:p-6">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                          Специальный тариф: <span className="text-[#4db8b8]">предоставлен</span>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 text-[#1a1f4d]">{hotel.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-5 md:mb-6">{hotel.address}</p>
                        <button onClick={() => window.open('https://payment.worldpublicsummit.test', '_blank')} className="border border-[#1a1f4d] hover:bg-[#1a1f4d] hover:text-white text-[#1a1f4d] px-6 py-3 rounded transition-colors">
                          Перейти к оплате
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

                  {/* Championship Partner Hotels */}
                  <section className="mb-12">
                    <h2 className="text-2xl mb-6 text-[#1a1f4d]">Чемпионские партнерские отели</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {hotelsByCategory.championship.map(hotel => (
                    <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                        <ImageWithFallback
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-gray-600 mb-2">
                          Специальный тариф: <span className="text-[#4db8b8]">предоставлен</span>
                        </div>
                        <h3 className="text-2xl mb-3 text-[#1a1f4d]">{hotel.name}</h3>
                        <p className="text-sm text-gray-600 mb-6">{hotel.address}</p>
                        <button onClick={() => window.open('https://payment.worldpublicsummit.test', '_blank')} className="border border-[#1a1f4d] hover:bg-[#1a1f4d] hover:text-white text-[#1a1f4d] px-6 py-3 rounded transition-colors">
                          Перейти к оплате
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

                  {/* Verified Hotels */}
                  <section className="mb-12">
                    <h2 className="text-2xl mb-6 text-[#1a1f4d]">Проверенные отели</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {hotelsByCategory.verified.map(hotel => (
                    <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                        <ImageWithFallback
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-gray-600 mb-2">
                          Специальный тариф: <span className="text-[#4db8b8]">предоставлен</span>
                        </div>
                        <h3 className="text-2xl mb-3 text-[#1a1f4d]">{hotel.name}</h3>
                        <p className="text-sm text-gray-600 mb-6">{hotel.address}</p>
                        <button onClick={() => window.open('https://payment.worldpublicsummit.test', '_blank')} className="border border-[#1a1f4d] hover:bg-[#1a1f4d] hover:text-white text-[#1a1f4d] px-6 py-3 rounded transition-colors">
                          Перейти к оплате
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

                  {/* Cultural Program */}
                  <section className="mb-12">
                    <h2 className="text-2xl mb-6 text-[#1a1f4d]">Культурная программа</h2>
                    <div className="text-gray-600 space-y-4">
                      <p className="italic">Исполнитель российских песен.</p>
                      <p>
                        Музыка и зрелищное представление общероссийский классический и современный концертный репертуар, программы гала-концертов с участием легендарных мастеров русского балета, выдающих звезд Российской оперы, романса, классического и современного музыкального творчества.
                      </p>
                      <p>
                        Также участники смогут посетить достопримечательности культурной столицы России - Москвы.
                      </p>
                      <div className="mt-6">
                        <p className="mb-2">Дополнительную информацию Международного управления, рамки и характеристики:</p>
                        <ul className="space-y-2">
                          <li className="flex gap-2">
                            <span className="text-[#4db8b8]">•</span>
                            <span>Телефон: +7 (495) 123-45-67</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#4db8b8]">•</span>
                            <span>Email: info@worldassembly.ru</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
          )}

          {activeTab === 'transfer' && (
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-[#1a1f4d]">Трансфер для участников</h1>
              
              <p className="text-gray-700 mb-6">Уважаемые участники!</p>
              
              <p className="text-gray-700 mb-8">
                В период <span className="font-semibold">с 18 по 22 сентября 2025</span> года для всех гостей, <span className="font-semibold">размещающихся в рекомендуемых отелях Всемирной Общественной Ассамблеи</span>, будет организован трансфер из аэропортов Москвы — Шереметьево, Домодедово и Внуково.
              </p>

              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#1a1f4d] flex items-center justify-center">
                      <Plane className="w-6 h-6 text-[#1a1f4d]" />
                    </div>
                    <div>
                      <p className="text-gray-700">
                        Трансфер осуществляется в <span className="font-semibold">круглосуточном режиме</span> в соответствии с индивидуальным временем прбытия и вылета участников
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#1a1f4d] flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#1a1f4d]" />
                    </div>
                    <div>
                      <p className="text-gray-700">
                        В зоне прилёта Вас встретит <span className="font-semibold">волонтёр Ассамблеи</span> с приветственной табличкой с указанием наименования мероприятия (Всемирная Общественная Ассамблея) и сопроводит до трансфера
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1605727903036-9ce682f72cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwdm9sdW50ZWVycyUyMGdyZWV0aW5nfGVufDF8fHx8MTc2NjA5MDY3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Волонтеры встречают участников"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                Для участников, выбравших размещение <span className="font-semibold">в других отелях</span>, трансфер от аэропорта до отеля не предусматривается.
              </p>

              <p className="text-gray-700 mb-12">
                Однако команда Ассамблеи окажет Вам помощь в заказ такси или другого удобного способа передвижения — по предварительному обращению к волонтёру на месте.
              </p>

              <p className="text-gray-700 mb-16">
                Мы сделаем всё возможное, чтобы Ваше прибытие в Москву прошло комфортно и организованно.
              </p>

              {/* Cultural Program Section */}
              <section>
                <h2 className="text-3xl mb-8 text-[#1a1f4d]">Культурная программа</h2>
                
                <p className="text-gray-700 mb-6">Уважаемые участники!</p>

                <p className="text-gray-700 mb-6">
                  В рамках Всемирной Общественной Ассамблеи подготовлена специальная культурная программа, которая позволит гостям ближе познакомиться с историей и атмосферой Москвы: прогулки и экскурсии по знаковым местам столицы, посещение ведущих культурных площадок и уникальные впечатления в компании профессиональных гидов.
                </p>

                <p className="text-gray-700 mb-8">
                  <span className="font-semibold">Количество мест ограничено</span>, поэтому рекомендуем заранее ознакомиться с расписанием и зарегистрироваться.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                  <p className="text-gray-700">
                    <span className="font-semibold">Обратите внимание:</span> бронирование доступно <span className="font-semibold">только для участников Всемирной Общественной Ассамблеи</span> и осуществляется строго на одного человека — каждый участник может оформить только одно бронирование
                  </p>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'badges' && (
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-[#1a1f4d]">Выдача бейджей</h1>
              
              <p className="text-gray-700 mb-6">Уважаемые участники!</p>
              
              <p className="text-gray-700 mb-12">
                Доступ на площадку проведения деловой программы Всемирной Общественной Ассамблеи <span className="font-semibold">возможен только при наличии аккредитационного бейджа</span>.
              </p>

              <p className="text-gray-700 mb-8">
                Для получения бейджа участника лично необходимо предъявить <span className="font-semibold">документ, удостоверяющий личность, данные которого были указаны при регистрации</span>, а также распечатанную либо электронную версию <span className="font-semibold">Согласия на обработку персональных данных</span>. Скачать согласие можно <a href="/api/documents/download/consent-agreement" className="text-[#4db8b8] hover:underline">по ссылке</a>.
              </p>

              <p className="text-gray-700 mb-12">
                Вы обязаны сообщить о других лицах/листся с доступов в площадку после участников <span className="font-semibold">забронирование получить бейдж в пункте аккредитации в Москве</span>:
              </p>

              {/* Badge Distribution Locations */}
              <div className="space-y-6 sm:space-y-8 mb-12 md:mb-16">
                {/* Location 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 md:gap-8 items-start">
                  <div className="text-[#4db8b8] text-sm sm:text-base md:text-lg font-medium min-w-fit">С 17 по 19 сентября</div>
                  <div>
                    <div className="flex gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                      <h3 className="text-lg sm:text-xl text-[#1a1f4d]">Офис-штаб Ассамблеи Народов Мира</h3>
                    </div>
                    <p className="text-gray-700 mb-2 ml-8 text-sm sm:text-base">Москва, Успенский переулок, д. 4А <span className="italic">(время работы: 10:00 — 18:00)</span></p>
                    <a href="https://yandex.ru/maps/?text=Москва%2C%20Успенский%20переулок%2C%20д.%204А" target="_blank" rel="noopener noreferrer" className="text-[#1a1f4d] hover:underline inline-flex items-center gap-1 ml-8 text-sm sm:text-base">
                      Смотреть на карте →
                    </a>
                  </div>
                </div>

                {/* Location 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 md:gap-8 items-start">
                  <div className="text-[#4db8b8] text-sm sm:text-base md:text-lg font-medium min-w-fit">18 сентября</div>
                  <div>
                    <div className="flex gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                      <h3 className="text-lg sm:text-xl text-[#1a1f4d]">В рекомендованных отелях</h3>
                    </div>
                    <p className="text-gray-700 mb-2 ml-8 text-sm sm:text-base">В отелях будет создан World Public Assembly в зоне ресепшн <span className="italic">(время работы: 09:00 — 20:00)</span></p>
                    <a href="/hotels" className="text-[#1a1f4d] hover:underline inline-flex items-center gap-1 ml-8 text-sm sm:text-base">
                      Смотреть список отелей →
                    </a>
                  </div>
                </div>

                {/* Location 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 md:gap-8 items-start">
                  <div className="text-[#4db8b8] text-sm sm:text-base md:text-lg font-medium min-w-fit">С 20 по 21 сентября</div>
                  <div>
                    <div className="flex gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                      <h3 className="text-lg sm:text-xl text-[#1a1f4d]">Центр международной торговли (ЦМТ)</h3>
                    </div>
                    <p className="text-gray-700 mb-2 ml-8 text-sm sm:text-base">Москва, Краснопресненская набережная, дом 12, Конгресс-Центр <span className="italic">(время работы: 08:00 — 18:00)</span></p>
                    <a href="https://yandex.ru/maps/?text=Москва%2C%20Краснопресненская%20набережная%2C%20дом%2012" target="_blank" rel="noopener noreferrer" className="text-[#1a1f4d] hover:underline inline-flex items-center gap-1 ml-8 text-sm sm:text-base">
                      Смотреть на карте →
                    </a>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-16">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-[#1a1f4d] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl mb-4 text-[#1a1f4d]">Обратите внимание</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-[#4db8b8] flex-shrink-0">•</span>
                        <span>Бейдж выдается только после прохождения регистрации;</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#4db8b8] flex-shrink-0">•</span>
                        <span>При получении бейджа необходимо предъявить паспорт или иной документ, удостоверяющий личность;</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#4db8b8] flex-shrink-0">•</span>
                        <span>Бейдж является обязательным для прохода на все мероприятия Всемирной Общественной Ассамблеи.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cultural Program Section */}
              <section>
                <h2 className="text-3xl mb-8 text-[#1a1f4d]">Культурная программа</h2>
                
                <p className="text-gray-700 mb-6">Уважаемые участники!</p>

                <p className="text-gray-700 mb-6">
                  В рамках Всемирной Общественной Ассамблеи подготовлена специальная культурная программа, которая позволит гостям ближе познакомиться с историей и атмосферой Москвы: прогулки и экскурсии по знаковым местам столицы, посещение ведущих культурных площадок и уникальные впечатления в компании профессиональных гидов.
                </p>

                <p className="text-gray-700 mb-8">
                  <span className="font-semibold">Количество мест ограничено</span>, поэтому рекомендуем заранее ознакомиться с расписанием и зарегистрироваться.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <p className="text-gray-700">
                    <span className="font-semibold">Обращаем внимание:</span> бронирование доступно <span className="font-semibold">только для участников Всемирной Общественной Ассамблеи</span> и осуществляется строго на одного человека — каждый участник может оформить только одно бронирование
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}