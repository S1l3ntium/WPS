import logo from '../../assets/logo.svg'
import { useLocaleNavigate } from '../../hooks/useLocaleNavigate'
import { useTranslation } from '../../i18n/useTranslation'

export function Footer() {
	const navigate = useLocaleNavigate()
	const { t } = useTranslation()

	return (
		<footer className='bg-[#1a1f4d] text-white py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-16'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
					{/* Logo and info */}
					<img src={logo} alt='World Public Assembly' className='h-8 sm:h-10' />

					{/* Links */}
					<div>
						<h4 className='mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm font-semibold'>{t('footer.company')}</h4>
						<ul className='space-y-1.5 sm:space-y-2 text-xs sm:text-xs text-white/70'>
							<li>
								<a href='#' className='hover:text-white transition-colors'>
									{t('nav.about')}
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-white transition-colors'>
									{t('nav.mission')}
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-white transition-colors'>
									История
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-white transition-colors'>
									{t('nav.award')}
								</a>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className='mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm font-semibold'>{t('footer.phone')}</h4>
						<ul className='space-y-1.5 sm:space-y-2 text-xs sm:text-xs text-white/70'>
							<li>+7 495 123-45-67</li>
							<li>+7 495 987-65-43</li>
							<li>info@eurasassembly.org</li>
						</ul>
						<div className='mt-4 sm:mt-5 md:mt-6'>
							<h5 className='mb-1.5 sm:mb-2 md:mb-3 text-xs sm:text-sm font-semibold'>{t('footer.address')}</h5>
							<p className='text-xs sm:text-xs text-white/70 leading-relaxed'>
								г. Москва, ул. Примерная, д. 10, офис 100
							</p>
						</div>
					</div>

					{/* CTA Buttons */}
					<div>
						<div className='space-y-2 sm:space-y-3 md:space-y-4'>
							<button className='w-full bg-gradient-to-r from-[#4db8b8] to-[#7dd957] hover:opacity-90 text-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg transition-opacity text-xs sm:text-sm font-medium'>
								{t('buttons.participate')}
							</button>
							<button
								className='w-full bg-transparent border-2 border-white hover:bg-white/10 text-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg transition-colors text-xs sm:text-sm font-medium'
								onClick={() => navigate('/partners')}
							>
								{t('buttons.becomePartner')}
							</button>
							<button
								className='w-full bg-white hover:bg-gray-100 text-[#1a1f4d] px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg transition-colors text-xs sm:text-sm font-medium'
								onClick={() => navigate('/mobile-app')}
							>
								{t('buttons.downloadApp')}
							</button>
						</div>
					</div>
				</div>

				{/* Bottom bar */}
				<div className='mt-6 sm:mt-8 md:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-white/20 text-xs text-white/50'>
					<p>{t('footer.copyright')}</p>
				</div>
			</div>
		</footer>
	)
}
