import { useLocaleNavigate } from '../../hooks/useLocaleNavigate';
import { useTranslation } from '../../i18n/useTranslation';
import { Header } from './Header';

export function ForbiddenPage() {
  const localeNavigate = useLocaleNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-[#e8a54d] mb-4">
              403
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1f4d] mb-6">
              {t('errors.forbidden') || 'Доступ запрещен'}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8">
              {t('errors.forbiddenDescription') || 'У вас нет доступа к этой странице. Пожалуйста, проверьте свои права доступа.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => localeNavigate('/')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[#4db8b8] text-white rounded font-medium hover:bg-[#3a9a9a] transition-colors"
            >
              {t('buttons.backToHome') || 'Вернуться на главную'}
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#4db8b8] text-[#4db8b8] rounded font-medium hover:bg-[#f0f8f8] transition-colors"
            >
              {t('buttons.back') || 'Вернуться назад'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
