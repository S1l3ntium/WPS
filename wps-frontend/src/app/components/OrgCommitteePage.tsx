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
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-[#1a1f4d] mb-12">
            {t('orgCommitteePage.pageTitle')}
          </h1>

          <div className="space-y-6">
            {committeeMembers.map((member, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 hover:bg-gray-50 transition-colors px-6 py-4 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-2">
                    <span className="text-[#4db8b8]">
                      {member.country}
                    </span>
                  </div>
                  <div className="md:col-span-10">
                    <h3 className="text-[#1a1f4d] mb-2">
                      {t(member.nameKey)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
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
