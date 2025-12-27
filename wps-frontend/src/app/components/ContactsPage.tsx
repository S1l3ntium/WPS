import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { useTranslation } from '../../i18n/useTranslation';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChevronRight, MessageCircle } from 'lucide-react';
const contactIcon = 'placeholder.png';

export function ContactsPage() {
  const navigate = useLocaleNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-dvh bg-gray-50">
      <Header currentPage="home" />

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-[#4db8b8]">{t('contactsPage.home')}</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1a1f4d]">{t('contactsPage.pageTitle')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1f4d] mb-6 sm:mb-8">{t('contactsPage.pageTitle')}</h1>

          {/* Partnership Contact Section */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1f4d] mb-6 sm:mb-8">{t('contactsPage.partnershipContact')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
              {/* Contact Person 1 */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <img src={contactIcon} alt="WhatsApp" className="w-10 sm:w-12 h-10 sm:h-12" />
                </div>
                <div>
                  <a href="tel:+79096690055" className="text-[#1a1f4d] text-base sm:text-lg md:text-xl mb-1 sm:mb-2 hover:text-[#4db8b8] transition-colors block font-semibold">
                    {t('contactsPage.contact1Phone')}
                  </a>
                  <p className="text-xs sm:text-sm text-gray-600">{t('contactsPage.contact1Name')}</p>
                </div>
              </div>

              {/* Contact Person 2 */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <img src={contactIcon} alt="WhatsApp" className="w-10 sm:w-12 h-10 sm:h-12" />
                </div>
                <div>
                  <a href="tel:+79857113041" className="text-[#1a1f4d] text-base sm:text-lg md:text-xl mb-1 sm:mb-2 hover:text-[#4db8b8] transition-colors block font-semibold">
                    {t('contactsPage.contact2Phone')}
                  </a>
                  <p className="text-xs sm:text-sm text-gray-600">{t('contactsPage.contact2Name')}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 my-8 sm:my-10 md:my-12"></div>

            {/* General Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              {/* Address */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#1a1f4d] mb-1 sm:mb-2">{t('contactsPage.address')}</h3>
                <p className="text-sm sm:text-base text-gray-700">{t('contactsPage.addressValue')}</p>
              </div>

              {/* Phone */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#1a1f4d] mb-1 sm:mb-2">{t('contactsPage.phone')}</h3>
                <a href="tel:+74951976779" className="text-sm sm:text-base text-gray-700 hover:text-[#4db8b8] transition-colors">
                  {t('contactsPage.phoneValue')}
                </a>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#1a1f4d] mb-1 sm:mb-2">{t('contactsPage.email')}</h3>
                <a href="mailto:summit@eurasia-assembly.org" className="text-sm sm:text-base text-gray-700 hover:text-[#4db8b8] transition-colors">
                  {t('contactsPage.emailValue')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
