import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Download } from 'lucide-react';
import { eventsAPI, getLocalized } from '../../services/api';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { useSEO } from '../../hooks/useSEO';
import { getBaseUrl } from '../../utils/seo';
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
        <section className="bg-white py-8 sm:py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4 text-[#1a1f4d]">
              {t('programPage.pageTitle')}<br />
              {t('programPage.subtitle')}
            </h1>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex gap-2 sm:gap-4 overflow-x-auto">
              <button
                onClick={() => setSelectedTab('program')}
                className={`px-2 sm:px-4 md:px-6 py-3 text-xs sm:text-sm md:text-base border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                  selectedTab === 'program'
                    ? 'border-[#1a1f4d] text-[#1a1f4d] font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('programPage.programTab')}
              </button>
              <button
                onClick={() => setSelectedTab('architecture')}
                className={`px-2 sm:px-4 md:px-6 py-3 text-xs sm:text-sm md:text-base border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                  selectedTab === 'architecture'
                    ? 'border-[#1a1f4d] text-[#1a1f4d] font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('programPage.architectureTab')}
              </button>
              <button
                onClick={() => setSelectedTab('documents')}
                className={`px-2 sm:px-4 md:px-6 py-3 text-xs sm:text-sm md:text-base border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                  selectedTab === 'documents'
                    ? 'border-[#1a1f4d] text-[#1a1f4d] font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
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
            <section className="bg-white py-4 sm:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex gap-1 sm:gap-0 overflow-x-auto">
                  <button
                    onClick={() => setSelectedDate('all')}
                    className={`flex-1 min-w-max sm:flex-1 py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm transition-colors border-b-2 sm:border-b-0 sm:border-r ${
                      selectedDate === 'all'
                        ? 'bg-[#1a1f4d] text-white border-[#1a1f4d] font-medium'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {t('programPage.allDays')}
                  </button>
                  <button
                    onClick={() => setSelectedDate('19.09.2025')}
                    className={`flex-1 min-w-max sm:flex-1 py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm transition-colors border-b-2 sm:border-b-0 sm:border-r ${
                      selectedDate === '19.09.2025'
                        ? 'bg-[#1a1f4d] text-white border-[#1a1f4d] font-medium'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="hidden sm:inline">19.09.2025</span>
                    <span className="sm:hidden">19 (Пт)</span>
                  </button>
                  <button
                    onClick={() => setSelectedDate('20.09.2025')}
                    className={`flex-1 min-w-max sm:flex-1 py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm transition-colors border-b-2 sm:border-b-0 sm:border-r ${
                      selectedDate === '20.09.2025'
                        ? 'bg-[#1a1f4d] text-white border-[#1a1f4d] font-medium'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="hidden sm:inline">20.09.2025</span>
                    <span className="sm:hidden">20 (Сб)</span>
                  </button>
                  <button
                    onClick={() => setSelectedDate('21.09.2025')}
                    className={`flex-1 min-w-max sm:flex-1 py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm transition-colors border-b-2 sm:border-b-0 ${
                      selectedDate === '21.09.2025'
                        ? 'bg-[#1a1f4d] text-white border-[#1a1f4d] font-medium'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="hidden sm:inline">21.09.2025</span>
                    <span className="sm:hidden">21 (Вс)</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Events List */}
            <section className="py-6 sm:py-8 md:py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
                    <div key={date} className="mb-8 sm:mb-10 md:mb-12">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                        {dateEvents.map(event => (
                          <div
                            key={event.id}
                            onClick={() => navigate(`/event/${event.id}`)}
                            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
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
                            
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                              <button onClick={() => navigate(`/event/${event.id}`)} className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-[#1a1f4d] text-white rounded-full text-xs sm:text-sm hover:bg-[#2c3570] transition-colors">
                                {t('programPage.programButton')}
                              </button>
                              <button onClick={() => window.open(`${getBaseUrl()}/stream/${event.id}`, '_blank')} className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-[#1a1f4d] text-white rounded-full text-xs sm:text-sm hover:bg-[#2c3570] transition-colors">
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
          <section className="py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-[#1a1f4d]">
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
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors gap-3 sm:gap-4"
                    >
                      <div>
                        <div className="mb-1 text-sm sm:text-base">{t(doc.key as any)}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{doc.size}</div>
                      </div>
                      <button onClick={() => {
                        const documentKey = doc.key.replace('programPage.', '').replace(/([A-Z])/g, '-$1').toLowerCase();
                        window.location.href = `/api/documents/download/${documentKey}`;
                      }} className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1a1f4d] text-white rounded hover:bg-[#2c3570] transition-colors text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                        <Download className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span>{t('programPage.download')}</span>
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