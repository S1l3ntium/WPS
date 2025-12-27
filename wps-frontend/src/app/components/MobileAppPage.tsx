import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
const appStoresImage = 'placeholder.png';

export function MobileAppPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage="mobileApp" />

      <main className="flex-1 px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#1a1f4d] mb-6 sm:mb-7 md:mb-8">
              Установите приложение<br />
              Всемирной Общественной Ассамблеи
            </h1>

            {/* App Store Buttons */}
            <div className="mb-10 sm:mb-11 md:mb-12">
              <img
                src={appStoresImage}
                alt="Скачать из App Store, Google Play, RuStore, AppGallery"
                className="mx-auto max-w-full"
              />
            </div>

            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Install the World Public Assembly mobile application
            </p>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-14 md:mb-16">
            <div className="bg-white p-4 sm:p-5 md:p-8 rounded-lg border border-gray-200">
              <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-[#4db8b8] rounded-lg flex items-center justify-center mb-3 sm:mb-3.5 md:mb-4">
                <svg className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg text-[#1a1f4d] mb-2 sm:mb-3">Уведомления о мероприятиях</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Получайте своевременные уведомления о предстоящих событиях, форумах и конференциях
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 md:p-8 rounded-lg border border-gray-200">
              <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-[#4db8b8] rounded-lg flex items-center justify-center mb-3 sm:mb-3.5 md:mb-4">
                <svg className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg text-[#1a1f4d] mb-2 sm:mb-3">Доступ к документам</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Просматривайте программу, резолюции и другие важные документы прямо в приложении
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 md:p-8 rounded-lg border border-gray-200">
              <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-[#4db8b8] rounded-lg flex items-center justify-center mb-3 sm:mb-3.5 md:mb-4">
                <svg className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg text-[#1a1f4d] mb-2 sm:mb-3">Нетворкинг</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Находите участников и экспертов, обменивайтесь контактами и расширяйте деловые связи
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 md:p-8 rounded-lg border border-gray-200">
              <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-[#4db8b8] rounded-lg flex items-center justify-center mb-3 sm:mb-3.5 md:mb-4">
                <svg className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg text-[#1a1f4d] mb-2 sm:mb-3">Личное расписание</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Создавайте персональное расписание мероприятий и получайте напоминания
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#1a1f4d] to-[#2c3570] text-white rounded-lg p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">Присоединяйтесь к мировому сообществу</h2>
            <p className="text-xs sm:text-sm md:text-base mb-6 sm:mb-7 md:mb-8 opacity-90">
              Станьте частью глобального диалога и сотрудничества
            </p>
            <button
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-[#4db8b8] to-[#7dd957] hover:opacity-90 text-white rounded-lg transition-opacity text-xs sm:text-sm md:text-base"
              onClick={() => navigate('/participants')}
            >
              Зарегистрироваться на Ассамблею
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
