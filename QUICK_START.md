# Quick Start Guide - WPS Project

**Версия:** 1.0 Production Ready
**Дата:** December 25, 2025

---

## ⚡ Быстрый старт (5 минут)

### 1. Клонирование проекта
```bash
git clone <repository_url> wps
cd wps
```

### 2. Backend Setup
```bash
cd wps-laravel
cp .env.example .env
php artisan key:generate
composer install
php artisan migrate
php artisan serve
```

### 3. Frontend Setup
```bash
cd ../wps-frontend
npm install
npm run dev
```

### 4. Access Points
```
Frontend:   http://localhost:5173
Backend:    http://localhost:8000
Admin:      http://localhost:8000/admin
API:        http://localhost:8000/api
```

---

## 📚 Основные команды

### Laravel Backend
```bash
# Development
php artisan serve                    # Start server
php artisan tinker                   # Interactive shell
php artisan migrate                  # Run migrations
php artisan db:seed                  # Seed database

# Testing
php artisan test                     # Run all tests
php artisan test --testsuite=Unit   # Unit tests only
php artisan test tests/Unit/HasSearchTraitTest.php

# Cache & Optimization
php artisan cache:clear             # Clear cache
php artisan config:cache            # Cache config
php artisan route:cache             # Cache routes
php artisan view:cache              # Cache views

# Admin
php artisan moonshine:install       # Setup MoonShine
```

### Frontend (Vue 3)
```bash
# Development
npm run dev                         # Start dev server
npm run build                       # Build for production
npm run preview                     # Preview production build
npm run lint                        # Run linter

# Commands
npm run type-check                  # TypeScript check
npm run format                      # Format code
```

---

## 🔌 API Endpoints (примеры)

### Получить события
```bash
curl "http://localhost:8000/api/events?page=1&per_page=15"
```

### Поиск
```bash
curl "http://localhost:8000/api/events?search=conference"
```

### Сортировка
```bash
curl "http://localhost:8000/api/events?sort_by=start_date&sort_order=desc"
```

### Фильтрация
```bash
curl "http://localhost:8000/api/news?type=news&page=1"
```

### FAQ конкурса
```bash
curl "http://localhost:8000/api/competitions/1/faq?page=1&per_page=10"
```

---

## 📂 Структура проекта

```
WPS/
├── wps-laravel/                 # Backend (Laravel)
│   ├── app/
│   │   ├── Models/              # Database models
│   │   ├── Http/Controllers/    # API controllers
│   │   ├── Services/            # Business logic (CacheService)
│   │   └── Models/Traits/       # Reusable traits
│   ├── database/
│   │   ├── migrations/          # Database changes
│   │   └── seeders/             # Test data
│   ├── tests/
│   │   ├── Unit/                # Unit tests
│   │   └── Feature/             # API tests
│   ├── routes/
│   │   └── api.php              # API routes
│   └── config/
│       └── cache.php            # Cache configuration
│
├── wps-frontend/                # Frontend (Vue 3)
│   ├── src/
│   │   ├── components/          # Vue components
│   │   ├── pages/               # Page components
│   │   ├── stores/              # State management
│   │   ├── services/            # API services
│   │   └── locales/             # Translations (ru, en)
│   └── public/
│       └── images/              # Static images
│
├── API_DOCUMENTATION.md         # API reference
├── DEPLOYMENT_GUIDE.md          # Deployment instructions
├── SECURITY_AUDIT.md            # Security report
├── PERFORMANCE_OPTIMIZATION.md  # Performance guide
├── PROJECT_STATUS.md            # Project status
└── QUICK_START.md               # This file
```

---

## 🧪 Тестирование

### Запустить все Unit тесты
```bash
cd wps-laravel
php artisan test --testsuite=Unit
```

**Результат:**
```
22 passed (32 assertions)
✅ HasSearchTraitTest (8 tests)
✅ HasSortingTraitTest (7 tests)
✅ HasFiltersTraitTest (7 tests)
```

### Написать новый тест
```bash
php artisan make:test MyFeatureTest
php artisan make:test MyUnitTest --unit
```

### Запустить конкретный тест
```bash
php artisan test tests/Unit/HasSearchTraitTest.php
php artisan test tests/Unit/HasSearchTraitTest.php --filter=test_search_finds_events
```

---

## 🔐 Окружение (Environment)

### Для Development (.env)
```env
APP_ENV=local
APP_DEBUG=true
CACHE_STORE=file
LOG_LEVEL=debug
```

### Для Production (.env.production)
```env
APP_ENV=production
APP_DEBUG=false
CACHE_STORE=file
LOG_LEVEL=warning
SESSION_SECURE_COOKIES=true
COOKIE_SECURE=true
```

### Критические переменные
```env
APP_KEY=              # Generate with: php artisan key:generate
DB_DATABASE=          # Database name
DB_USERNAME=          # Database user
DB_PASSWORD=          # Database password
MAIL_FROM_ADDRESS=    # Sender email
```

---

## 🐛 Отладка

### Включить query logging
```php
// In tinker or code
DB::enableQueryLog();
// run queries
dd(DB::getQueryLog());
```

### Проверить cache
```php
// Check if cached
Cache::has('competition_1')

// Get cached value
Cache::get('competition_1')

// Clear specific cache
Cache::forget('competition_1')

// Clear all cache
Cache::flush()
```

### Посмотреть логи
```bash
# Real-time logs
tail -f storage/logs/laravel.log

# Last 50 lines
tail -50 storage/logs/laravel.log

# Search for errors
grep ERROR storage/logs/laravel.log
```

---

## 📊 Database

### Создать migration
```bash
php artisan make:migration create_table_name
php artisan make:migration add_column_to_table --table=table_name
```

### Применить миграции
```bash
php artisan migrate              # Run all pending
php artisan migrate --fresh      # Reset and run
php artisan migrate:rollback     # Revert last batch
```

### Создать seeder
```bash
php artisan make:seeder UserSeeder
php artisan db:seed             # Run all seeders
php artisan db:seed --class=UserSeeder
```

---

## 🛠️ Полезные инструменты

### Laravel Tinker (REPL)
```bash
php artisan tinker

# Examples in tinker
>>> Event::count()
>>> Event::where('type', 'conference')->get()
>>> Cache::put('key', 'value', 3600)
>>> \App\Services\CacheService::getCompetition(1)
```

### Check Server Status
```bash
# Laravel
curl http://localhost:8000/api/events

# Frontend
curl http://localhost:5173

# Both running?
netstat -tuln | grep -E '8000|5173'
```

### Clear Everything
```bash
# Clear all caches
php artisan cache:clear
php artisan config:cache --clear
php artisan route:cache --clear
php artisan view:cache --clear

# Restart services
php artisan serve  # Kill and restart
# or in Docker: docker restart container_name
```

---

## 📖 Документация

| Файл | Для кого | Содержимое |
|------|----------|-----------|
| API_DOCUMENTATION.md | Фронтенд разработчики | Все API endpoints |
| DEPLOYMENT_GUIDE.md | DevOps, системные администраторы | Deployment инструкции |
| SECURITY_AUDIT.md | Security команда | Security checklist |
| PERFORMANCE_OPTIMIZATION.md | Backend разработчики | Оптимизация |
| PROJECT_STATUS.md | Проект менеджеры | Статус проекта |
| QUICK_START.md | Все новые разработчики | Быстрый старт |

---

## ✅ Pre-commit Checklist

Перед commit'ом:
```bash
# 1. Запустить тесты
php artisan test --testsuite=Unit

# 2. Lint код
npm run lint  # для frontend

# 3. Check code style
composer phpcs  # if configured

# 4. Verify no console.log/dd in code
grep -r "dd(" app/  # Should be empty
grep -r "console.log" src/  # Should be empty

# 5. Commit
git add .
git commit -m "Descriptive message"
git push origin branch-name
```

---

## 🚀 Deployment в Production

### Quick Deployment
```bash
# 1. Pull latest code
git pull origin main

# 2. Install dependencies
composer install --no-dev
npm install --production

# 3. Build frontend
cd wps-frontend && npm run build && cd ..

# 4. Run migrations
cd wps-laravel && php artisan migrate --force

# 5. Cache optimization
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 6. Restart services
sudo systemctl restart php8.1-fpm
sudo systemctl reload nginx
```

### Full Deployment Guide
See: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🆘 Troubleshooting

### "Class not found" error
```bash
composer dump-autoload
php artisan cache:clear
```

### Database connection failed
```bash
# Check .env
grep DB_ .env

# Test connection
php artisan db
```

### Port already in use
```bash
# Find and kill process
lsof -i :8000
kill -9 <PID>

# Or use different port
php artisan serve --port=8001
```

### Frontend won't build
```bash
# Clear node_modules
rm -rf node_modules
npm install

# Clear build cache
rm -rf dist node_modules/.vite
npm run build
```

---

## 📞 Where to Get Help

1. **API Issues** → [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
2. **Deployment Issues** → [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
3. **Security Questions** → [SECURITY_AUDIT.md](SECURITY_AUDIT.md)
4. **Performance Issues** → [PERFORMANCE_OPTIMIZATION.md](PERFORMANCE_OPTIMIZATION.md)
5. **Project Status** → [PROJECT_STATUS.md](PROJECT_STATUS.md)

---

## 🎯 Common Tasks

### Add new API endpoint
```php
// 1. Create controller method
public function index() { ... }

// 2. Add route in routes/api.php
Route::get('/resource', [ResourceController::class, 'index']);

// 3. Add tests in tests/Feature/
public function test_get_resources() { ... }

// 4. Run tests
php artisan test
```

### Add new page
```bash
# 1. Create component
touch src/pages/NewPage.vue

# 2. Add route in router.ts
{ path: '/new-page', component: NewPage }

# 3. Add to navigation
// Update navigation component

# 4. Add translations
// Update locales/ru.json and en.json
```

### Add new database table
```bash
# 1. Create migration
php artisan make:migration create_table_name

# 2. Define schema in migration file

# 3. Run migration
php artisan migrate

# 4. Create model
php artisan make:model TableName

# 5. Add to admin panel
// Create MoonShine resource
```

---

**Happy Coding! 🚀**

For more details, check the comprehensive documentation files.
