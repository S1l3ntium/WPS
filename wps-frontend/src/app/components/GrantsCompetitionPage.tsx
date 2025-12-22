import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Header } from './Header';

export function GrantsCompetitionPage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: 'Кто может участвовать в конкурсе?',
      answer: 'К участию приглашаются некоммерческие организации, реализующие проекты в сфере международного гуманитарного сотрудничества, общественной дипломатии и развития партнёрства между гражданскими институтами разных стран.'
    },
    {
      question: 'Обязательно ли наличие международного партнёрства?',
      answer: 'Да, одним из обязательных условий является наличие партнёрских связей организации между странами (не менее двух стран).'
    },
    {
      question: 'В каком виде проект должен быть реализован?',
      answer: 'Проект должен быть направлен на стимулирование международного гуманитарного сотрудничества и продвижение ценностей общественной дипломатии среди широких слоев населения.'
    },
    {
      question: 'Какова максимальная сумма запрашиваемого гранта?',
      answer: 'Информация о максимальной сумме гранта указана в Положении о конкурсе, которое можно скачать на этой странице.'
    }
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header currentPage="grants-competition" />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-[#4db8b8] transition-colors">
            Главная
          </button>
          <span>/</span>
          <span className="text-[#4db8b8]">Гранты и конкурсы</span>
        </div>
      </div>

      {/* Hero Section with Logo and Info */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-12 items-start">
            {/* Competition Logo */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Outer circle border */}
                  <circle cx="100" cy="100" r="95" fill="none" stroke="#1a1f4d" strokeWidth="3"/>
                  
                  {/* Blue left part */}
                  <path d="M 100 100 L 100 10 A 90 90 0 0 1 100 190 Z" fill="#1a1f4d"/>
                  
                  {/* Orange right part */}
                  <path d="M 100 100 L 100 10 A 90 90 0 0 0 100 190 Z" fill="#e8a54d"/>
                  
                  {/* Green circle */}
                  <circle cx="85" cy="100" r="22" fill="#5ba55f"/>
                  
                  {/* White circle with border */}
                  <circle cx="115" cy="100" r="22" fill="white" stroke="#4db8b8" strokeWidth="2"/>
                  <circle cx="115" cy="100" r="10" fill="#4db8b8"/>
                </svg>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-2">Грантовый конкурс «Ассамблеи Народов Мира»</div>
              <h1 className="text-5xl mb-6 text-[#4db8b8]">«ДОВЕРИЕ И ЕДИНСТВО»</h1>
              <p className="text-gray-700 text-lg max-w-3xl">
                Международный конкурс на поддержку проектов в сфере общественной дипломатии и гуманитарного сотрудничества
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Timeline Item 1 */}
            <div className="border-t-4 border-[#1a1f4d] pt-6">
              <h3 className="text-2xl text-[#1a1f4d] mb-4">01.07. — 30.07.2025 г.</h3>
              <p className="text-gray-700">Сроки подачи заявок</p>
            </div>

            {/* Timeline Item 2 */}
            <div className="border-t-4 border-[#4db8b8] pt-6">
              <h3 className="text-2xl text-[#1a1f4d] mb-4">20.09.2025 г.</h3>
              <p className="text-gray-700">Вручение грантов в рамках Всемирной Общественной Ассамблеи</p>
            </div>

            {/* Timeline Item 3 */}
            <div className="border-t-4 border-[#1a1f4d] pt-6">
              <h3 className="text-2xl text-[#1a1f4d] mb-4">01.01. — 30.06.2026 г.</h3>
              <p className="text-gray-700">Сроки реализация проектов победителей</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Participate Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-[300px_1fr] gap-12">
            <h2 className="text-3xl text-[#4db8b8]">Кто может участвовать</h2>
            <div>
              <p className="text-gray-700 mb-6">
                К участию приглашаются некоммерческие организации, реализующие проекты в сфере:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">международного гуманитарного сотрудничества</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">общественной дипломатии</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#4db8b8] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">развития партнерства между гражданскими институтами разных стран</span>
                </li>
              </ul>

              {/* Условие subsection */}
              <div className="border-t-4 border-[#4db8b8] pt-6">
                <h3 className="text-xl text-[#1a1f4d] mb-3">Условие</h3>
                <p className="text-gray-700">
                  Наличие партнерства между организациями, представляющими разные страны (не менее двух стран)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Goal Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-[300px_1fr] gap-12">
            <h2 className="text-3xl text-[#4db8b8]">Цель конкурса</h2>
            <div className="text-gray-700">
              <p className="mb-4">
                Стимулирование международного гуманитарного сотрудничества и продвижение ценностей общественной дипломатии среди широких слоев населения, а также выявление и поддержка лучших практик и инициатив, способствующих укреплению доверия и партнёрства между народами
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Directions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-[300px_1fr] gap-12">
            <h2 className="text-3xl text-[#4db8b8]">Направления поддержки</h2>
            <div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    Поддержка общественных межгосударственных инициатив, например, международные диалоговые площадки, форумы, а также обмен опытом и лучшими практиками
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    Развитие и укрепление международной общественной дипломатии на всех уровнях: международном, региональном, локальном
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    Содействие деятельности культурологической направленности
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    Взаимодействие и поддержка в мультикультуральной сфере
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl text-[#4db8b8] mb-8">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <ChevronRight
                    className={`w-5 h-5 text-[#4db8b8] flex-shrink-0 mt-1 ${
                      openFaqIndex === index ? 'rotate-90' : ''
                    }`}
                  />
                  <span className="text-gray-700 ml-3">{item.question}</span>
                </div>
                {openFaqIndex === index && (
                  <p className="text-gray-600 mt-3">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Button Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <button className="bg-[#1a1f4d] text-white px-12 py-4 rounded hover:bg-[#2a3f6d] transition-colors text-lg">
            Положение о конкурсе
          </button>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl text-[#4db8b8] text-center mb-6">По всем вопросам проекта</h2>
          <p className="text-center text-gray-700">
            <a href="mailto:worldcivilassembly@gmail.com" className="text-[#4db8b8] hover:underline">
              worldcivilassembly@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}