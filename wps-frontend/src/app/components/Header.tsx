import { Search, ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate'
import { useLocale } from '../../context/LocaleContext'
import { useTranslation } from '../../i18n/useTranslation'
import { competitionsAPI, CompetitionData, getLocalized } from '../../services/api'
import logo from '../../assets/logo.svg'

interface HeaderProps {
	currentPage?: string
}

interface NavItem {
	label: string
	translationKey: string
	path?: string
	submenu?: NavItem[]
}

export function Header({ currentPage = '' }: HeaderProps) {
	const navigate = useLocaleNavigate()
	const { locale, setLocale } = useLocale()
	const { t } = useTranslation()
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
	const [competitions, setCompetitions] = useState<CompetitionData[]>([])
	const [competitionsLoading, setCompetitionsLoading] = useState(true)
	const languageDropdownRef = useRef<HTMLDivElement>(null)

	// Close language dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
				setIsLanguageDropdownOpen(false)
			}
		}

		if (isLanguageDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside)
			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}
	}, [isLanguageDropdownOpen])

	// Load competitions from API
	useEffect(() => {
		const loadCompetitions = async () => {
			try {
				const response = await competitionsAPI.getAll({ per_page: 100 })
				setCompetitions(response.data)
			} catch (error) {
				console.error('Failed to load competitions:', error)
				setCompetitions([])
			} finally {
				setCompetitionsLoading(false)
			}
		}

		loadCompetitions()
	}, [])

	// Navigation structure with translation keys
	const navItems: NavItem[] = [
		// 1. About - EXPANDED SUBMENU
		{
			label: t('nav.about'),
			translationKey: 'nav.about',
			submenu: [
				{ label: t('nav.about'), translationKey: 'nav.about', path: '/about' },
				{
					label: t('nav.mission'),
					translationKey: 'nav.mission',
					path: '/mission',
				},
				{
					label: t('nav.committee'),
					translationKey: 'nav.committee',
					path: '/org-committee',
				},
				{
					label: t('nav.organizers'),
					translationKey: 'nav.organizers',
					path: '/organizers',
				},
				{ label: t('nav.venue'), translationKey: 'nav.venue', path: '/venue' },
				{ label: t('nav.partners'), translationKey: 'nav.partners', path: '/partners' },
			],
		},
		// 2. Summit Participation - NEW
		{
			label: t('nav.summitParticipation'),
			translationKey: 'nav.summitParticipation',
			submenu: [
				{
					label: t('nav.programDocuments'),
					translationKey: 'nav.programDocuments',
					path: '/program',
				},
				{
					label: t('nav.forParticipants'),
					translationKey: 'nav.forParticipants',
					path: '/participants',
				},
			],
		},
		// 3. Award - UNCHANGED
		{
			label: t('nav.award'),
			translationKey: 'nav.award',
			path: '/award',
		},
		// 4. Grants - DYNAMIC COMPETITIONS
		{
			label: t('nav.grants'),
			translationKey: 'nav.grants',
			submenu: competitionsLoading
				? [{ label: t('common.loading'), translationKey: 'common.loading', path: '#' }]
				: competitions.length > 0
					? competitions.map(comp => ({
							label: getLocalized(comp.name, locale as 'ru' | 'en'),
							translationKey: `competition_${comp.id}`,
							path: `/competition/${comp.id}`,
						}))
					: [{ label: t('common.noData'), translationKey: 'common.noData', path: '#' }],
		},
		// 5. Summits - NEW
		{
			label: t('nav.summits'),
			translationKey: 'nav.summits',
			submenu: [
				{
					label: t('nav.summitIraq'),
					translationKey: 'nav.summitIraq',
					path: '/',
				},
				{
					label: t('nav.summitLatinAmerica'),
					translationKey: 'nav.summitLatinAmerica',
					path: '/',
				},
				{
					label: t('nav.summitAfrica'),
					translationKey: 'nav.summitAfrica',
					path: '/',
				},
			],
		},
		// 6. Press - UNCHANGED
		{
			label: t('nav.press'),
			translationKey: 'nav.press',
			path: '/press-center',
		},
		// 7. Archive - NEW
		{
			label: t('nav.archive'),
			translationKey: 'nav.archive',
			submenu: [
				{
					label: t('nav.archive2025'),
					translationKey: 'nav.archive2025',
					path: '/',
				},
			],
		},
		// 8. Contacts - UNCHANGED
		{
			label: t('nav.contacts'),
			translationKey: 'nav.contacts',
			path: '/contacts',
		},
	]

	const handleNavClick = (path?: string) => {
		if (path) {
			navigate(path)
			setIsMobileMenuOpen(false)
		}
	}

	return (
		<header className='bg-[#1a1f4d] text-white sticky top-0 z-50 shadow-lg w-full'>
			{/* Search Overlay */}
			{isSearchOpen && (
				<div className='absolute top-0 left-0 right-0 w-full bg-[#1a1f4d] border-b-2 border-[#4db8b8] z-50 shadow-2xl'>
					<div className='w-full px-4 sm:px-6 lg:px-8 py-6'>
						<div className='flex items-center gap-4'>
							<div className='flex-1 relative'>
								<Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
								<input
									type='text'
									placeholder={t('common.searchPlaceholder')}
									className='w-full pl-12 pr-4 py-3 bg-white text-[#1a1f4d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4db8b8]'
									autoFocus
								/>
							</div>
							<button
								onClick={() => setIsSearchOpen(false)}
								className='text-white hover:text-[#4db8b8] transition-colors text-2xl w-10 h-10 flex items-center justify-center flex-shrink-0'
							>
								<X className='w-6 h-6' />
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Top bar */}
			<div className='border-b border-white/20 w-full'>
				<div className='w-full px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center'>
					<button
						onClick={() => navigate('/')}
						className='flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0'
					>
						<img src={logo} alt='World Public Assembly Logo' className='h-8 sm:h-10' />
					</button>

					{/* Desktop Navigation */}
					<nav className='hidden lg:flex gap-4 text-sm'>
						{navItems.map((item, index) => {
							if (item.submenu) {
								return (
									<div key={index} className='relative group'>
										<button
											onClick={() => handleNavClick(item.submenu?.[0].path)}
											className='hover:text-[#4db8b8] transition-colors flex items-center gap-1 py-3 text-sm'
										>
											{item.label}
											<ChevronDown className='w-3 h-3' />
										</button>

										{/* Dropdown submenu */}
										<div className='absolute left-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-40'>
											<div className='pt-2'>
												<div className='bg-white text-[#1a1f4d] rounded shadow-xl py-2 min-w-[200px] sm:min-w-[280px]'>
													{item.submenu.map((subItem, subIndex) => (
														<button
															key={subIndex}
															onClick={() => handleNavClick(subItem.path)}
															className='block w-full text-left px-6 py-2 hover:bg-[#4db8b8] hover:text-white transition-colors text-sm'
														>
															{subItem.label}
														</button>
													))}
												</div>
											</div>
										</div>
									</div>
								)
							}

							return (
								<button
									key={index}
									onClick={() => handleNavClick(item.path)}
									className={`hover:text-[#4db8b8] transition-colors text-sm ${
										(item.translationKey === 'nav.summitParticipation' &&
											(currentPage === 'program' || currentPage === 'participants')) ||
										(item.translationKey === 'nav.award' &&
											currentPage === 'award') ||
										(item.translationKey === 'nav.press' &&
											currentPage === 'press-center') ||
										(item.translationKey === 'nav.contacts' &&
											currentPage === 'contacts')
											? 'text-[#4db8b8]'
											: ''
									}`}
								>
									{item.label}
								</button>
							)
						})}
					</nav>

					{/* Right side controls */}
					<div className='flex items-center gap-2 sm:gap-4 flex-shrink-0'>
						<button
							className='hover:text-[#4db8b8] transition-colors'
							onClick={() => setIsSearchOpen(!isSearchOpen)}
						>
							<Search className='w-5 h-5' />
						</button>
						<div className='relative group' ref={languageDropdownRef}>
							<button
								onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
								className='flex items-center gap-1 px-2 sm:px-3 py-1 bg-[#2c3570] hover:bg-[#3d4680] rounded transition-colors text-sm sm:text-base'
							>
								<span>{locale.toUpperCase()}</span>
								<ChevronDown className='w-3 h-3 sm:w-4 sm:h-4' />
							</button>

							{/* Dropdown menu - visible on hover (desktop) or click state (mobile) */}
							<div className={`absolute right-0 top-full pt-2 transition-all duration-200 z-40 group-hover:opacity-100 group-hover:visible ${
								isLanguageDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
							}`}>
								<div className='bg-white text-[#1a1f4d] rounded shadow-xl py-2 min-w-[80px] sm:min-w-[100px]'>
									<button
										onClick={() => {
											setLocale('ru')
											setIsLanguageDropdownOpen(false)
										}}
										className='flex items-center justify-between w-full px-4 py-2 hover:bg-[#4db8b8] hover:text-white transition-colors'
									>
										<span>Ru</span>
										{locale === 'ru' && (
											<span className='text-[#4db8b8] hover:text-white'>
												✓
											</span>
										)}
									</button>
									<button
										onClick={() => {
											setLocale('en')
											setIsLanguageDropdownOpen(false)
										}}
										className='flex items-center justify-between w-full px-4 py-2 hover:bg-[#4db8b8] hover:text-white transition-colors'
									>
										<span>En</span>
										{locale === 'en' && (
											<span className='text-[#4db8b8] hover:text-white'>
												✓
											</span>
										)}
									</button>
								</div>
							</div>
						</div>

						{/* Mobile menu button */}
						<button
							className='lg:hidden hover:text-[#4db8b8] transition-colors'
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							{isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
						</button>
					</div>
				</div>

				{/* Mobile Navigation Menu */}
				{isMobileMenuOpen && (
					<div className='lg:hidden border-t border-white/20 bg-[#0f1333] w-full'>
						<nav className='flex flex-col py-2'>
							{navItems.map((item, index) => (
								<div key={index} className='w-full'>
									<button
										onClick={() => {
											if (item.submenu) {
												handleNavClick(item.submenu[0].path)
											} else {
												handleNavClick(item.path)
											}
										}}
										className='w-full text-left px-4 sm:px-6 py-3 hover:bg-[#2c3570] hover:text-[#4db8b8] transition-colors text-sm sm:text-base flex items-center justify-between'
									>
										<span>{item.label}</span>
										{item.submenu && <ChevronDown className='w-4 h-4' />}
									</button>
									{/* Mobile submenu */}
									{item.submenu && (
										<div className='bg-[#0a0e2a] border-l-2 border-[#4db8b8]'>
											{item.submenu.map((subItem, subIndex) => (
												<button
													key={subIndex}
													onClick={() => handleNavClick(subItem.path)}
													className='w-full text-left px-6 sm:px-8 py-2 hover:bg-[#2c3570] hover:text-[#4db8b8] transition-colors text-xs sm:text-sm'
												>
													{subItem.label}
												</button>
											))}
										</div>
									)}
								</div>
							))}
						</nav>
					</div>
				)}
			</div>
		</header>
	)
}
