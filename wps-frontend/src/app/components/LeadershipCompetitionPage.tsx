import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChevronRight } from 'lucide-react';
const groupImage = 'placeholder.png';

export function LeadershipCompetitionPage() {
  const navigate = useNavigate();
  const newsItems = [
    {
      image: groupImage,
      date: '03.10.2025',
      title: 'На полях Всемирной Общественной Ассамблеи объявили победителей IV Международного конкурса «Лидер народной дипломатии»',
      excerpt: 'На полях Первой Всемирной Общественной Ассамблеи состоялись финальные состязания и церемония награждения лауреатов IV Конкурса',
      highlight: '«Лидер народной дипломатии — 2025»'
    },
    {
      image: groupImage,
      date: '15.09.2025',
      title: 'Объявлены финалисты IV Международного конкурса «Лидер народной дипломатии»',
      excerpt: 'По результатам работы экспертного совета определены 60 финалистов, которые примут участие в церемонии награждения'
    },
    {
      image: groupImage,
      date: '31.07.2025',
      title: 'Завершился образовательный интенсив для участников конкурса',
      excerpt: 'Более 200 участников из разных стран мира прошли обучение в рамках образовательного онлайн-интенсива'
    },
    {
      image: groupImage,
      date: '15.07.2025',
      title: 'Завершился прием заявок на участие в IV Международном конкурсе «Лидер народной дипломатии»',
      excerpt: 'Организаторами Конкурса были получены и обработаны заявки от лидеров общественных организаций из 47 стран мира'
    },
    {
      image: groupImage,
      date: '16.04.2025',
      title: 'Стартовал прием заявок на IV Международный конкурс «Лидер народной дипломатии»',
      excerpt: 'Начался прием конкурсных материалов для участия в престижном международном конкурсе'
    }
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-gray-50">
      <Header currentPage="leadership-competition" />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-[#4db8b8]">Главная</button>
            <ChevronRight className="w-4 h-4" />
            <span>Гранты и конкурсы</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1a1f4d]">IV Международный конкурс «Лидер народной дипломатии»</span>
          </div>
        </div>
      </div>

      {/* Hero Section with Image */}
      <section className="flex-1 bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Text */}
            <div>
              <div className="text-gray-500 mb-3">
                IV Международный конкурс
              </div>
              <h1 className="text-[#4db8b8] mb-6">
                «Лидер народной<br />
                дипломатии»
              </h1>
              <p className="text-gray-700 mb-8">
                Конкурс поддерживает лидеров из разных стран, 
                чья деятельность направлена на развитие народной 
                дипломатии, укрепление межнационального 
                и межрелигиозного мира и согласия, доверия 
                и взаимопонимания между народами
              </p>
              <button className="bg-[#4db8b8] text-white px-8 py-3 rounded hover:bg-[#3da0a0] transition-colors">
                Скачать Положение о Конкурсе
              </button>
            </div>

            {/* Right Column - Image */}
            <div>
              <img 
                src={groupImage} 
                alt="Участники конкурса" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-5xl text-[#4db8b8] mb-2">4</div>
              <p className="text-gray-700">континента</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-5xl text-[#4db8b8] mb-2">47</div>
              <p className="text-gray-700">стран мира</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Participate Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left - Title */}
            <div className="lg:col-span-2">
              <h2 className="text-[#4db8b8]">Кто может<br />участвовать</h2>
            </div>

            {/* Right - Content */}
            <div className="lg:col-span-3">
              <p className="text-gray-700 mb-4">
                В Конкурсе могут принять участие представители неправительственных организаций 
                (НПО), интернет-сообществ, а также соотечественники, проживающие за рубежом и 
                иностранные граждане, реализующие проекты в сфере народной дипломатии, чья 
                деятельность не противоречит российскому законодательству, в возрасте от 18 лет, 
                имеющие опыт реализации проектов в сфере народной дипломатии в качестве лидера не 
                менее двух лет.
              </p>
              <p className="text-gray-700 italic">
                Лидеры НПО, реализующие проекты в сфере народной дипломатии, не должны являться 
                государственными и муниципальными служащими
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Participation Models Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left - Title */}
            <div className="lg:col-span-2">
              <h2 className="text-[#1a1f4d]">Все модели<br />участия</h2>
            </div>

            {/* Right - Content */}
            <div className="lg:col-span-3 space-y-4">
              <p className="text-gray-700">
                В рамках III Международного конкурса «Лидер народной дипломатии» предусмотрено 
                6 моделей участия в виде самостоятельных номинаций. Возможно участие в нескольких 
                номинациях одновременно, при условии представления материалов по каждой номинации 
                отдельно. Подробности в Положении о конкурсе.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Народная дипломатия</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Содействие продвижению</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Медиа-лидер</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Лидер народной дипломатии</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Социальная интеграция</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Социальная повестка дня</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left - Title */}
            <div className="lg:col-span-2">
              <h2 className="text-[#1a1f4d]">Награждения<br />конкурса</h2>
            </div>

            {/* Right - Content */}
            <div className="lg:col-span-3">
              <p className="text-gray-700 mb-6">
                По результатам конкурса определяются лауреаты по каждой номинации отдельно. 
                Лауреаты получат памятные дипломы, соответствующие дипломатическому протоколу 
                и смогут использовать их для дополнительного подтверждения международного статуса 
                своих организаций и проектов.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-[#1a1f4d] mb-1">Сертификат участника конкурса</h3>
                    <p className="text-gray-600 text-sm">Для всех участников и номинантов</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-[#1a1f4d] mb-1">Специальные номинации Экспертного совета</h3>
                    <p className="text-gray-600 text-sm">По решению жюри конкурса</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-[#1a1f4d] mb-1">Гран-при конкурса</h3>
                    <p className="text-gray-600 text-sm">Лучший из лучших среди всех номинантов</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700">
                Церемония награждения победителей пройдет в рамках Всемирной Общественной Ассамблеи 
                в торжественной обстановке Таврического дворца 27-30 октября 2025 года.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Stages */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-[#1a1f4d] text-center mb-12">Этапы проведения конкурса</h2>

          <div className="space-y-0 divide-y divide-gray-200">
            {/* Stage 1 */}
            <div className="grid grid-cols-5 gap-12 py-8">
              <div className="col-span-1">
                <div className="text-[#4db8b8]">Этап 1</div>
              </div>
              <div className="col-span-4">
                <h3 className="text-[#4db8b8] mb-3">
                  Прием конкурсных материалов
                </h3>
                <p className="text-[#1a1f4d] mb-4">16 апреля — 15 июля 2025</p>
                <p className="text-gray-700">
                  Для участия в Международном конкурсе необходимо через форму приема 
                  заявок направить документы в соответствии с Положением Конкурса 
                  с приложением рекомендательных писем от организаций и/или их лидеров 
                  на русском или английском языке.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="grid grid-cols-5 gap-12 py-8">
              <div className="col-span-1">
                <div className="text-[#4db8b8]">Этап 2</div>
              </div>
              <div className="col-span-4">
                <h3 className="text-[#4db8b8] mb-3">
                  Образовательный интенсив
                </h3>
                <p className="text-[#1a1f4d] mb-4">21 — 31 июля 2025</p>
                <p className="text-gray-700 mb-2">
                  Для всех участников Конкурса проводится образовательный онлайн-интенсив.
                </p>
                <p className="text-gray-700">
                  До 31 июля 2025 г. проводится отбор 120 полуфиналистов.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="grid grid-cols-5 gap-12 py-8">
              <div className="col-span-1">
                <div className="text-[#4db8b8]">Этап 3</div>
              </div>
              <div className="col-span-4">
                <h3 className="text-[#4db8b8] mb-3">
                  Отбор финалистов
                </h3>
                <p className="text-[#1a1f4d] mb-4">1 августа — 15 сентября 2025</p>
                <p className="text-gray-700">
                  Проводится отбор 60 финалистов из числа полуфиналистов для участия 
                  в церемонии награждения на площадке Таврического дворца. 
                  Результаты публикуются на сайте Ассамблеи до 15 сентября 2025 года.
                </p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="grid grid-cols-5 gap-12 py-8">
              <div className="col-span-1">
                <div className="text-[#4db8b8]">Этап 4</div>
              </div>
              <div className="col-span-4">
                <h3 className="text-[#4db8b8] mb-3">
                  Церемония награждения
                </h3>
                <p className="text-[#1a1f4d] mb-4">27 — 30 октября 2025</p>
                <p className="text-gray-700">
                  Проводится в рамках Всемирной Общественной Ассамблеи в торжественной 
                  обстановке Таврического дворца. Лауреаты Конкурса будут награждены 
                  дипломами и памятными подарками.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="bg-[#1a1f4d] text-white px-8 py-3 rounded hover:bg-[#252b5e] transition-colors">
              Подать заявку на конкурс
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-[#1a1f4d] mb-8">По всем вопросам проекта</h2>
          
          <div className="space-y-3">
            <div>
              <p className="text-[#1a1f4d]">Бакланова Наталья</p>
              <a href="tel:+79313331020" className="text-[#4db8b8] hover:underline">+7 (931) 333-10-20</a>
            </div>
            <div>
              <a href="mailto:diplomacy@n-mir.org" className="text-[#4db8b8] hover:underline">diplomacy@n-mir.org</a>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-[#4db8b8] mb-12">Актуальные новости</h2>
          
          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <div key={index} className="flex gap-6 hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-72 h-48 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-gray-500 text-sm mb-3">{item.date}</p>
                  <h3 className="text-[#1a1f4d] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mb-2">{item.excerpt}</p>
                  {item.highlight && (
                    <p className="text-[#1a1f4d]">{item.highlight}</p>
                  )}
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