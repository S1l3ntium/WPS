import { Search, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate'
import { useLocale } from '../../context/LocaleContext'
import { useTranslation } from '../../i18n/useTranslation'

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

	// Navigation structure with translation keys
	const navItems: NavItem[] = [
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
			],
		},
		{
			label: t('nav.program'),
			translationKey: 'nav.program',
			path: '/program',
		},
		{
			label: t('nav.participants'),
			translationKey: 'nav.participants',
			path: '/participants',
		},
		{
			label: t('nav.partners'),
			translationKey: 'nav.partners',
			path: '/partners',
		},
		{
			label: t('nav.award'),
			translationKey: 'nav.award',
			path: '/award',
		},
		{
			label: t('nav.grants'),
			translationKey: 'nav.grants',
			submenu: [
				{
					label: t('nav.grants'),
					translationKey: 'nav.grants',
					path: '/grants-competition',
				},
				{
					label: 'Leadership',
					translationKey: 'nav.grants',
					path: '/leadership-competition',
				},
			],
		},
		{
			label: t('nav.press'),
			translationKey: 'nav.press',
			path: '/press-center',
		},
		{
			label: t('nav.contacts'),
			translationKey: 'nav.contacts',
			path: '/contacts',
		},
	]

	const handleNavClick = (path?: string) => {
		if (path) {
			navigate(path)
		}
	}

	return (
		<header className='bg-[#1a1f4d] text-white sticky top-0 z-50 shadow-lg'>
			{/* Search Overlay */}
			{isSearchOpen && (
				<div className='absolute top-0 left-0 right-0 bg-[#1a1f4d] border-b-2 border-[#4db8b8] z-50 shadow-2xl'>
					<div className='max-w-7xl mx-auto px-8 py-6'>
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
								className='text-white hover:text-[#4db8b8] transition-colors text-2xl w-10 h-10 flex items-center justify-center'
							>
								×
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Top bar */}
			<div className='border-b border-white/20'>
				<div className='max-w-7xl mx-auto px-8 py-3 flex justify-between items-center'>
					<button
						onClick={() => navigate('/')}
						className='flex items-center gap-2 hover:opacity-80 transition-opacity'
					>
						{/* <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
              <span className="text-xs">{t('common.logo')}</span>
            </div>
            <div>
              <div>THE</div>
              <div className="text-xs opacity-80">ASSEMBLY</div>
            </div> */}
						<img src='../../assets/logo.svg' alt='' className='h-10' />
					</button>

					<nav className='hidden lg:flex gap-6' style={{ fontSize: '14px' }}>
						{navItems.map((item, index) => {
							if (item.submenu) {
								return (
									<div key={index} className='relative group'>
										<button
											onClick={() => handleNavClick(item.submenu?.[0].path)}
											className='hover:text-[#4db8b8] transition-colors flex items-center gap-1 py-3'
											style={{ fontSize: '14px' }}
										>
											{item.label}
											<ChevronDown className='w-3 h-3' />
										</button>

										{/* Dropdown submenu */}
										<div className='absolute left-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto'>
											<div className='pt-2'>
												<div className='bg-white text-[#1a1f4d] rounded shadow-xl py-2 min-w-[280px]'>
													{item.submenu.map((subItem, subIndex) => (
														<button
															key={subIndex}
															onClick={() => handleNavClick(subItem.path)}
															className='block w-full text-left px-6 py-2 hover:bg-[#4db8b8] hover:text-white transition-colors'
															style={{ fontSize: '14px' }}
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
									className={`hover:text-[#4db8b8] transition-colors ${
										(item.translationKey === 'nav.partners' &&
											currentPage === 'partners') ||
										(item.translationKey === 'nav.program' &&
											currentPage === 'program') ||
										(item.translationKey === 'nav.participants' &&
											currentPage === 'participants') ||
										(item.translationKey === 'nav.award' &&
											currentPage === 'award') ||
										(item.translationKey === 'nav.press' &&
											currentPage === 'press-center') ||
										(item.translationKey === 'nav.contacts' &&
											currentPage === 'contacts')
											? 'text-[#4db8b8]'
											: ''
									}`}
									style={{ fontSize: '14px' }}
								>
									{item.label}
								</button>
							)
						})}
					</nav>

					<div className='flex items-center gap-4'>
						<button
							className='hover:text-[#4db8b8] transition-colors'
							onClick={() => setIsSearchOpen(!isSearchOpen)}
						>
							<Search className='w-5 h-5' />
						</button>
						<div className='relative group'>
							<button className='flex items-center gap-1 px-3 py-1 bg-[#2c3570] hover:bg-[#3d4680] rounded transition-colors'>
								<span>{locale.toUpperCase()}</span>
								<ChevronDown className='w-4 h-4' />
							</button>

							{/* Dropdown menu */}
							<div className='absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
								<div className='bg-white text-[#1a1f4d] rounded shadow-xl py-2 min-w-[100px]'>
									<button
										onClick={() => setLocale('ru')}
										className='flex items-center justify-between w-full px-4 py-2 hover:bg-[#4db8b8] hover:text-white transition-colors'
									>
										<span>Ru</span>
										{locale === 'ru' && (
											<span className='text-[#4db8b8] group-hover:text-white'>
												✓
											</span>
										)}
									</button>
									<button
										onClick={() => setLocale('en')}
										className='flex items-center justify-between w-full px-4 py-2 hover:bg-[#4db8b8] hover:text-white transition-colors'
									>
										<span>En</span>
										{locale === 'en' && (
											<span className='text-[#4db8b8] group-hover:text-white'>
												✓
											</span>
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
