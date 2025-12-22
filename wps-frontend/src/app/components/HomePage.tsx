import { Search } from 'lucide-react';
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { useTranslation } from '../../i18n/useTranslation';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Slider from 'react-slick';

const mainImage = 'placeholder.png';

export function HomePage() {
  const navigate = useLocaleNavigate();
  const { t } = useTranslation();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
  };

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header currentPage="home" />

      <main className="flex-1">
        {/* Hero section with carousel */}
        <section className="relative h-screen">
          <Slider {...sliderSettings} className="h-full">
            {/* Slide 1 */}
            <div className="h-screen relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f4d] to-[#2c3570]">
                <div className="absolute inset-0 opacity-10"
                     style={{
                       backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                     }}
                />
              </div>
              
              {/* Date info in top left */}
              <div className="absolute top-8 left-8 text-white z-10">
                <div className="text-sm opacity-90">{t('homePage.eventDate')}</div>
                <div className="text-sm opacity-90">{t('homePage.eventVenue')}</div>
                <div className="text-sm opacity-90">{t('homePage.eventLocation')}</div>
              </div>
              
              <div className="relative h-full flex flex-col items-center justify-center text-white z-10 px-8">
                <div className="text-center max-w-4xl">
                  <h1 className="text-5xl mb-4">{t('homePage.mainTitle')}</h1>
                  <h2 className="text-4xl mb-4">
                    {t('homePage.mainSubtitle')} <span className="text-[#4db8b8]">{t('homePage.mainSubtitleHighlight')}</span> {t('homePage.mainSubtitleEnd')}
                  </h2>
                  <p className="text-xl mb-12 opacity-90">
                    {t('homePage.mainDescription')}
                  </p>

                  <div className="flex gap-4 justify-center flex-wrap">
                    <button className="bg-[#4db8b8] hover:bg-[#3da8a8] text-white px-8 py-4 rounded transition-colors">
                      {t('homePage.watchStream')}
                    </button>
                    <button className="bg-[#1a1f4d] hover:bg-[#0f1333] text-white px-8 py-4 rounded transition-colors border border-white/20">
                      {t('homePage.becomePartner')}
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-[#1a1f4d] px-8 py-4 rounded transition-colors">
                      {t('homePage.downloadApp')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="h-screen relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2c3570] to-[#1a1f4d]">
                <div className="absolute inset-0 opacity-10"
                     style={{
                       backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                     }}
                />
              </div>
              
              <div className="absolute top-8 left-8 text-white z-10">
                <div className="text-sm opacity-90">{t('homePage.eventDate')}</div>
                <div className="text-sm opacity-90">{t('homePage.eventVenue')}</div>
                <div className="text-sm opacity-90">{t('homePage.eventLocation')}</div>
              </div>
              
              <div className="relative h-full flex flex-col items-center justify-center text-white z-10 px-8">
                <div className="text-center max-w-4xl">
                  <h1 className="text-5xl mb-4">{t('homePage.mainTitle')}</h1>
                  <h2 className="text-4xl mb-4">
                    {t('homePage.mainSubtitle')} <span className="text-[#4db8b8]">{t('homePage.mainSubtitleHighlight')}</span> {t('homePage.mainSubtitleEnd')}
                  </h2>
                  <p className="text-xl mb-12 opacity-90">
                    {t('homePage.mainDescription')}
                  </p>

                  <div className="flex gap-4 justify-center flex-wrap">
                    <button className="bg-[#4db8b8] hover:bg-[#3da8a8] text-white px-8 py-4 rounded transition-colors">
                      {t('homePage.watchStream')}
                    </button>
                    <button className="bg-[#1a1f4d] hover:bg-[#0f1333] text-white px-8 py-4 rounded transition-colors border border-white/20">
                      {t('homePage.becomePartner')}
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-[#1a1f4d] px-8 py-4 rounded transition-colors">
                      {t('homePage.downloadApp')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="h-screen relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#1a1f4d] via-[#2c3570] to-[#1a1f4d]">
                <div className="absolute inset-0 opacity-10"
                     style={{
                       backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                     }}
                />
              </div>
              
              <div className="absolute top-8 left-8 text-white z-10">
                <div className="text-sm opacity-90">{t('homePage.eventDate')}</div>
                <div className="text-sm opacity-90">{t('homePage.eventVenue')}</div>
                <div className="text-sm opacity-90">{t('homePage.eventLocation')}</div>
              </div>
              
              <div className="relative h-full flex flex-col items-center justify-center text-white z-10 px-8">
                <div className="text-center max-w-4xl">
                  <h1 className="text-5xl mb-4">{t('homePage.mainTitle')}</h1>
                  <h2 className="text-4xl mb-4">
                    {t('homePage.mainSubtitle')} <span className="text-[#4db8b8]">{t('homePage.mainSubtitleHighlight')}</span> {t('homePage.mainSubtitleEnd')}
                  </h2>
                  <p className="text-xl mb-12 opacity-90">
                    {t('homePage.mainDescription')}
                  </p>

                  <div className="flex gap-4 justify-center flex-wrap">
                    <button className="bg-[#4db8b8] hover:bg-[#3da8a8] text-white px-8 py-4 rounded transition-colors">
                      {t('homePage.watchStream')}
                    </button>
                    <button className="bg-[#1a1f4d] hover:bg-[#0f1333] text-white px-8 py-4 rounded transition-colors border border-white/20">
                      {t('homePage.becomePartner')}
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-[#1a1f4d] px-8 py-4 rounded transition-colors">
                      {t('homePage.downloadApp')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </section>

        {/* About/Leader section */}
        <section className="px-8 py-16 max-w-6xl mx-auto">
          <div className="flex gap-12 items-start">
            <div className="flex-shrink-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1553976468-dcd9082bcd28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjA3OTgwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Руководитель"
                className="w-80 h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl text-[#1a1f4d] mb-6">
                {t('homePage.aboutAssemblyTitle')}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                <p>
                  {t('homePage.aboutAssemblyText1')}
                </p>
                <p>
                  {t('homePage.aboutAssemblyText2')}
                </p>
                <p>
                  {t('homePage.aboutAssemblyText3')}
                </p>
              </div>
              <button className="mt-6 bg-[#1a1f4d] hover:bg-[#2c3570] text-white px-6 py-3 rounded transition-colors text-sm">
                {t('homePage.readMore')}
              </button>
            </div>
          </div>
        </section>

        {/* Competencies section */}
        <section className="px-8 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl text-[#1a1f4d] mb-12">
              {t('homePage.leadershipAndExperts')}
            </h2>
            
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={4000}
              arrows={true}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]}
            >
              {[
                {
                  name: 'Сергей Петрович Иванов',
                  position: 'Председатель Правления',
                  date: '15.12.2025',
                  image: 'https://images.unsplash.com/photo-1601489865452-407a1b801dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbnxlbnwxfHx8fDE3NjYwNTExMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                },
                {
                  name: 'Александр Михайлович Козлов',
                  position: 'Генеральный директор',
                  date: '14.12.2025',
                  image: 'https://images.unsplash.com/photo-1762341120156-4a8303067873?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBleGVjdXRpdmV8ZW58MXx8fHwxNzY2MDMwMjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                },
                {
                  name: 'Дмитрий Андреевич Смирнов',
                  position: 'Научный руководитель',
                  date: '13.12.2025',
                  image: 'https://images.unsplash.com/photo-1553976468-dcd9082bcd28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjA3OTgwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                },
                {
                  name: 'Елена Викторовна Петрова',
                  position: 'Директор по развитию',
                  date: '12.12.2025',
                  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY2MDg1OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                },
                {
                  name: 'Михаил Сергеевич Волков',
                  position: 'Главный эксперт',
                  date: '11.12.2025',
                  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MXx8fHwxNzY2MDg1OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                },
                {
                  name: 'Анна Игоревна Соколова',
                  position: 'Руководитель аналитического центра',
                  date: '10.12.2025',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NjYwODU5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                }
              ].map((person, index) => (
                <div key={index} className="px-4">
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <ImageWithFallback
                      src={person.image}
                      alt={person.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-[#1a1f4d] mb-2">{person.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 leading-relaxed">{person.position}</p>
                      <p className="text-gray-500 text-sm mb-6">{person.date}</p>
                      <button className="w-full px-6 py-3 bg-white text-[#1a1f4d] border-2 border-[#1a1f4d] rounded-lg hover:bg-gray-50 transition-colors">
                        {t('homePage.readMore')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Statistics section */}
        <section className="px-8 py-16 max-w-6xl mx-auto relative">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full"
                 style={{
                   backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%234db8b8\' fill-opacity=\'1\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'30\' cy=\'15\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'20\' r=\'1\'/%3E%3Ccircle cx=\'70\' cy=\'25\' r=\'1\'/%3E%3Ccircle cx=\'90\' cy=\'30\' r=\'1\'/%3E%3Ccircle cx=\'20\' cy=\'40\' r=\'1\'/%3E%3Ccircle cx=\'40\' cy=\'45\' r=\'1\'/%3E%3Ccircle cx=\'60\' cy=\'50\' r=\'1\'/%3E%3Ccircle cx=\'80\' cy=\'55\' r=\'1\'/%3E%3Ccircle cx=\'15\' cy=\'70\' r=\'1\'/%3E%3Ccircle cx=\'35\' cy=\'75\' r=\'1\'/%3E%3Ccircle cx=\'55\' cy=\'80\' r=\'1\'/%3E%3Ccircle cx=\'75\' cy=\'85\' r=\'1\'/%3E%3Ccircle cx=\'95\' cy=\'90\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
                   backgroundSize: '100px 100px',
                   backgroundRepeat: 'repeat'
                 }}
            />
          </div>
          
          <div className="relative z-10">
            {/* Mission statement */}
            <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-[#4db8b8] text-xl">{t('homePage.missionTitle')}</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-[#1a1f4d] text-2xl leading-relaxed">
                  {t('homePage.missionDescription')}
                </p>
              </div>
            </div>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { value: '4500+', label: t('homePage.participantsLabel') },
                { value: '150+', label: t('homePage.countriesLabel') },
                { value: '40+', label: t('homePage.discussionTopicsLabel') },
                { value: '10+', label: t('homePage.directionsLabel') }
              ].map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-6xl text-[#4db8b8] mb-2">{stat.value}</div>
                  <div className="text-[#1a1f4d] text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Directions section */}
        <section className="px-8 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* Left side - Title */}
              <div>
                <h2 className="text-3xl leading-tight">
                  <span className="text-[#4db8b8]">{t('homePage.mainThemes')}</span>
                  <br />
                  <span className="text-[#1a1f4d]">{t('homePage.mainThemesEnd')}</span>
                </h2>
              </div>
              
              {/* Right side - List */}
              <div className="space-y-0">
                {[
                  t('homePage.culture'),
                  t('homePage.education'),
                  t('homePage.sport'),
                  t('homePage.youth'),
                  t('homePage.religiousDialogue'),
                  t('homePage.media'),
                  t('homePage.csr'),
                  t('homePage.tourism')
                ].map((direction, index) => (
                  <div
                    key={index}
                    className="py-6 border-b border-gray-300"
                  >
                    <p className="text-[#1a1f4d] text-lg">{direction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners section */}
        <section className="px-8 py-16 max-w-6xl mx-auto">
          <h2 className="text-3xl text-[#1a1f4d] mb-12">
            {t('homePage.ourPartners')}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors p-4"
              >
                <div className="text-gray-400 text-xs text-center">{t('homePage.partnerLogoText')}</div>
              </div>
            ))}
          </div>
        </section>

        {/* News section */}
        <section className="px-8 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl text-[#1a1f4d] mb-12">
              {t('homePage.newsAndEvents')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzY2MDMyODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  date: '15 декабря 2025',
                  title: 'Международный форум «Диалог культур»',
                  description: 'В Москве прошел крупнейший форум, посвященный межкультурному взаимодействию народов Евразии.'
                },
                {
                  image: 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwbWVldGluZ3xlbnwxfHx8fDE3NjYwODU1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  date: '12 декабря 2025',
                  title: 'Встреча экспертного совета',
                  description: 'Состоялось заседание экспертного совета по вопросам межнациональных отношений.'
                },
                {
                  image: 'https://images.unsplash.com/photo-1639369501176-f40a0641c91f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGZlc3RpdmFsfGVufDF8fHx8MTc2NjAyOTU2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  date: '10 декабря 2025',
                  title: 'Фестиваль национальных культур',
                  description: 'Яркое событие, объединившее представителей более 50 народов России.'
                },
                {
                  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGV2ZW50fGVufDF8fHx8MTc2NjA1MTUxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  date: '8 декабря 2025',
                  title: 'Образовательный семинар',
                  description: 'Проведен семинар для молодых лидеров национально-культурных объединений.'
                }
              ].map((news, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-[#4db8b8] text-xs mb-2">{news.date}</div>
                    <h3 className="text-[#1a1f4d] mb-2">{news.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{news.description}</p>
                    <button className="text-[#4db8b8] hover:text-[#3da8a8] text-sm transition-colors">
                      {t('homePage.readMoreLink')}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="bg-[#1a1f4d] hover:bg-[#2c3570] text-white px-8 py-3 rounded transition-colors text-sm">
                {t('homePage.allNews')}
              </button>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="px-8 py-16 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#1a1f4d] to-[#2c3570] text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl mb-4">
              {t('homePage.joinCommunity')}
            </h2>
            <p className="text-white/90 text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('homePage.joinCommunityDesc')}
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-[#4db8b8] hover:bg-[#3da8a8] text-white px-8 py-3 rounded transition-colors text-sm">
                {t('homePage.becomeMember')}
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded transition-colors text-sm">
                {t('homePage.contactUsLink')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}