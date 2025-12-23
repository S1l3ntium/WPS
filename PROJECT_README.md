# World Public Summit (WPS) - Full Stack Application

Полный стек приложения для Всемирной Общественной Ассамблеи.

## 🏗️ Архитектура проекта

```
WPS/
├── wps-frontend/          # React SPA (Vite + TypeScript)
├── wps-laravel/           # Laravel API + MoonShine Admin
├── postman/               # API collections & environments
└── PROJECT_README.md      # Этот файл
```

## 🚀 Быстрый старт

### Вариант 1: Все вместе (рекомендуется)

```bash
# 1. Откройте 2 терминала

# Terminal 1 - Backend (Laravel)
cd wps-laravel
composer install
cp .env.example .env
php artisan key:generate
# Отредактируй .env с DB_* переменными
php artisan migrate --seed
php artisan serve

# Terminal 2 - Frontend (React)
cd wps-frontend
npm install
npm run dev
```

### Вариант 2: Пошагово

#### Шаг 1: Настройка Backend

```bash
cd wps-laravel

# Установи зависимости
composer install

# Создай .env файл
cp .env.example .env

# Сгенерируй APP_KEY
php artisan key:generate

# Отредактируй .env с твоими параметрами
nano .env

# Мигрируй БД
php artisan migrate --seed

# Запусти dev сервер
php artisan serve
```

#### Шаг 2: Настройка Frontend

```bash
cd wps-frontend

# Установи зависимости
npm install

# Запусти dev сервер
npm run dev
```

#### Шаг 3: Открой в браузере

```
https://worldpublicsummit.test
```

(требуется Nginx с SSL proxy на localhost)

## 📋 Структура приложения

### Frontend (wps-frontend)

**Технология**: React 19 + TypeScript + Vite

**Особенности**:
- ✅ 19 страниц полностью разработаны
- ✅ Полная локализация RU/EN с URL префиксами
- ✅ React Router v7 для SPA навигации
- ✅ localStorage для сохранения языка
- ✅ Responsive дизайн (Tailwind CSS)
- ✅ API интеграция с useApi hook

**Запуск**:
```bash
cd wps-frontend
npm run dev     # Development
npm run build   # Production build
```

**Доступные страницы**:
1. HomePage - Главная
2. AboutPage - О Ассамблее
3. MissionPage - Миссия и цели
4. ProgramPage - Программа событий
5. EventPage - Детали события
6. NewsPage - Список новостей
7. PressCenterPage - Пресс-центр
8. PartnersPage - Партнеры
9. ParticipantsPage - Участникам
10. AwardPage - Награды
11. VenuePage - Место проведения
12. LeadershipCompetitionPage - Конкурс лидерства
13. GrantsCompetitionPage - Конкурс грантов
14. OrganizersPage - Организаторы
15. OrgCommitteePage - Комитет
16. MobileAppPage - Мобильное приложение
17. PhotoGalleryPage - Фотогалерея
18. ContactsPage - Контакты
19. PhotoGallery - Фото (компонент)

**Локализация**:
- Все UI тексты переводятся
- URL поддерживает `/ru/` и `/en/` префиксы
- localStorage сохраняет выбор языка пользователя

### Backend (wps-laravel)

**Технология**: Laravel 11 + PostgreSQL

**Особенности**:
- ✅ REST API со всеми endpoints
- ✅ 10 моделей данных (Events, News, Partners, Awards и т.д.)
- ✅ MoonShine admin панель с 4 ресурсами
- ✅ Multilingual JSON поддержка
- ✅ CORS конфигурация для фронтенда
- ✅ Полная валидация данных

**Запуск**:
```bash
cd wps-laravel
php artisan serve          # Development на http://localhost:8000
php artisan migrate --seed # Миграция и заполнение БД
```

**Admin Panel**:
- URL: http://localhost:8000/admin
- Email: из ADMIN_EMAIL в .env
- Password: из ADMIN_PASSWORD в .env

**API Endpoints**:
```
GET  /api/events              - Список событий
GET  /api/events/{id}         - Детали события
GET  /api/news                - Список новостей
GET  /api/news/{id}           - Детали новости
GET  /api/partners            - Список партнеров
GET  /api/awards              - Список наград
GET  /api/hotels              - Список отелей
GET  /api/competitions        - Список конкурсов
GET  /api/committee-members   - Список членов комитета
GET  /api/partner-packages    - Пакеты для партнеров
```

### Admin Panel (MoonShine)

**Ресурсы**:
1. Events - управление событиями
2. News - управление новостями
3. Partners - управление партнерами
4. Awards - управление наградами

(Планируется расширение: Competitions, Hotels, Committee Members, Partner Packages)

## 📝 Environment Setup

### Frontend (.env)

```env
# Development
VITE_API_URL=http://localhost:8000
VITE_APP_ENV=development

# Production
VITE_API_URL=https://api.worldpublicsummit.org
VITE_APP_ENV=production
```

### Backend (.env)

```env
# App
APP_NAME="World Public Summit"
APP_ENV=development
APP_DEBUG=true
APP_KEY=base64:...

# Database
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=wps_development
DB_USERNAME=postgres
DB_PASSWORD=your_password

# Admin
ADMIN_EMAIL=admin@worldpublicsummit.org
ADMIN_PASSWORD=strong_password

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://worldpublicsummit.test

# Mail
MAIL_FROM_ADDRESS=noreply@worldpublicsummit.org
```

## 🌐 Production Deployment

### Frontend

```bash
# Build
npm run build

# Скопируй dist/ на Nginx сервер
rsync -avz dist/ user@server:/var/www/worldpublicsummit/

# Nginx конфиг (SPA fallback на index.html)
location / {
    try_files $uri $uri/ /index.html;
}
```

### Backend

```bash
# Производственная сборка
composer install --optimize-autoloader --no-dev

# Миграции (на продакшене)
php artisan migrate --force

# Кеширование
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Запуск через production веб-сервер (Apache/Nginx)
```

## 📚 Документация

### Frontend
- [wps-frontend/README.md](./wps-frontend/README.md) - Подробная документация Frontend
- [wps-frontend/ARCHITECTURE.md](./wps-frontend/ARCHITECTURE.md) - Архитектура приложения
- [wps-frontend/LOCALIZATION_COMPLETE.md](./wps-frontend/LOCALIZATION_COMPLETE.md) - Локализация
- [wps-frontend/API_CONFIG.md](./wps-frontend/API_CONFIG.md) - API конфигурация

### Backend
- [wps-laravel/README.md](./wps-laravel/README.md) - Подробная документация Backend
- [wps-laravel/API_DOCUMENTATION.md](./wps-laravel/API_DOCUMENTATION.md) - Полная API документация
- [wps-laravel/MOONSHINE.md](./wps-laravel/MOONSHINE.md) - Admin panel документация
- [wps-laravel/PROJECT_SUMMARY.md](./wps-laravel/PROJECT_SUMMARY.md) - Обзор проекта

### Testing
- [postman/](./postman/) - Postman collections и environments для тестирования API

## 🧪 Тестирование

### Frontend тестирование
```bash
# Проверь локализацию на всех страницах
# - Переключение RU/EN в header
# - URL меняется на /ru/ или /en/
# - При обновлении страницы язык сохраняется
```

### Backend тестирование
```bash
# Используй Postman collection
# или тестируй вручную с curl

curl http://localhost:8000/api/events
curl http://localhost:8000/api/news
```

### Admin тестирование
1. Открой http://localhost:8000/admin
2. Входи с admin credentials
3. Проверь CRUD для каждого ресурса
4. Тестируй multilingual редактирование

## 🔐 Безопасность

### Критические элементы

✅ **Выполнено**:
- .env файл удален из git
- Добавлен в .gitignore
- APP_KEY сгенерирован
- CORS настроена
- Backup и debug файлы удалены

⚠️ **Требует внимания в production**:
- Измени default admin пароль
- Используй strong APP_KEY
- Включи HTTPS на фронтенде
- Ограничь CORS_ALLOWED_ORIGINS

## 📊 Текущий статус

| Компонент | Статус | Заметки |
|-----------|--------|---------|
| Frontend | 🟡 In Progress | 4/19 страниц локализировано |
| Backend API | ✅ Complete | Все основные endpoints готовы |
| Admin Panel | 🟡 Partial | 4/10 ресурсов готовы |
| Documentation | 🟡 Partial | Основные README готовы |
| Security | ✅ Addressed | Критические баги исправлены |
| Testing | 🔴 Pending | Нужны unit & integration tests |

## 🗺️ Дорожная карта

### ЭТАП 1: Безопасность и очистка ✅
- Удалена устаревшая документация (12 файлов)
- Исправлены критические баги безопасности
- Обновлена документация (4 файла)

### ЭТАП 2: Локализация (В процессе)
- Локализировать оставшиеся 15 страниц Frontend
- Расширить translations.ts
- Улучшить TypeScript типизацию

### ЭТАП 3-8: (Планируется)
- Расширить Backend API
- Расширить MoonShine Admin
- Интеграция Frontend с новыми endpoints
- Тестирование и QA
- Production готовность
- Миграция контента с worldpublicsummit.org

## 📈 Метрики

- **Frontend Pages**: 19 (4 локализированы)
- **Backend Endpoints**: 10+ (все основные готовы)
- **Admin Resources**: 4 (6 планируется)
- **Translations**: 150+ ключей (RU + EN)
- **Database Models**: 10+
- **Lines of Code**: Frontend ~15K, Backend ~8K

## 🎯 Цели на конец проекта

1. ✅ Все 19 страниц полностью локализированы
2. ✅ Все API endpoints документированы
3. ✅ MoonShine admin со всеми ресурсами
4. ✅ Нет критических bagов безопасности
5. ✅ TypeScript без any типов
6. ✅ Весь контент с worldpublicsummit.org перенесен
7. ✅ Production deployment успешен
8. ✅ Mobile-responsive все страницы
9. ✅ Актуальная документация
10. ✅ Полное покрытие API Postman collections

## 🤝 Разработка

### Git workflow
```bash
# 1. Создай branch для своей задачи
git checkout -b feature/описание-задачи

# 2. Делай коммиты
git commit -m "Описание изменения"

# 3. Запуши и создай pull request
git push origin feature/описание-задачи
```

### Код стандарты

**Frontend**:
- TypeScript - обязателен (без any типов)
- Tailwind CSS для стилизации
- Functional components + hooks
- Правильное использование useEffect dependencies

**Backend**:
- Laravel best practices
- Eloquent ORM для queries
- Form Request validation
- RESTful API naming

## 📞 Контакты и поддержка

Вопросы? Посмотри:
1. Релевантную документацию (README.md, ARCHITECTURE.md и т.д.)
2. Примеры в коде
3. Postman collection для API
4. Log файлы (storage/logs/laravel.log)

---

**Версия**: 1.0.0
**Последнее обновление**: 2025-12-23
**Статус**: Development/Alpha
