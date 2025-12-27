import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTranslation } from '../../i18n/useTranslation';

export function OrgCommitteePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const committeeMembers = [
    {
      country: t('orgCommitteePage.member1Country'),
      nameKey: 'orgCommitteePage.member1Name',
      positionKey: 'orgCommitteePage.member1Position'
    },
    {
      country: t('orgCommitteePage.member2Country'),
      nameKey: 'orgCommitteePage.member2Name',
      positionKey: 'orgCommitteePage.member2Position'
    },
    {
      country: t('orgCommitteePage.member3Country'),
      nameKey: 'orgCommitteePage.member3Name',
      positionKey: 'orgCommitteePage.member3Position'
    },
    {
      country: t('orgCommitteePage.member4Country'),
      nameKey: 'orgCommitteePage.member4Name',
      positionKey: 'orgCommitteePage.member4Position'
    },
    {
      country: t('orgCommitteePage.member5Country'),
      nameKey: 'orgCommitteePage.member5Name',
      positionKey: 'orgCommitteePage.member5Position'
    },
    {
      country: t('orgCommitteePage.member6Country'),
      nameKey: 'orgCommitteePage.member6Name',
      positionKey: 'orgCommitteePage.member6Position'
    },
    {
      country: t('orgCommitteePage.member7Country'),
      nameKey: 'orgCommitteePage.member7Name',
      positionKey: 'orgCommitteePage.member7Position'
    },
    {
      country: t('orgCommitteePage.member8Country'),
      nameKey: 'orgCommitteePage.member8Name',
      positionKey: 'orgCommitteePage.member8Position'
    },
    {
      country: t('orgCommitteePage.member9Country'),
      nameKey: 'orgCommitteePage.member9Name',
      positionKey: 'orgCommitteePage.member9Position'
    },
    {
      country: t('orgCommitteePage.member10Country'),
      nameKey: 'orgCommitteePage.member10Name',
      positionKey: 'orgCommitteePage.member10Position'
    },
    {
      country: t('orgCommitteePage.member11Country'),
      nameKey: 'orgCommitteePage.member11Name',
      positionKey: 'orgCommitteePage.member11Position'
    },
    {
      country: t('orgCommitteePage.member12Country'),
      nameKey: 'orgCommitteePage.member12Name',
      positionKey: 'orgCommitteePage.member12Position'
    },
    {
      country: t('orgCommitteePage.member13Country'),
      nameKey: 'orgCommitteePage.member13Name',
      positionKey: 'orgCommitteePage.member13Position'
    },
    {
      country: t('orgCommitteePage.member14Country'),
      nameKey: 'orgCommitteePage.member14Name',
      positionKey: 'orgCommitteePage.member14Position'
    },
    {
      country: t('orgCommitteePage.member15Country'),
      nameKey: 'orgCommitteePage.member15Name',
      positionKey: 'orgCommitteePage.member15Position'
    },
    {
      country: t('orgCommitteePage.member16Country'),
      nameKey: 'orgCommitteePage.member16Name',
      positionKey: 'orgCommitteePage.member16Position'
    }
  ];
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentPage="org-committee" />
      
      <main className="flex-1 px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#1a1f4d] mb-8 sm:mb-10 md:mb-12">
            {t('orgCommitteePage.pageTitle')}
          </h1>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {committeeMembers.map((member, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-4 sm:pb-5 md:pb-6 hover:bg-gray-50 transition-colors px-3 sm:px-4 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] md:grid-cols-12 gap-3 sm:gap-4">
                  <div className="sm:col-span-1 md:col-span-2">
                    <span className="text-xs sm:text-sm text-[#4db8b8] font-medium">
                      {member.country}
                    </span>
                  </div>
                  <div className="sm:col-span-1 md:col-span-10">
                    <h3 className="text-base sm:text-lg text-[#1a1f4d] mb-1 sm:mb-1.5">
                      {t(member.nameKey)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      {t(member.positionKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
