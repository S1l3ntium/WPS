# WPS Backend - Laravel API

REST API для World Public Summit на Laravel 11 + PostgreSQL + MoonShine Admin Panel.

## 🎯 Технологии

- **Laravel 11** - Web фреймворк
- **PostgreSQL 14+** - Database
- **MoonShine** - Admin Panel
- **PHP 8.2+** - Runtime
- **Composer** - Package manager

## 📦 Требования

- PHP 8.2 или выше
- PostgreSQL 14 или выше
- Composer (последняя версия)
- Git

## 🚀 Быстрый старт

### 1. Клонирование и установка

```bash
cd wps-laravel
composer install
```

### 2. Настройка окружения

```bash
cp .env.example .env
php artisan key:generate
```

Отредактируй `.env` с твоими данными:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=wps_development
DB_USERNAME=postgres
DB_PASSWORD=your_password

ADMIN_EMAIL=admin@worldpublicsummit.org
ADMIN_PASSWORD=strong_password_here
```

### 3. Создание базы данных и миграция

```bash
php artisan migrate --seed
```

Это создаст все таблицы и заполнит тестовыми данными.

### 4. Запуск сервера

```bash
php artisan serve
```

API доступна на `http://localhost:8000`

## 📚 API Endpoints

### Все endpoints доступны на `/api` prefix

#### Events (События)
```
GET    /api/events              # List all events with filters
GET    /api/events/{id}         # Get event details
POST   /api/events              # Create event (auth required)
PUT    /api/events/{id}         # Update event (auth required)
DELETE /api/events/{id}         # Delete event (auth required)
```

#### News (Новости)
```
GET    /api/news                # List all news
GET    /api/news/{id}           # Get news details
POST   /api/news                # Create news (auth required)
PUT    /api/news/{id}           # Update news (auth required)
DELETE /api/news/{id}           # Delete news (auth required)
```

#### Partners (Партнеры)
```
GET    /api/partners            # List all partners
GET    /api/partners/{id}       # Get partner details
POST   /api/partners            # Create partner (auth required)
PUT    /api/partners/{id}       # Update partner (auth required)
DELETE /api/partners/{id}       # Delete partner (auth required)
```

#### Awards (Награды)
```
GET    /api/awards              # List all awards
GET    /api/awards/{id}         # Get award details
POST   /api/awards              # Create award (auth required)
PUT    /api/awards/{id}         # Update award (auth required)
DELETE /api/awards/{id}         # Delete award (auth required)
```

#### Additional Endpoints
```
GET    /api/hotels              # List all hotels
GET    /api/competitions        # List competitions
GET    /api/competitions/{id}/faq
GET    /api/committee-members   # List committee members
GET    /api/partner-packages    # List partner packages
```

Полная документация API: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🔐 Аутентификация

### Public endpoints (GET запросы)
Доступны без аутентификации.

### Protected endpoints (POST, PUT, DELETE)
Требуют JWT token в header:
```
Authorization: Bearer {token}
```

### Получение token

1. **Для development**: Используй credentials из `.env`:
```bash
ADMIN_EMAIL=admin@worldpublicsummit.org
ADMIN_PASSWORD=your_password
```

2. **Для production**: Реализуй endpoint `/api/login` для получения token

## 🛠️ Admin Panel (MoonShine)

Открой `http://localhost:8000/admin` после миграции.

### Вход:
- Email: из `ADMIN_EMAIL` в `.env`
- Password: из `ADMIN_PASSWORD` в `.env`

### Доступные ресурсы:
- **Events** - управление событиями
- **News** - управление новостями
- **Partners** - управление партнерами
- **Awards** - управление наградами

## 📁 Структура проекта

```
app/
├── Http/
│   ├── Controllers/      # API контроллеры
│   ├── Resources/        # JSON трансформация
│   └── Requests/         # Form validation
├── Models/               # Eloquent модели
├── MoonShine/
│   └── Resources/        # Admin ресурсы
└── Casts/               # Type casting
database/
├── migrations/           # Schema migrations
└── seeders/             # Seed данные
config/
├── app.php              # App конфигурация
├── database.php         # Database конфигурация
└── cors.php             # CORS настройка
routes/
└── api.php              # API маршруты
```

## 🌐 CORS конфигурация

Настроена в `.env`:
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://worldpublicsummit.test
```

Обновь при необходимости для других доменов.

## 📝 Multilingual JSON

Контент хранится с поддержкой нескольких языков:

```json
{
  "id": 1,
  "title": {
    "ru": "Название на русском",
    "en": "Title in English"
  },
  "description": {
    "ru": "Описание на русском",
    "en": "Description in English"
  }
}
```

## 🗄️ Database модели

### Events (события)
- title (multilingual)
- description (multilingual)
- type, date, time, location
- goals, format, questions
- moderators, experts, speakers
- schedule items
- tags, downloadLink

### News (новости)
- title (multilingual)
- description (multilingual)
- content (multilingual)
- image_url
- publish_date
- author

### Partners (партнеры)
- name
- description (multilingual)
- logo_url
- website
- category

### Awards (награды)
- title (multilingual)
- description (multilingual)
- icon_url
- nominees (many-to-many)

## 🧪 Тестирование

### С использованием Postman
1. Импортируй collection из `/postman/collections/WPS_API.postman_collection.json`
2. Выбери environment (`Development` или `Production`)
3. Запусти requests

### Вручную с curl

```bash
# Получить события
curl http://localhost:8000/api/events

# С фильтром по дате
curl "http://localhost:8000/api/events?date=2025-09-20"

# С pagination
curl "http://localhost:8000/api/events?page=1&per_page=10"
```

## 🚀 Развёртывание

### Development
```bash
php artisan serve
```

### Production

1. Создай `.env.production` с production переменными
2. Выполни миграции:
```bash
php artisan migrate --force
```

3. Кешируй конфигурацию:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

4. Запусти через production веб-сервер (Apache/Nginx)

## 📊 Логирование

Логи находятся в `storage/logs/laravel.log`

Настройка в `config/logging.php`

## 🐛 Troubleshooting

### Ошибка подключения к БД
```
Check .env DB_* переменные
Убедись, что PostgreSQL running
php artisan migrate опять
```

### MoonShine не открывается
```
Проверь /admin route в routes/web.php
Убедись, что authentication работает
```

### API возвращает 500 ошибку
```
Проверь storage/logs/laravel.log
Выполни php artisan cache:clear
Проверь permission на storage/ директорию
```

## 📄 Дополнительно

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Полная документация всех endpoints
- [MOONSHINE.md](./MOONSHINE.md) - Документация admin panel
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Обзор проекта
- [ROADMAP.md](./ROADMAP.md) - План развития

## 📞 Контакты

Для вопросов или проблем:
1. Проверь документацию
2. Посмотри в storage/logs/laravel.log
3. Посмотри примеры в /postman
