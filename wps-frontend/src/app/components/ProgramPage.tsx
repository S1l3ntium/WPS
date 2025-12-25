import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Download } from 'lucide-react';
import { eventsAPI, getLocalized } from '../../services/api';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { useSEO } from '../../hooks/useSEO';
import { Helmet } from 'react-helmet-async';

interface Event {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  location: string;
  tags: string[];
  downloadLink?: string;
}

export function ProgramPage() {
  const navigate = useLocaleNavigate();
  const { t, locale } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'program' | 'architecture' | 'documents'>('program');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // SEO Configuration
  const seoConfig = {
    title: locale === 'ru'
      ? 'Программа - Всемирное публичное собрание'
      : 'Program - World Public Assembly',
    description: locale === 'ru'
      ? 'Полная программа Всемирного публичного собрания с расписанием событий, выступлениями, панель-дискуссий и деловыми встречами по всем направлениям конференции.'
      : 'Complete program of the World Public Assembly with event schedule, speeches, panel discussions and business meetings across all conference directions.',
    keywords: locale === 'ru'
      ? ['программа конференции', 'расписание', 'события', 'панель-дискуссия', 'выступления']
      : ['conference program', 'schedule', 'events', 'panel discussions', 'speeches'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200',
    ogType: 'website'
  };

  useSEO(seoConfig);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventsAPI.getAll();

        const transformedEvents: Event[] = response.data.map((apiEvent: any) => ({
          id: String(apiEvent.id),
          date: apiEvent.date,
          time: apiEvent.time,
          title: getLocalized(apiEvent.title, locale as 'ru' | 'en'),
          description: getLocalized(apiEvent.description, locale as 'ru' | 'en'),
          location: getLocalized(apiEvent.location, locale as 'ru' | 'en'),
          tags: apiEvent.tags || [],
          downloadLink: apiEvent.downloadLink
        }));

        setEvents(transformedEvents);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError(t('programPage.errorLoadingEvents'));
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [locale, t]); // Reload when language changes

  const uniqueDates = ['all', ...Array.from(new Set(events.map(e => e.date)))];
  const allTags = Array.from(new Set(events.flatMap(e => e.tags)));
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredEvents = events.filter(event => {
    const dateMatch = selectedDate === 'all' || event.date === selectedDate;
    const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => event.tags.includes(tag));
    return dateMatch && tagMatch;
  });

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage="program" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-4xl mb-4 text-[#1a1f4d]">
              {t('programPage.pageTitle')}<br />
              {t('programPage.subtitle')}
            </h1>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedTab('program')}
                className={`px-8 py-3 border rounded transition-colors ${
                  selectedTab === 'program'
                    ? 'border-[#1a1f4d] text-[#1a1f4d]'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {t('programPage.programTab')}
              </button>
              <button
                onClick={() => setSelectedTab('architecture')}
                className={`px-8 py-3 border rounded transition-colors ${
                  selectedTab === 'architecture'
                    ? 'border-[#1a1f4d] text-[#1a1f4d]'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {t('programPage.architectureTab')}
              </button>
              <button
                onClick={() => setSelectedTab('documents')}
                className={`px-8 py-3 border rounded transition-colors ${
                  selectedTab === 'documents'
                    ? 'border-[#1a1f4d] text-[#1a1f4d]'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {t('programPage.documentsTab')}
              </button>
            </div>
          </div>
        </section>

        {selectedTab === 'program' && (
          <>
            {/* Date filter - horizontal tabs */}
            <section className="bg-white py-6">
              <div className="max-w-7xl mx-auto px-8">
                <div className="flex gap-0 border rounded overflow-hidden">
                  <button
                    onClick={() => setSelectedDate('all')}
                    className={`flex-1 py-3 px-4 text-sm transition-colors ${
                      selectedDate === 'all'
                        ? 'bg-[#1a1f4d] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-r'
                    }`}
                  >
                    {t('programPage.allDays')}
                  </button>
                  <button
                    onClick={() => setSelectedDate('19.09.2025')}
                    className={`flex-1 py-3 px-4 text-sm transition-colors ${
                      selectedDate === '19.09.2025'
                        ? 'bg-[#1a1f4d] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-r'
                    }`}
                  >
                    19.09.2025 (Пт)
                  </button>
                  <button
                    onClick={() => setSelectedDate('20.09.2025')}
                    className={`flex-1 py-3 px-4 text-sm transition-colors ${
                      selectedDate === '20.09.2025'
                        ? 'bg-[#1a1f4d] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-r'
                    }`}
                  >
                    20.09.2025 (Сб)
                  </button>
                  <button
                    onClick={() => setSelectedDate('21.09.2025')}
                    className={`flex-1 py-3 px-4 text-sm transition-colors ${
                      selectedDate === '21.09.2025'
                        ? 'bg-[#1a1f4d] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    21.09.2025 (Вс)
                  </button>
                </div>
              </div>
            </section>

            {/* Events List */}
            <section className="py-12">
              <div className="max-w-7xl mx-auto px-8">
                {loading && (
                  <div className="text-center py-12 text-gray-500">
                    {t('programPage.loadingEvents')}
                  </div>
                )}
                {error && (
                  <div className="text-center py-12 text-red-500">
                    {error}
                  </div>
                )}
                {!loading && !error && Object.keys(groupedEvents).length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {t('programPage.noEventsFound')}
                  </div>
                ) : (
                  Object.entries(groupedEvents).map(([date, dateEvents]) => (
                    <div key={date} className="mb-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dateEvents.map(event => (
                          <div
                            key={event.id}
                            onClick={() => navigate(`/event/${event.id}`)}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                          >
                            <div className="text-sm text-gray-900 mb-4">
                              {event.date.split('.')[0]} {t('programPage.september')} {event.time}
                            </div>
                            
                            <h3 className="text-lg mb-4 text-[#4db8b8] leading-snug">
                              {event.title}
                            </h3>
                            
                            <p className="text-sm text-gray-600 mb-6">
                              {event.description} [{event.location}]
                            </p>
                            
                            <div className="flex gap-3">
                              <button className="px-6 py-2 bg-[#1a1f4d] text-white rounded-full text-sm hover:bg-[#2c3570] transition-colors">
                                {t('programPage.programButton')}
                              </button>
                              <button className="px-6 py-2 bg-[#1a1f4d] text-white rounded-full text-sm hover:bg-[#2c3570] transition-colors">
                                {t('programPage.streamButton')}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </>
        )}

        {selectedTab === 'documents' && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-8">
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl mb-6 text-[#1a1f4d]">
                  {t('programPage.documentsTitle')}
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      key: 'programPage.programDocuments',
                      size: '2.4 MB'
                    },
                    {
                      key: 'programPage.finalDeclaration',
                      size: '1.8 MB'
                    },
                    {
                      key: 'programPage.assemblyCharter',
                      size: '3.2 MB'
                    },
                    {
                      key: 'programPage.participantsList',
                      size: '1.1 MB'
                    },
                    {
                      key: 'programPage.presentationMaterials',
                      size: '15.6 MB'
                    }
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <div className="mb-1">{t(doc.key as any)}</div>
                        <div className="text-sm text-gray-500">{doc.size}</div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1f4d] text-white rounded hover:bg-[#2c3570] transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">{t('programPage.download')}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}