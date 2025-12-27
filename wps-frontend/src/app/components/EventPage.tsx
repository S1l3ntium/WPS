import { Header } from './Header';
import { Footer } from './Footer';
import { Calendar, Clock, MapPin, ArrowLeft, X, Plus } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from '../../i18n/useTranslation';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';

export function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useLocaleNavigate();
  const { t } = useTranslation();
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(0);

  // Mock data - в реальном приложении данные загружались бы по eventId
  const event = {
    type: 'СТРАТЕГИЧЕСКАЯ СЕССИЯ',
    title: '«Будущее дипломатии: роль молодежи и социальная ответственность»',
    date: '20 сентября 2025',
    time: '10:00 - 13:00',
    location: 'Зеленая звезда университет при Правительстве РФ, Институт развития международных компетенций и межкультурной коммуникации',
    venue: 'Российская дипломатическая академия',
    description: 'Современная международная дипломатия столкнулась является ключевым роль в том традиционными этики молодым. Молодые лидеры играют инновационных методов, создают международную прочно в мышлению думанах между странами.',
    additionalInfo: 'На сессии рассмотрим обсудят, какая компетенции профессиональных дипломатов бизнеса, как меняется роль, общественных активистов и межкультурных конфликтах, и также какие взрывы дипломатии дипломатии могут стать лидеров эффективными в способности разминали.',
    goals: [
      'определить, какие навыки и компетенции необходимы молодым дипломатам;',
      'рассмотреть возможные новых молодежных дипломатических проектов;',
      'создать платформу международные инициативы, основанные на сотрудничестве молодых лидеров.'
    ],
    format: 'SWOT-анализ — выявление сильных и слабых сторон молодежных подходе и их организаций, разработка проектных инициатив в мозак группах, презентация результатов.',
    questions: [
      'Как молодежные дипломатия может влиять на международный диалог?',
      'Какие современным инструменты и форматы делают её эффективной?',
      'Как обеспечить устойчивость молодежных межкультурных проектов?'
    ],
    moderators: [
      {
        name: 'Дарья Савринская',
        description: 'ответственным Координирующего совета Молодежной Ассамблеи Народов Мира, аналитик Фонда Горчакова'
      },
      {
        name: 'Джон Атгрей',
        description: 'основатель и Генеральный директор центра Туризма и связей Гаки'
      }
    ],
    experts: [
      {
        name: 'Сафина Лутфулхак Захро',
        description: 'президент Индонезийского общества исламской экономики Российской Выдачилесь, глава БРИКС - Индонезия'
      },
      {
        name: 'Тягу Имануила',
        description: 'председатель Национального комитета молодого Индонезии (KNPI) в Российской Федерации'
      },
      {
        name: 'Марина Рыбинцева',
        description: 'глобальный посол Всемирного фестивали молодежи Марокко, советник Комитета по вопросам международного сотрудничества'
      },
      {
        name: 'Хималашии Суван',
        description: 'представитель Посольства непало-Лудкои Индия'
      },
      {
        name: 'Эмин Музефи Лубиени Тчибова',
        description: 'основатель, мультикультуральное соз организация «Союз молодежи во Бурунди» (ЦАА-НСО)'
      },
      {
        name: 'Чун Цвеи',
        description: 'председатель Союза китайской участников в России'
      },
      {
        name: 'Лэй Чауи',
        description: 'кандидат Программе Всероссийского Союза китайских учащихся'
      }
    ],
    speakers: [
      {
        name: 'Анатолий Кошкин',
        country: 'Россия',
        description: 'Д.и.н., профессор Института стран Востока, академик РАЕН, эксперт РАН, член исполнительного совета Российской ассоциации историков Второй мировой войны'
      },
      {
        name: 'Виталий Азаров',
        country: 'Россия',
        description: 'Председатель Общероссийской общественной организации ветеранов «Российский союз ветеранов», генерал-полковник'
      },
      {
        name: 'Николас Руни',
        country: 'Великобритания',
        description: 'Режиссер, документалист, бывший дипломат'
      }
    ],
    discussionTopics: [
      {
        title: 'Презентация успешных кейсов',
        content: 'Социально ответственные бизнес-проекты с международным участием: лучшие практики и извлечённые уроки'
      },
      {
        title: 'Формирование партнёрской экосистемы',
        content: ''
      },
      {
        title: 'Инвестиции в инновации и технологии',
        content: ''
      },
      {
        title: 'Государственно-частное партнёрство',
        content: ''
      },
      {
        title: 'Участие малого и среднего бизнеса',
        content: ''
      }
    ],
    schedule: [
      {
        time: '14:10 – 14:15',
        title: 'Вступительное слово модератора'
      },
      {
        time: '14:15 – 15:15',
        title: 'Выступления спикеров',
        speakers: [
          {
            name: 'Светозар Дарнев',
            description: 'председатель строительно-финансового объединения «Основа» (Россия)'
          },
          {
            name: 'Иман Закриева',
            description: 'менеджер по работе с государственными органами ООО «МОТОРИКА» (Россия)'
          },
          {
            name: 'Дмитрий Елатанцев',
            description: 'Совет по международной экономической деятельности Ассамблеи Народов Мира, Сооснователь международного альянса производителей кофе ООО «ВЕРТ АЛЬЯНС» (Россия)'
          },
          {
            name: 'Денис Леонов',
            description: 'генеральный директор ООО «КрымСоцИнвест» (Россия)'
          },
          {
            name: 'Ланчо Тан',
            description: 'генеральный директор энергетической компании LANXIN, (Киай)'
          },
          {
            name: 'Идрисса Уэдраого',
            description: 'руководитель IOEC Business Consulting (Буркина-Фасо)'
          },
          {
            name: 'Валентина Ростовщикова',
            description: 'председатель правления, Группа компаний «Fashion Hub Russia», член генерального совета, Международная ассоциация байеров International Buyers Hub (Россия)'
          },
          {
            name: 'Ирина Джанни',
            description: 'управляющий директор и владелец Progress IV Management Gmbh (Австрия)'
          }
        ]
      }
    ],
    presenters: [
      {
        name: 'Халевинский Игорь Васильевич',
        country: 'Россия',
        description: 'Председатель Совета Ассоциации Российских дипломатов',
        quotes: [
          '«Когда дипломаты работают в какой либо стране - главным источником информации являются местные газеты,журналы и очень многое зависит от того как журналисты передают информацию о различных событиях».',
          '«Реалистичная оценка мира зависит от объективного анализа, которые представляют журналисты».',
          '«Читатель должен сам выбирать что читать,что перенаправлять каким-то своим друзьям или знакомым».'
        ]
      },
      {
        name: 'Далбир Сингх',
        country: 'Индия',
        description: 'Национальный секретарь Индийского Национального Конгресса, сопредседатель Генерального совета Ассамблеи народов Евразии',
        quotes: [
          '«Для того чтобы мир был «одной большой семьей» нужно развитие осознанного единства людей и сообществ».'
        ]
      }
    ]
  };

  const [isExpanded, setIsExpanded] = useState(false);

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
            {event.title}
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
              <span>{event.location}</span>
            </div>
          </div>

          {/* Venue */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs sm:text-sm mb-1 sm:mb-2 text-gray-600 font-semibold">
              {t('eventPage.venue')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-900">{event.venue}</p>
          </div>

          {/* Description */}
          <div className="mb-8 sm:mb-12 space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-700">
            <p>{event.description}</p>
            <p>{event.additionalInfo}</p>
          </div>

          {/* Goals Section */}
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

          {/* Format Section */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">
              <h2 className="text-2xl text-[#4db8b8]">
                {t('eventPage.format')}
              </h2>
              <p className="text-gray-700">{event.format}</p>
            </div>
          </section>

          {/* Key Questions Section */}
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

          {/* Moderators Section */}
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

          {/* Experts Section */}
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

          {/* Speakers Section */}
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
                  <div className="text-xs sm:text-sm font-medium text-[#4db8b8]">
                    {speaker.country}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2 text-[#1a1f4d]">{speaker.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{speaker.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Discussion Topics Section */}
          <section className="mb-8 sm:mb-12">
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <div className="flex flex-col md:flex-row gap-0">
                {/* Left side - Title */}
                <div className="flex-shrink-0 w-full md:w-[300px] bg-white md:border-r border-b md:border-b-0 border-gray-200 p-4 sm:p-6 md:p-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#4db8b8] leading-tight">
                    {t('eventPage.discussionTopics')}
                  </h2>
                </div>

                {/* Right side - Accordions */}
                <div className="flex-1 bg-white p-4 sm:p-6 md:p-8">
                  <div className="space-y-0">
                    {event.discussionTopics.map((topic, idx) => (
                      <div key={idx} className="border-b border-gray-200">
                        <button
                          onClick={() => setOpenQuestionIndex(openQuestionIndex === idx ? null : idx)}
                          className="w-full flex items-center justify-between py-3 sm:py-4 md:py-5 px-1 hover:opacity-70 transition-opacity"
                        >
                          <span className="text-xs sm:text-sm md:text-base font-medium text-[#1a1f4d] text-left">{topic.title}</span>
                          {openQuestionIndex === idx ? (
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#4db8b8] flex-shrink-0" />
                          ) : (
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#4db8b8] flex-shrink-0" />
                          )}
                        </button>
                        {openQuestionIndex === idx && topic.content && (
                          <div className="pb-4 sm:pb-6">
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                              {topic.content}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Schedule and Speakers Section */}
          <section className="mb-12">
            <h2 className="text-2xl mb-8 text-[#4db8b8] text-center">
              {t('eventPage.scheduleAndSpeakers')}
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

          {/* Presenters Section */}
          <section className="mb-12">
            <h2 className="text-2xl mb-8 text-[#4db8b8]">
              {t('eventPage.presenters')}
            </h2>
            <div className="space-y-8">
              {event.presenters.map((presenter, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <div className="text-sm text-[#4db8b8] mb-4">
                    {presenter.country}
                  </div>
                  <h3 className="text-lg mb-2 text-[#1a1f4d]">{presenter.name}</h3>
                  <p className="text-sm text-gray-600 mb-6">{presenter.description}</p>
                  <div className="space-y-6">
                    {presenter.quotes.map((quote, quoteIdx) => (
                      <div 
                        key={quoteIdx} 
                        className="border-l-4 border-[#4db8b8] pl-4 text-sm text-gray-700"
                      >
                        {quote}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}