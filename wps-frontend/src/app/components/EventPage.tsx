import { Header } from './Header';
import { Footer } from './Footer';
import { Calendar, Clock, MapPin, ArrowLeft, X, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { eventsAPI, getLocalized } from '../../services/api';

interface EventData {
  id: number;
  type: string;
  title: { ru: string; en: string };
  date: string;
  time: string;
  location: { ru: string; en: string };
  venue: { ru: string; en: string };
  description: { ru: string; en: string };
  additionalInfo: { ru: string; en: string };
  goals: string[];
  format: { ru: string; en: string };
  questions: string[];
  moderators: Array<{ id: number; name: string; description: string }>;
  experts: Array<{ id: number; name: string; description: string }>;
  speakers: Array<{ id: number; name: string; country: string; description: string }>;
  schedule: Array<{ time: string; title: string; speakers?: Array<{ name: string; description: string }> }>;
  tags: string[];
  downloadLink: string | null;
}

export function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useLocaleNavigate();
  const { t, locale } = useTranslation();
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(0);
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!eventId) {
          setError(t('common.notFound'));
          return;
        }
        const data = await eventsAPI.getById(Number(eventId));
        setEvent(data);
      } catch (err) {
        console.error('Failed to load event:', err);
        setError(t('common.error'));
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [eventId, t]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header currentPage="program" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-gray-600">{t('common.loading')}</div>
        </main>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header currentPage="program" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">{error || t('common.noData')}</p>
            <button
              onClick={() => navigate('/program')}
              className="text-[#4db8b8] hover:underline"
            >
              {t('buttons.back')}
            </button>
          </div>
        </main>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage="program" />

      <main className="flex-1 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
            <button onClick={() => navigate('/')} className="hover:text-[#4db8b8] transition-colors">
              {t('eventPage.breadcrumbHome')}
            </button>
            <span>/</span>
            <button onClick={() => navigate('/program')} className="hover:text-[#4db8b8] transition-colors">
              {t('eventPage.breadcrumbProgram')}
            </button>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate('/program')}
            className="flex items-center gap-2 text-[#1a1f4d] hover:text-[#4db8b8] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('eventPage.backToProgram')}</span>
          </button>

          {/* Event Type */}
          <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
            {event.type}
          </div>

          {/* Event Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#1a1f4d]">
            {getLocalized(event.title, locale as 'ru' | 'en')}
          </h1>

          {/* Date, Time, Location */}
          <div className="mb-6 sm:mb-8 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#4db8b8]" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#4db8b8]" />
                <span>{event.time}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#4db8b8] mt-0.5 flex-shrink-0" />
              <span>{getLocalized(event.location, locale as 'ru' | 'en')}</span>
            </div>
          </div>

          {/* Venue */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs sm:text-sm mb-1 sm:mb-2 text-gray-600 font-semibold">
              {t('eventPage.venue')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-900">{getLocalized(event.venue, locale as 'ru' | 'en')}</p>
          </div>

          {/* Description */}
          <div className="mb-8 sm:mb-12 space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-700">
            <p>{getLocalized(event.description, locale as 'ru' | 'en')}</p>
            <p>{getLocalized(event.additionalInfo, locale as 'ru' | 'en')}</p>
          </div>

          {/* Goals Section */}
          {event.goals && event.goals.length > 0 && (
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">
                <h2 className="text-2xl text-[#4db8b8]">
                  {t('eventPage.sessionGoals')}
                </h2>
                <ul className="space-y-3">
                  {event.goals.map((goal, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-[#4db8b8] mt-1">•</span>
                      <span className="text-gray-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Format Section */}
          {event.format && (
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">
                <h2 className="text-2xl text-[#4db8b8]">
                  {t('eventPage.format')}
                </h2>
                <p className="text-gray-700">{getLocalized(event.format, locale as 'ru' | 'en')}</p>
              </div>
            </section>
          )}

          {/* Key Questions Section */}
          {event.questions && event.questions.length > 0 && (
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">
                <h2 className="text-2xl text-[#4db8b8]">
                  {t('eventPage.keyQuestions')}
                </h2>
                <ul className="space-y-3">
                  {event.questions.map((question, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-[#4db8b8] mt-1">•</span>
                      <span className="text-gray-700">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Moderators Section */}
          {event.moderators && event.moderators.length > 0 && (
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">
                <h2 className="text-2xl text-[#4db8b8]">
                  {t('eventPage.moderators')}
                </h2>
                <div className="space-y-6">
                  {event.moderators.map((moderator, idx) => (
                    <div key={idx}>
                      <h3 className="mb-2 text-gray-900">{moderator.name}</h3>
                      <p className="text-sm text-gray-600">{moderator.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Experts Section */}
          {event.experts && event.experts.length > 0 && (
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">
                <h2 className="text-2xl text-[#4db8b8]">
                  {t('eventPage.sessionExperts')}
                </h2>
                <div className="space-y-6">
                  {event.experts.map((expert, idx) => (
                    <div key={idx}>
                      <h3 className="mb-2 text-gray-900">{expert.name}</h3>
                      <p className="text-sm text-gray-600">{expert.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Speakers Section */}
          {event.speakers && event.speakers.length > 0 && (
            <section className="mb-8 sm:mb-12">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 text-[#4db8b8]">
                {t('eventPage.speakers')}
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {event.speakers.map((speaker, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3 sm:gap-6 items-start"
                  >
                    {speaker.country && (
                      <div className="text-xs sm:text-sm font-medium text-[#4db8b8]">
                        {speaker.country}
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2 text-[#1a1f4d]">{speaker.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{speaker.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}


          {/* Schedule Section */}
          {event.schedule && event.schedule.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl mb-8 text-[#4db8b8] text-center">
                {t('eventPage.schedule') || 'Schedule'}
              </h2>
              <div className="space-y-8">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                      <div className="text-lg text-[#1a1f4d]">
                        {item.time}
                      </div>
                      <div>
                        <h3 className="text-lg mb-4 text-[#1a1f4d]">{item.title}</h3>
                        {item.speakers && (
                          <ul className="space-y-3">
                            {item.speakers.map((speaker, speakerIdx) => (
                              <li key={speakerIdx} className="flex gap-3">
                                <span className="text-[#4db8b8] mt-1">•</span>
                                <span className="text-sm text-gray-700">
                                  <strong className="text-[#1a1f4d]">{speaker.name}</strong>, {speaker.description}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}