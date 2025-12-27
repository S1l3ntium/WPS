import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTranslation } from '../../i18n/useTranslation';

export function OrganizersPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentPage="organizers" />
      
      <main className="flex-1 px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#1a1f4d] mb-8 sm:mb-10 md:mb-12">
            {t('organizersPage.pageTitle')}
          </h1>

          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 border border-gray-200 mb-8 sm:mb-10 md:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Logo */}
              <div className="lg:col-span-3 flex justify-center lg:justify-start">
                <img
                  src="placeholder.png"
                  alt="Ассамблея Народов Мира"
                  className="w-48 h-auto"
                />
              </div>

              {/* Content */}
              <div className="lg:col-span-9">
                <h2 className="text-xl sm:text-2xl md:text-3xl text-[#1a1f4d] mb-4 sm:mb-5 md:mb-6">
                  {t('organizersPage.assemblyTitle')}
                </h2>

                <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                  <p>
                    {t('organizersPage.assemblyDescription1')}
                  </p>

                  <p>
                    {t('organizersPage.assemblyDescription2')}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4 w-full sm:w-auto sm:max-w-sm">
                  <button
                    className="w-full px-4 sm:px-6 md:px-8 py-3 bg-[#1a1f4d] text-white rounded-lg hover:bg-[#252b5e] transition-colors"
                    onClick={() => window.open('https://worldpeoplesassembly.org/join', '_blank')}
                  >
                    {t('organizersPage.joinButton')}
                  </button>
                  <button
                    className="w-full px-4 sm:px-6 md:px-8 py-3 bg-white text-[#1a1f4d] border-2 border-[#1a1f4d] rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => window.open('https://worldpeoplesassembly.org', '_blank')}
                  >
                    {t('organizersPage.websiteButton')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Greetings Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Greeting Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src="placeholder.png"
                alt={t('organizersPage.greetingPerson')}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl text-[#1a1f4d] mb-2 sm:mb-3">
                  {t('organizersPage.greetingPerson')}
                </h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {t('organizersPage.greetingText')}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {t('organizersPage.greetingDate')}
                </p>
                <button onClick={() => window.open('https://worldpeoplesassembly.org/greeting', '_blank')} className="w-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#1a1f4d] text-white rounded-lg hover:bg-[#252b5e] transition-colors text-sm sm:text-base">
                  {t('organizersPage.readButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}