import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { useTranslation } from '../../i18n/useTranslation';

export function Footer() {
  const navigate = useLocaleNavigate();
  const { t } = useTranslation();

  return (
    <footer className="bg-[#1a1f4d] text-white py-12 px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                <span className="text-xs">{t('common.logo')}</span>
              </div>
              <div>
                <div>THE</div>
                <div className="text-xs opacity-80">ASSEMBLY</div>
              </div>
            </div>
            <p className="text-xs text-white/70">
              {t('footer.company')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm">{t('footer.company')}</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">{t('nav.about')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('nav.mission')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">История</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('nav.award')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm">{t('footer.phone')}</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>+7 495 123-45-67</li>
              <li>+7 495 987-65-43</li>
              <li>info@eurasassembly.org</li>
            </ul>
            <div className="mt-4">
              <h5 className="mb-2 text-sm">{t('footer.address')}</h5>
              <p className="text-xs text-white/70">
                г. Москва, ул. Примерная, д. 10, офис 100
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-[#4db8b8] to-[#7dd957] hover:opacity-90 text-white px-8 py-3 rounded-lg transition-opacity">
                {t('buttons.participate')}
              </button>
              <button className="w-full bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg transition-colors" onClick={() => navigate('/partners')}>
                {t('buttons.becomePartner')}
              </button>
              <button className="w-full bg-white hover:bg-gray-100 text-[#1a1f4d] px-8 py-3 rounded-lg transition-colors" onClick={() => navigate('/mobile-app')}>
                {t('buttons.downloadApp')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-white/20 text-xs text-white/50">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}