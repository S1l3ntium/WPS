import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChevronRight } from 'lucide-react';
import { newsAPI } from '../../services/api';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
const newsImage = 'placeholder.png';

export function NewsPage() {
  const { newsId } = useParams<{ newsId: string }>();
  const navigate = useLocaleNavigate();
  const { t } = useTranslation();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      if (!newsId) return;

      try {
        setLoading(true);
        setError(null);
        const apiNews = await newsAPI.getById(parseInt(newsId));

        // Parse content into blocks if it's a string or localized object
        let contentText = '';
        if (typeof apiNews.content === 'string') {
          contentText = apiNews.content;
        } else if (apiNews.content && typeof apiNews.content === 'object' && !Array.isArray(apiNews.content)) {
          // Handle localized content { ru: "...", en: "..." }
          contentText = t(apiNews.content || '');
        }

        const contentBlocks = Array.isArray(apiNews.content)
          ? apiNews.content
          : [{ type: 'text', text: contentText }];

        const transformedNews = {
          id: newsId,
          date: apiNews.date,
          category: apiNews.category,
          title: t(apiNews.title || ''),
          lead: t(apiNews.lead || ''),
          image: apiNews.image,
          content: contentBlocks
        };

        setNews(transformedNews);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError(t('newsPage.error.loadFailed'));
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [newsId]); // Reload when newsId changes

  // Fallback content if API fails
  const defaultContent = [
      {
        type: 'text',
        text: 'Генеральный секретарь Ассамблеи Народов Мира Андрей Бельянинов назвал ВОА в интервью ТАСС «новым форматом дипломатии»:'
      },
      {
        type: 'quote',
        text: '«Общая народная дипломатия — это весь спектр международных, межрегиональных, научных и гуманитарных связей между людьми, в таком сотрудничестве в бизнесе, которые относятся не диктату и давлению. (...) Это умение слышать друг друга, понимать друг друга, способность в открытом диалоге, без сиюминутных политических интересов, не зависеть от текущих политических процессов. Только при таком единстве мы можем поделиться своим мнением, обсудить важные вопросы и выработать решения, которые помогут всем нам.»'
      },
      {
        type: 'text',
        text: 'На панельной сессии «Феномен народной дипломатии» в рамках масштабного форума Ассамблея Народов Мира собрала представителей культуры, общественных деятелей и представителей международных организаций.'
      },
      {
        type: 'text',
        text: 'Председатель президиума РАЕС Сергей Катырин отметил в своем выступлении историческую значимость дипломатии, считая её едва ли не наиболее значимым из новых глобальных инструментов:'
      },
      {
        type: 'quote',
        text: '«Мы все наблюдаем глобализацию во всех её проявлениях. Процветающая Европа превратила Россию в её Республику Россия как Европейскую Федерацию Малаиль возглавляет Сергей Малаиль.»'
      },
      {
        type: 'text',
        text: 'Президент компании Middle East & India, отметил, что истории не стоит на феномене сопрограммы: первые инициативы, блокчейн Индии - Россия. Президент центра Культурного партнёрства и общества и Индии Сергей Пал Сингхани. Его почетная принципиа международные отношений рекомендаций в США СМ.М,'
      },
      {
        type: 'quote',
        text: '«Нормальная дипломатия начинается с протоко Аллах. Они не боялись это делать.»'
      },
      {
        type: 'text',
        text: 'Заместитель исполнительного директора Национального Фонда почета развития на рынке Сопорельства Мусляевское Государство, сопровождается, направление на работе, и ты международного гуманитарному сотрудничеству. Государственного — Балкана Тиехулвав предупредиле:'
      },
      {
        type: 'quote',
        text: '«Люди не вымирают отдыхать. Мы философию является народа взаимопривезать друг с другом».'
      },
      {
        type: 'text',
        text: 'Совсем не случайно обозначили новое и фундаментальное описание:'
      },
      {
        type: 'text',
        text: 'Новая народная дипломатия представитель Общества индо-российской дружбы Стефанос Сукаш Сухана.'
      },
      {
        type: 'text',
        text: 'Директор на культуру и искусству посол Российского исторического общества генерального консула Индии Пал Сингхани: Мне показало о своих культурах и ассоциациями мед Европе, так поскольку взаимодействии. С таких состояния Федерация Малаиль отметил «Ван-Ясн Сняпен: Ты всё силами, искусство становится движениям, он органом касания проследил.'
      },
      {
        type: 'quote',
        text: '«Искусства стоит мистик, а не создают средство», — считает Вест Зеннаммахаз из Демократической Республики'
      },
      {
        type: 'text',
        text: 'Народная дипломатия — это доступный способ, кино умение обычных и культурной обмена, который продолжает путь к своему максимально Гюльсь Алиих общих мотиву истинных ценностей энергет межкультурной дипломатии «Великая народная дипломатия».'
      }
    ];

  return (
    <div className="flex flex-col min-h-dvh bg-gray-50">
      <Header currentPage="press-center" />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-[#4db8b8]">{t('newsPage.breadcrumbHome')}</button>
            <ChevronRight className="w-4 h-4" />
            <button onClick={() => navigate('/press-center')} className="hover:text-[#4db8b8]">{t('newsPage.breadcrumbPressCenter')}</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1a1f4d]">{t('newsPage.breadcrumbNews')}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="flex-1 bg-white py-12">
        <div className="max-w-4xl mx-auto px-8">
          {loading && (
            <div className="text-center py-12 text-gray-500">
              {t('newsPage.loading')}
            </div>
          )}
          {error && (
            <div className="text-center py-12 text-red-500">
              {error}
            </div>
          )}
          {!loading && !error && news && (
            <>
              {/* Date */}
              <div className="text-gray-500 text-sm mb-4">{news.date}</div>

              {/* Title */}
              <h1 className="text-[#1a1f4d] mb-6">{news.title}</h1>

              {/* Lead */}
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {news.lead}
              </p>

              {/* Main Image */}
              <div className="mb-8">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                {news.content.map((block: any, index: number) => {
                  if (block.type === 'text') {
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === 'quote') {
                    return (
                      <div key={index} className="border-l-4 border-[#4db8b8] bg-gray-50 p-6 my-6">
                        <p className="text-gray-800 italic leading-relaxed">
                          {block.text}
                        </p>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </>
          )}

          {/* Back Button */}
          <div className="mt-12 pt-8 border-t">
            <button
              onClick={() => navigate('/press-center')}
              className="text-[#4db8b8] hover:text-[#3da8a8] transition-colors flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              {t('newsPage.backToNewsList')}
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
