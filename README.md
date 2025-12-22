# WPS - World Public Assembly Project

Полный набор проектов для Всемирной Общественной Ассамблеи.

## 📁 Структура проекта

```
/Volumes/ADATA LEGEND 900/Work/Other/
├── wps-frontend/          # React SPA фронтенд
├── wps-laravel/           # Laravel REST API + админ-панель
├── postman/               # Postman коллекция и окружения
└── README.md              # Этот файл
```

## 🚀 Проекты

### 1. wps-frontend (React)

**Описание:** React приложение для отображения информации о Всемирной Общественной Ассамблеи

**Технологии:**
- React 18.3.1
- TypeScript
- Vite 6.3.5
- Tailwind CSS 4.1.12
- Radix UI
- React Hook Form

**Функционал:**
- Страница мероприятий с фильтрацией
- Новости и статьи
- Информация о партнерах
- Информация об отелях и проживании
- Комитет организаторов
- Конкурсы и гранты
- Информация о наградах

**Запуск:**
```bash
cd wps-frontend
npm install
npm run dev
```

**Сервер:** http://localhost:5173

---

### 2. wps-laravel (Laravel)

**Описание:** REST API сервер + MoonShine админ-панель для управления контентом

**Технологии:**
- Laravel 12
- PHP 8.2+
- PostgreSQL / SQLite
- MoonShine 4.0 (админ-панель)

**API Endpoints:**
- Events (`/api/events`)
- News (`/api/news`)
- Partners (`/api/partners`)
- Hotels (`/api/hotels`)
- Competitions (`/api/competitions`)
- Awards (`/api/awards`)
- Committee Members (`/api/committee-members`)
- Partner Packages (`/api/partner-packages`)

**Запуск:**
```bash
cd wps-laravel
composer install
php artisan migrate
php artisan serve
```

**API Server:** http://localhost:8000/api
**Admin Panel:** http://localhost:8000/admin

**Документация:**
- [API_DOCUMENTATION.md](wps-laravel/API_DOCUMENTATION.md) - Полная справка по API
- [MIGRATION_NOTES.md](wps-laravel/MIGRATION_NOTES.md) - История миграции

---

### 3. postman

**Описание:** Коллекция запросов Postman для тестирования API

**Содержит:**
- **Collections:** WPS_API.postman_collection.json (все endpoints)
- **Environments:**
  - Development (localhost)
  - Staging (staging сервер)
  - Production (production сервер)

**Быстрый старт:**
1. Импортируйте `postman/collections/WPS_API.postman_collection.json` в Postman
2. Импортируйте нужное окружение из `postman/environments/`
3. Тестируйте API endpoints

**Документация:** [postman/README.md](postman/README.md)

---

## 🏗️ Архитектура

```
┌─────────────────────────────────────────────────────────┐
│            wps-frontend (React SPA)                     │
│  - Localhost:5173 (development)                         │
│  - Calls API at /api endpoints                          │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTP/CORS
                   ▼
┌─────────────────────────────────────────────────────────┐
│         wps-laravel (API + Admin Backend)               │
│  - Localhost:8000 (development)                         │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ REST API Endpoints (/api/*)                      │  │
│  │ - Public: GET endpoints                          │  │
│  │ - Protected: POST, PUT, DELETE                   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ MoonShine Admin Panel (/admin)                   │  │
│  │ - Content management                             │  │
│  │ - User management                                │  │
│  │ - Database administration                        │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  Database: PostgreSQL/SQLite                            │
│  - Events, News, Partners, Awards, Hotels, etc.         │
└──────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│            postman (Testing Tools)                      │
│  - API Collection with all endpoints                    │
│  - Environment configurations                           │
│  - Pre-configured requests                              │
└──────────────────────────────────────────────────────────┘
```

---

## 📋 Требования

### Для фронтенда
- Node.js 18+
- npm или yarn

### Для бэкенда
- PHP 8.2+
- Composer
- PostgreSQL 12+ (или SQLite)

### Общее
- Git
- Postman (опционально, для тестирования)

---

## 🔧 Установка и запуск

### Development сценарий

**Терминал 1 - фронтенд:**
```bash
cd wps-frontend
npm install
npm run dev
```
Доступно: http://localhost:5173

**Терминал 2 - бэкенд:**
```bash
cd wps-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:refresh --seed
php artisan serve
```
Доступно:
- API: http://localhost:8000/api
- Admin: http://localhost:8000/admin

**Терминал 3 - опционально, Postman:**
1. Откройте Postman
2. Импортируйте коллекцию из `postman/collections/WPS_API.postman_collection.json`
3. Выберите Development окружение
4. Тестируйте endpoints

---

## 🗂️ Важные файлы

### Frontend
- `wps-frontend/src/app/App.tsx` - Главный компонент приложения
- `wps-frontend/src/app/components/` - Все страницы и компоненты
- `wps-frontend/package.json` - Зависимости и скрипты

### Backend
- `wps-laravel/routes/api.php` - API маршруты
- `wps-laravel/app/Http/Controllers/` - Контроллеры
- `wps-laravel/app/Models/` - Модели данных
- `wps-laravel/database/migrations/` - Миграции БД
- `wps-laravel/config/cors.php` - CORS конфигурация

### Документация
- `wps-laravel/API_DOCUMENTATION.md` - Полная API справка
- `wps-laravel/MIGRATION_NOTES.md` - История миграции архитектуры
- `postman/README.md` - Руководство по Postman

---

## 🔐 Безопасность

### CORS
Настройена в `wps-laravel/.env`:
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

Для production:
```env
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Аутентификация
- Admin endpoints защищены middleware `auth:api`
- Public endpoints доступны без токена
- MoonShine админ-панель имеет свою систему аутентификации

---

## 📊 API Endpoints

### Public (GET только)
- `GET /api/events` - События с фильтрацией
- `GET /api/news` - Новости с фильтрацией
- `GET /api/partners` - Партнеры
- `GET /api/hotels` - Отели
- `GET /api/competitions` - Конкурсы
- `GET /api/awards` - Награды
- `GET /api/committee-members` - Члены комитета
- `GET /api/partner-packages` - Пакеты партнерства

### Protected (требует аутентификации)
- `POST /api/*` - Создание
- `PUT /api/*` - Обновление
- `DELETE /api/*` - Удаление

Полная документация: [API_DOCUMENTATION.md](wps-laravel/API_DOCUMENTATION.md)

---

## 🎯 Workflow

### Разработчик фронтенда
1. Запустить фронтенд: `npm run dev`
2. Использовать Postman для тестирования API
3. Интегрировать endpoints в компоненты
4. Проверить результаты в браузере

### Разработчик бэкенда
1. Запустить сервер: `php artisan serve`
2. Использовать Postman для тестирования
3. Управлять контентом через админ-панель
4. Развертывание на продакшн

### Менеджер контента
1. Открыть админ-панель: http://localhost:8000/admin
2. Создавать/редактировать события, новости, партнеров
3. Публиковать контент
4. Результаты видны на фронтенде автоматически

---

## 🐛 Troubleshooting

### Frontend не может подключиться к API

**Ошибка:** CORS error в консоли браузера

**Решение:**
1. Убедитесь, что бэкенд запущен на `http://localhost:8000`
2. Проверьте CORS конфигурацию в `.env`:
   ```env
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   ```
3. Перезагрузите браузер

### БД ошибки

**Ошибка:** "SQLSTATE[08006]: Connection refused"

**Решение:**
1. Проверьте, что PostgreSQL запущен
2. Проверьте credentials в `.env`
3. Создайте БД если её нет:
   ```bash
   createdb wps_development
   ```
4. Запустите миграции:
   ```bash
   php artisan migrate:refresh --seed
   ```

### Postman не находит endpoints

**Ошибка:** "Cannot GET /api/events"

**Решение:**
1. Убедитесь, что Laravel запущен: `php artisan serve`
2. Проверьте URL в окружении Postman
3. Запустите: `php artisan route:list` для проверки маршрутов

---

## 📚 Документация

- **API:** [wps-laravel/API_DOCUMENTATION.md](wps-laravel/API_DOCUMENTATION.md)
- **Миграция:** [wps-laravel/MIGRATION_NOTES.md](wps-laravel/MIGRATION_NOTES.md)
- **Postman:** [postman/README.md](postman/README.md)

---

## 👥 Git Workflow

### Для фронтенда
```bash
cd wps-frontend
git checkout -b feature/name
# ... изменения ...
git add .
git commit -m "Add feature"
git push origin feature/name
```

### Для бэкенда
```bash
cd wps-laravel
git checkout -b feature/name
# ... изменения ...
git add .
git commit -m "Add feature"
git push origin feature/name
```

---

## 🚀 Deployment

### Frontend (Production)
```bash
cd wps-frontend
npm run build
# Deploy dist/ folder to web server
```

### Backend (Production)
```bash
cd wps-laravel
composer install --no-dev
php artisan config:cache
php artisan migrate --force
# Deploy to server with PHP 8.2+
```

---

## 📝 Версионирование

- **Frontend:** v1.0.0 (React)
- **Backend:** v1.0.0 (Laravel)
- **API:** v1 (RESTful)
- **Last Updated:** 2025-12-20

---

## 📧 Контакты

Для вопросов или проблем обратитесь к команде разработки.

---

## ✅ Чек-лист для новых разработчиков

- [ ] Клонировал оба репозитория
- [ ] Установил зависимости фронтенда (`npm install`)
- [ ] Установил зависимости бэкенда (`composer install`)
- [ ] Настроил `.env` файлы
- [ ] Запустил миграции БД
- [ ] Запустил seeders для тестовых данных
- [ ] Фронтенд работает на localhost:5173
- [ ] Бэкенд работает на localhost:8000
- [ ] API endpoints доступны
- [ ] Админ-панель доступна
- [ ] Импортировал Postman коллекцию
- [ ] Протестировал несколько endpoints
- [ ] Прочитал документацию

---

**Happy Coding! 🎉**
