import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Slider from 'react-slick'
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate'
import { useSEO } from '../../hooks/useSEO'
import { useTranslation } from '../../i18n/useTranslation'
import { getLocalized, newsAPI } from '../../services/api'
import {
	generateEventSchema,
	generateOrganizationSchema,
	getBaseUrl,
} from '../../utils/seo'
import { Footer } from './Footer'
import { Header } from './Header'
import { ImageWithFallback } from './figma/ImageWithFallback'

const mainImage = 'placeholder.png'

interface NewsItem {
	id: number
	image: string
	date: string
	title: string
	description: string
}

export function HomePage() {
	const navigate = useLocaleNavigate()
	const { t, locale } = useTranslation()
	const [newsItems, setNewsItems] = useState<NewsItem[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadNews = async () => {
			try {
				setLoading(true)
				const response = await newsAPI.getAll()

				const transformedNews: NewsItem[] = response.data
					.slice(0, 4)
					.map((item: any) => ({
						id: item.id,
						image: item.image,
						date: item.date,
						title: getLocalized(item.title, locale as 'ru' | 'en'),
						description: getLocalized(item.excerpt, locale as 'ru' | 'en'),
					}))

				setNewsItems(transformedNews)
			} catch (err) {
				console.error('Failed to fetch news:', err)
				setNewsItems([])
			} finally {
				setLoading(false)
			}
		}

		loadNews()
	}, [locale])

	// SEO Configuration
	const seoConfig = {
		title:
			locale === 'ru'
				? 'Всемирное публичное собрание - Международный форум'
				: 'World Public Assembly - International Forum',
		description:
			locale === 'ru'
				? 'Всемирное публичное собрание - площадка для диалога лидеров, экспертов и общественных деятелей из более чем 150 стран. Обсуждение актуальных вызовов развития мира.'
				: 'World Public Assembly - a platform for dialogue between leaders, experts and public figures from over 150 countries. Discussion of global development challenges.',
		keywords:
			locale === 'ru'
				? [
						'всемирное собрание',
						'международный форум',
						'диалог культур',
						'публичная дипломатия',
						'мировая политика',
				  ]
				: [
						'world assembly',
						'international forum',
						'dialogue of cultures',
						'public diplomacy',
						'world politics',
				  ],
		image:
			'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200',
		ogType: 'website' as const,
	}

	useSEO(seoConfig)

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
	}

	// Event schema data
	const baseUrl = getBaseUrl()
	const eventData = {
		name:
			locale === 'ru'
				? 'Всемирное публичное собрание'
				: 'World Public Assembly',
		description: seoConfig.description,
		startDate: '2025-12-15T09:00:00Z',
		endDate: '2025-12-17T18:00:00Z',
		location: locale === 'ru' ? 'Москва, Россия' : 'Moscow, Russia',
		image: seoConfig.image,
		url: `${baseUrl}/${locale}/`,
	}

	const organizationData = {
		name: 'World Public Assembly',
		description: seoConfig.description,
		url: baseUrl,
		logo: `${baseUrl}/logo.svg`,
		contactPoint: {
			type: 'ContactPoint',
			telephone: '+7-800-XXX-XXXX',
			contactType: 'Customer Service',
		},
	}

	return (
		<div className='flex flex-col min-h-dvh bg-white'>
			<Helmet>
				<script type='application/ld+json'>
					{JSON.stringify(generateEventSchema(eventData))}
				</script>
				<script type='application/ld+json'>
					{JSON.stringify(generateOrganizationSchema(organizationData))}
				</script>
			</Helmet>
			<Header currentPage='home' />

			<main className='flex-1'>
				{/* Hero section with carousel */}
				<section className='relative h-screen'>
					<Slider {...sliderSettings} className='h-full'>
						{/* Slide 1 */}
						<div className='h-screen relative'>
							<div className='absolute inset-0 bg-gradient-to-r from-[#1a1f4d] to-[#2c3570]'>
								<div
									className='absolute inset-0 opacity-10'
									style={{
										backgroundImage:
											"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
									}}
								/>
							</div>

							{/* Date info in top left */}
							<div className='absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 text-white z-10'>
								<div className='text-xs sm:text-sm opacity-90'>
									{t('homePage.eventDate')}
								</div>
								<div className='text-xs sm:text-sm opacity-90'>
									{t('homePage.eventVenue')}
								</div>
								<div className='text-xs sm:text-sm opacity-90'>
									{t('homePage.eventLocation')}
								</div>
							</div>

							<div className='relative h-full flex flex-col items-center justify-center text-white z-10 px-4 sm:px-6 md:px-8'>
								<div className='text-center max-w-4xl'>
									<h1 className='text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4'>{t('homePage.mainTitle')}</h1>
									<h2 className='text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4'>
										{t('homePage.mainSubtitle')}{' '}
										<span className='text-[#4db8b8]'>
											{t('homePage.mainSubtitleHighlight')}
										</span>{' '}
										{t('homePage.mainSubtitleEnd')}
									</h2>
									<p className='text-base sm:text-lg md:text-xl mb-8 sm:mb-12 opacity-90'>
										{t('homePage.mainDescription')}
									</p>

									<div className='flex gap-2 sm:gap-4 justify-center flex-wrap'>
										<button onClick={() => navigate('/program')} className='bg-[#4db8b8] hover:bg-[#3da8a8] text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded transition-colors text-sm sm:text-base'>
											{t('homePage.watchStream')}
										</button>
										<button onClick={() => navigate('/partners')} className='bg-[#1a1f4d] hover:bg-[#0f1333] text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded transition-colors border border-white/20 text-sm sm:text-base'>
											{t('homePage.becomePartner')}
										</button>
										<button onClick={() => navigate('/mobile-app')} className='bg-white hover:bg-gray-100 text-[#1a1f4d] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded transition-colors text-sm sm:text-base'>
											{t('homePage.downloadApp')}
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Slide 2 */}
						<div className='h-screen relative'>
							<div className='absolute inset-0 bg-gradient-to-br from-[#2c3570] to-[#1a1f4d]'>
								<div
									className='absolute inset-0 opacity-10'
									style={{
										backgroundImage:
											"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
									}}
								/>
							</div>

							<div className='absolute top-4 sm:top-8 left-4 sm:left-8 text-white z-10'>
								<div className='text-xs sm:text-sm opacity-90'>
									{t('homePage.eventDate')}
								</div>
								<div className='text-xs sm:text-sm opacity-90'>
									{t('homePage.eventVenue')}
								</div>
								<div className='text-xs sm:text-sm opacity-90'>
									{t('homePage.eventLocation')}
								</div>
							</div>

							<div className='relative h-full flex flex-col items-center justify-center text-white z-10 px-4 sm:px-6 md:px-8'>
								<div className='text-center max-w-4xl'>
									<h1 className='text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4'>{t('homePage.mainTitle')}</h1>
									<h2 className='text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4'>
										{t('homePage.mainSubtitle')}{' '}
										<span className='text-[#4db8b8]'>
											{t('homePage.mainSubtitleHighlight')}
										</span>{' '}
										{t('homePage.mainSubtitleEnd')}
									</h2>
									<p className='text-base sm:text-lg md:text-xl mb-8 sm:mb-12 opacity-90'>
										{t('homePage.mainDescription')}
									</p>

									<div className='flex gap-2 sm:gap-4 justify-center flex-wrap'>
										<button onClick={() => navigate('/program')} className='bg-[#4db8b8] hover:bg-[#3da8a8] text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded transition-colors text-sm sm:text-base'>
											{t('homePage.watchStream')}
										</button>
										<button onClick={() => navigate('/partners')} className='bg-[#1a1f4d] hover:bg-[#0f1333] text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded transition-colors border border-white/20 text-sm sm:text-base'>
											{t('homePage.becomePartner')}
										</button>
										<button onClick={() => navigate('/mobile-app')} className='bg-white hover:bg-gray-100 text-[#1a1f4d] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded transition-colors text-sm sm:text-base'>
											{t('homePage.downloadApp')}
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Slide 3 */}
						<div className='h-screen relative'>
							<div className='absolute inset-0 bg-gradient-to-bl from-[#1a1f4d] via-[#2c3570] to-[#1a1f4d]'>
								<div
									className='absolute inset-0 opacity-10'
									style={{
										backgroundImage:
											"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
									}}
								/>
							</div>

							<div className='absolute top-4 sm:top-8 left-4 sm:left-8 text-white z-10'>
								<div className='text-xs sm:text-sm opacity-90'>
									{t('homePage.eventDate')}
								</div>
								<div className='text-xs sm:text-sm opacity-90'>
									{t('homePage.eventVenue')}
								</div>
								<div className='text-xs sm:text-sm opacity-90'>
									{t('homePage.eventLocation')}
								</div>
							</div>

							<div className='relative h-full flex flex-col items-center justify-center text-white z-10 px-4 sm:px-6 md:px-8'>
								<div className='text-center max-w-4xl'>
									<h1 className='text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4'>{t('homePage.mainTitle')}</h1>
									<h2 className='text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4'>
										{t('homePage.mainSubtitle')}{' '}
										<span className='text-[#4db8b8]'>
											{t('homePage.mainSubtitleHighlight')}
										</span>{' '}
										{t('homePage.mainSubtitleEnd')}
									</h2>
									<p className='text-base sm:text-lg md:text-xl mb-8 sm:mb-12 opacity-90'>
										{t('homePage.mainDescription')}
									</p>

									<div className='flex gap-2 sm:gap-4 justify-center flex-wrap'>
										<button onClick={() => navigate('/program')} className='bg-[#4db8b8] hover:bg-[#3da8a8] text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded transition-colors text-sm sm:text-base'>
											{t('homePage.watchStream')}
										</button>
										<button onClick={() => navigate('/partners')} className='bg-[#1a1f4d] hover:bg-[#0f1333] text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded transition-colors border border-white/20 text-sm sm:text-base'>
											{t('homePage.becomePartner')}
										</button>
										<button onClick={() => navigate('/mobile-app')} className='bg-white hover:bg-gray-100 text-[#1a1f4d] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded transition-colors text-sm sm:text-base'>
											{t('homePage.downloadApp')}
										</button>
									</div>
								</div>
							</div>
						</div>
					</Slider>
				</section>

				{/* About/Leader section */}
				<section className='px-3 py-6 sm:px-6 sm:py-10 md:px-8 md:py-16 max-w-6xl mx-auto'>
					<div className='flex flex-col lg:flex-row gap-6 lg:gap-12 items-start'>
						<div className='flex-shrink-0 w-full lg:w-auto'>
							<ImageWithFallback
								src='https://images.unsplash.com/photo-1553976468-dcd9082bcd28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjA3OTgwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
								alt='Руководитель'
								className='w-full sm:w-72 lg:w-80 h-auto rounded-lg shadow-lg'
							/>
						</div>
						<div className='flex-1 w-full'>
							<h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#1a1f4d] mb-3 sm:mb-4 md:mb-6 font-semibold'>
								{t('homePage.aboutAssemblyTitle')}
							</h2>
							<div className='space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base'>
								<p>{t('homePage.aboutAssemblyText1')}</p>
								<p>{t('homePage.aboutAssemblyText2')}</p>
								<p>{t('homePage.aboutAssemblyText3')}</p>
							</div>
							<button onClick={() => navigate('/about')} className='mt-3 sm:mt-4 md:mt-6 bg-[#1a1f4d] hover:bg-[#2c3570] text-white px-3 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded transition-colors text-xs sm:text-sm md:text-base font-medium'>
								{t('homePage.readMore')}
							</button>
						</div>
					</div>
				</section>

				{/* Competencies section */}
				<section className='px-3 py-6 sm:px-6 sm:py-10 md:px-8 md:py-16 bg-gray-50'>
					<div className='max-w-6xl mx-auto'>
						<h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#1a1f4d] mb-6 sm:mb-8 md:mb-12 font-semibold'>
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
									breakpoint: 1280,
									settings: {
										slidesToShow: 3,
										slidesToScroll: 1,
										arrows: true,
									},
								},
								{
									breakpoint: 1024,
									settings: {
										slidesToShow: 2,
										slidesToScroll: 1,
										arrows: true,
									},
								},
								{
									breakpoint: 768,
									settings: {
										slidesToShow: 1,
										slidesToScroll: 1,
										dots: true,
										arrows: false,
										autoplay: true,
										autoplaySpeed: 4000,
									},
								},
								{
									breakpoint: 640,
									settings: {
										slidesToShow: 1,
										slidesToScroll: 1,
										dots: true,
										arrows: false,
										autoplay: true,
										autoplaySpeed: 4000,
										centerMode: false,
									},
								},
							]}
						>
							{[
								{
									name: 'Сергей Петрович Иванов',
									position: 'Председатель Правления',
									date: '15.12.2025',
									image:
										'https://images.unsplash.com/photo-1601489865452-407a1b801dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbnxlbnwxfHx8fDE3NjYwNTExMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
								},
								{
									name: 'Александр Михайлович Козлов',
									position: 'Генеральный директор',
									date: '14.12.2025',
									image:
										'https://images.unsplash.com/photo-1762341120156-4a8303067873?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBleGVjdXRpdmV8ZW58MXx8fHwxNzY2MDMwMjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
								},
								{
									name: 'Дмитрий Андреевич Смирнов',
									position: 'Научный руководитель',
									date: '13.12.2025',
									image:
										'https://images.unsplash.com/photo-1553976468-dcd9082bcd28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjA3OTgwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
								},
								{
									name: 'Елена Викторовна Петрова',
									position: 'Директор по развитию',
									date: '12.12.2025',
									image:
										'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY2MDg1OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
								},
								{
									name: 'Михаил Сергеевич Волков',
									position: 'Главный эксперт',
									date: '11.12.2025',
									image:
										'https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MXx8fHwxNzY2MDg1OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
								},
								{
									name: 'Анна Игоревна Соколова',
									position: 'Руководитель аналитического центра',
									date: '10.12.2025',
									image:
										'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NjYwODU5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
								},
							].map((person, index) => (
								<div key={index} className='px-0 sm:px-2 md:px-4'>
									<div className='bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col'>
										<ImageWithFallback
											src={person.image}
											alt={person.name}
											className='w-full h-36 sm:h-48 md:h-64 object-cover flex-shrink-0'
										/>
										<div className='p-2.5 sm:p-3 md:p-6 flex-1 flex flex-col'>
											<h3 className='text-[#1a1f4d] mb-1 text-xs sm:text-sm md:text-base font-semibold line-clamp-2'>{person.name}</h3>
											<p className='text-gray-600 text-xs sm:text-sm mb-1 leading-relaxed line-clamp-2'>
												{person.position}
											</p>
											<p className='text-gray-400 text-xs mb-2 sm:mb-3 md:mb-4 flex-grow'>
												{person.date}
											</p>
											<button onClick={() => navigate('/leadership')} className='w-full px-2 py-1.5 sm:px-3 sm:py-2 md:px-6 md:py-3 bg-white text-[#1a1f4d] border-2 border-[#1a1f4d] rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium mt-auto'>
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
				<section className='px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 max-w-6xl mx-auto relative'>
					<div className='absolute inset-0 opacity-5 pointer-events-none'>
						<div
							className='w-full h-full'
							style={{
								backgroundImage:
									"url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234db8b8' fill-opacity='1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='15' r='1'/%3E%3Ccircle cx='50' cy='20' r='1'/%3E%3Ccircle cx='70' cy='25' r='1'/%3E%3Ccircle cx='90' cy='30' r='1'/%3E%3Ccircle cx='20' cy='40' r='1'/%3E%3Ccircle cx='40' cy='45' r='1'/%3E%3Ccircle cx='60' cy='50' r='1'/%3E%3Ccircle cx='80' cy='55' r='1'/%3E%3Ccircle cx='15' cy='70' r='1'/%3E%3Ccircle cx='35' cy='75' r='1'/%3E%3Ccircle cx='55' cy='80' r='1'/%3E%3Ccircle cx='75' cy='85' r='1'/%3E%3Ccircle cx='95' cy='90' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
								backgroundSize: '100px 100px',
								backgroundRepeat: 'repeat',
							}}
						/>
					</div>

					<div className='relative z-10'>
						{/* Mission statement */}
						<div className='mb-12 sm:mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start'>
							<div>
								<h3 className='text-[#4db8b8] text-lg sm:text-xl'>
									{t('homePage.missionTitle')}
								</h3>
							</div>
							<div className='md:col-span-2'>
								<p className='text-[#1a1f4d] text-lg sm:text-xl md:text-2xl leading-relaxed'>
									{t('homePage.missionDescription')}
								</p>
							</div>
						</div>

						{/* Statistics */}
						<div className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12'>
							{[
								{ value: '4500+', label: t('homePage.participantsLabel') },
								{ value: '150+', label: t('homePage.countriesLabel') },
								{ value: '40+', label: t('homePage.discussionTopicsLabel') },
								{ value: '10+', label: t('homePage.directionsLabel') },
							].map((stat, index) => (
								<div key={index} className='text-left'>
									<div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#4db8b8] mb-2 sm:mb-3'>
										{stat.value}
									</div>
									<div className='text-[#1a1f4d] text-xs sm:text-sm md:text-base'>{stat.label}</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Directions section */}
				<section className='px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 bg-gray-50'>
					<div className='max-w-6xl mx-auto'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start'>
							{/* Left side - Title */}
							<div>
								<h2 className='text-2xl sm:text-3xl md:text-4xl leading-tight'>
									<span className='text-[#4db8b8]'>
										{t('homePage.mainThemes')}
									</span>
									<br />
									<span className='text-[#1a1f4d]'>
										{t('homePage.mainThemesEnd')}
									</span>
								</h2>
							</div>

							{/* Right side - List */}
							<div className='space-y-0'>
								{[
									t('homePage.culture'),
									t('homePage.education'),
									t('homePage.sport'),
									t('homePage.youth'),
									t('homePage.religiousDialogue'),
									t('homePage.media'),
									t('homePage.csr'),
									t('homePage.tourism'),
								].map((direction, index) => (
									<div key={index} className='py-3 sm:py-4 md:py-5 lg:py-6 border-b border-gray-300'>
										<p className='text-[#1a1f4d] text-sm sm:text-base md:text-lg'>{direction}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Partners section */}
				<section className='px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 max-w-6xl mx-auto'>
					<h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#1a1f4d] mb-6 sm:mb-8 md:mb-12'>
						{t('homePage.ourPartners')}
					</h2>

					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center'>
						{Array.from({ length: 24 }).map((_, index) => (
							<div
								key={index}
								className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors p-4'
							>
								<div className='text-gray-400 text-xs text-center'>
									{t('homePage.partnerLogoText')}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* News section */}
				<section className='px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 bg-gray-50'>
					<div className='max-w-6xl mx-auto'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl text-[#1a1f4d] mb-8 sm:mb-12'>
							{t('homePage.newsAndEvents')}
						</h2>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'>
							{loading ? (
								<div className='col-span-full text-center py-12 text-gray-500'>
									Загрузка новостей...
								</div>
							) : newsItems.length === 0 ? (
								<div className='col-span-full text-center py-12 text-gray-500'>
									Новостей не найдено
								</div>
							) : (
								newsItems.map(news => (
									<div
										key={news.id}
										className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
									>
										<ImageWithFallback
											src={news.image}
											alt={news.title}
											className='w-full h-48 object-cover'
										/>
										<div className='p-6'>
											<div className='text-[#4db8b8] text-xs mb-2'>
												{news.date}
											</div>
											<h3 className='text-[#1a1f4d] mb-2'>{news.title}</h3>
											<p className='text-gray-600 text-sm leading-relaxed mb-4'>
												{news.description}
											</p>
											<button onClick={() => navigate(`/news/${news.id}`)} className='text-[#4db8b8] hover:text-[#3da8a8] text-sm transition-colors'>
												{t('homePage.readMoreLink')}
											</button>
										</div>
									</div>
								))
							)}
						</div>

						<div className='mt-12 text-center'>
							<button
								onClick={() => navigate('/press-center')}
								className='bg-[#1a1f4d] hover:bg-[#2c3570] text-white px-8 py-3 rounded transition-colors text-sm'
							>
								{t('homePage.allNews')}
							</button>
						</div>
					</div>
				</section>

				{/* CTA section */}
				<section className='px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 max-w-6xl mx-auto'>
					<div className='bg-gradient-to-r from-[#1a1f4d] to-[#2c3570] text-white rounded-2xl p-6 sm:p-8 md:p-12 text-center'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl mb-4'>{t('homePage.joinCommunity')}</h2>
						<p className='text-white/90 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed'>
							{t('homePage.joinCommunityDesc')}
						</p>
						<div className='flex gap-2 sm:gap-4 justify-center flex-wrap'>
							<button onClick={() => navigate('/participants')} className='bg-[#4db8b8] hover:bg-[#3da8a8] text-white px-4 py-2 sm:px-6 sm:py-3 rounded transition-colors text-sm sm:text-base'>
								{t('homePage.becomeMember')}
							</button>
							<button onClick={() => navigate('/contacts')} className='bg-white/10 hover:bg-white/20 text-white px-4 py-2 sm:px-6 sm:py-3 rounded transition-colors text-sm sm:text-base'>
								{t('homePage.contactUsLink')}
							</button>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	)
}
