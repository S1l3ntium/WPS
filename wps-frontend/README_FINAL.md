# WPS Frontend - Полная документация

## ✅ Что было сделано

### 1. React Router интеграция ✨
- Полная маршрутизация с 18 основными маршрутами
- Поддержка back/forward кнопок браузера
- Параметризованные маршруты для деталей (events, news)
- React Router v7.11.0

### 2. API интеграция 🔌
- Hook `useApi` для простого использования API
- Конфигурация для `https://worldpublicsummit.test`
- Proxy настройка для dev режима (обхода CORS)
- Поддержка GET, POST, PUT, DELETE запросов
- .env файлы для разных окружений

### 3. Development настройка 🛠
- Vite dev сервер на `worldpublicsummit.test:5173`
- Поддержка локального домена
- Hot Module Reload для быстрой разработки
- Сертификаты для HTTPS (опционально)

### 4. Production deployment 🚀
- Фронтенд собирается в `dist/` папку
- Nginx конфиг для обслуживания React приложения
- Proxy для API запросов на Laravel бэкенд
- Кэширование статических файлов (7 дней)
- CORS настройка

## 📁 Основные файлы

| Файл | Назначение |
|------|-----------|
| `src/app/routes.tsx` | Определение всех 18 маршрутов |
| `src/app/App.tsx` | Главный компонент с useRoutes |
| `src/hooks/useApi.ts` | Hook для работы с API |
| `vite.config.ts` | Конфигурация Vite |
| `.env.development` | Dev переменные окружения |
| `.env.production` | Prod переменные окружения |
| `/opt/homebrew/etc/nginx/sites-available/worldpublicsummit.test.conf` | Nginx конфиг |

## 🚀 Быстрый старт (5 минут)

### Development

```bash
# 1. Убедитесь что в /etc/hosts добавлен домен
echo "127.0.0.1 worldpublicsummit.test" | sudo tee -a /etc/hosts

# 2. Запустите dev сервер
npm run dev

# 3. Откройте в браузере
# http://worldpublicsummit.test:5173
```

### Production

```bash
# 1. Собрать фронтенд
npm run build

# 2. Проверить Nginx
sudo nginx -t

# 3. Перезагрузить Nginx
sudo nginx -s reload

# 4. Запустить Laravel (в отдельном терминале)
cd ../wps-laravel && php artisan serve --port=8000

# 5. Открыть в браузере
# https://worldpublicsummit.test
```

## 📚 Документация

### Быстрые справочники
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Все команды на одной странице
- **[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** - Чек-лист перед production

### Детальные инструкции
- **[NGINX_SETUP.md](./NGINX_SETUP.md)** - Как работает Nginx, что было изменено
- **[ROUTER_SETUP.md](./ROUTER_SETUP.md)** - React Router конфигурация
- **[API_CONFIG.md](./API_CONFIG.md)** - API конфигурация и использование
- **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** - Весь процесс deployment'а

### Архитектура
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Визуальная схема, data flow, структура
- **[DOMAIN_SETUP.md](./DOMAIN_SETUP.md)** - Настройка локального домена

## 🏗 Архитектура

```
┌─────────────────────────────────────────────────────┐
│  Browser (https://worldpublicsummit.test)          │
└─────────────────────┬───────────────────────────────┘
                      │ HTTPS
                      ▼
┌─────────────────────────────────────────────────────┐
│  Nginx (443)                                        │
├─────────────────────────────────────────────────────┤
│  ├─ /           → dist/index.html (React)           │
│  ├─ /assets/*   → dist/assets/* (cached 7 days)     │
│  └─ /api/*      → http://localhost:8000 (proxy)     │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP
                      ▼
┌─────────────────────────────────────────────────────┐
│  Laravel API (Port 8000)                            │
└─────────────────────────────────────────────────────┘
```

## 🛣 Маршруты

Приложение имеет 18 основных маршрутов:

```
/ → Home
/about → About (с подменю)
  /mission → Mission
  /org-committee → Org Committee
  /organizers → Organizers
/program → Program
  /event/:id → Event Details
/news/:id → News Details
/participants → Participants
/partners → Partners
/award → Award
/grants-competition → Grants
/leadership-competition → Leadership
/press-center → Press Center
/photo-gallery → Gallery
/venue → Venue
/contacts → Contacts
/mobile-app → Mobile App
```

## 🔌 API использование

```typescript
import { useApi } from '@/hooks/useApi';

const { get, post, put, delete: delete_ } = useApi();

// GET запрос
const events = await get('/api/events');

// POST запрос
const newEvent = await post('/api/events', {
  title: 'New Event',
  date: '2025-12-22'
});

// PUT запрос
await put('/api/events/1', { title: 'Updated' });

// DELETE запрос
await delete_('/api/events/1');
```

## ✨ Технологический стек

- **React 18.3.1** - UI фреймворк
- **React Router 7.11.0** - Маршрутизация
- **Vite 6.3.5** - Build инструмент
- **TypeScript** - Типизация
- **Tailwind CSS 4.1** - Стили
- **Radix UI** - UI компоненты
- **Nginx** - Web сервер и proxy
- **Laravel** - REST API бэкенд

## 🔍 Проверка работы

```bash
# Проверить фронтенд
curl -I https://worldpublicsummit.test
# HTTP/2 200

# Проверить API
curl https://worldpublicsummit.test/api/events
# Должны быть данные от Laravel

# Проверить что Nginx запущен
ps aux | grep nginx

# Проверить что Laravel запущен
ps aux | grep artisan
```

## 🐛 Решение проблем

### Ошибка 502 Bad Gateway
- Убедитесь что Laravel запущен: `php artisan serve --port=8000`
- Проверьте логи: `tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log`

### Ошибка 404 на маршрутах
- Убедитесь что `dist/` папка существует
- Проверьте что Nginx конфиг имеет `try_files $uri $uri/ /index.html`

### API не работает
- Проверьте браузер console (F12)
- Убедитесь что Laravel запущен на порту 8000
- Проверьте CORS настройки на Laravel

### Домен не разрешается
- Добавьте в `/etc/hosts`: `127.0.0.1 worldpublicsummit.test`
- Очистите DNS кэш

## 📊 Версии

```
React: 18.3.1
React Router: 7.11.0
Vite: 6.3.5
TypeScript: latest
Tailwind: 4.1.12
Nginx: (текущая версия)
PHP: 8.3
```

## 🎯 Следующие шаги

1. ✅ Разработать компоненты
2. ✅ Добавить маршруты
3. ✅ Интегрировать API
4. ✅ Настроить production
5. ⏳ Оптимизировать производительность
6. ⏳ Добавить тесты
7. ⏳ Настроить CI/CD

## 📞 Быстрые команды

```bash
# Development
npm run dev

# Production build
npm run build

# Проверить Nginx
sudo nginx -t

# Перезагрузить Nginx
sudo nginx -s reload

# Логи ошибок
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log

# Статус сервисов
ps aux | grep -E "nginx|artisan|vite"
```

## 📖 Структура документации

```
├── QUICK_REFERENCE.md           ← Все команды (начните отсюда)
├── PRODUCTION_CHECKLIST.md      ← Чек-лист перед production
├── NGINX_SETUP.md               ← Nginx конфиг
├── ROUTER_SETUP.md              ← React Router
├── API_CONFIG.md                ← API конфигурация
├── DEPLOYMENT_SUMMARY.md        ← Весь процесс
├── ARCHITECTURE.md              ← Архитектура системы
├── DOMAIN_SETUP.md              ← Настройка домена
└── README_FINAL.md              ← Этот файл
```

## 🎉 Готово!

Приложение полностью готово к разработке и deployment'у.

Начните с [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) для быстрого доступа ко всем командам, или с [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) если готовы к production развёртыванию.

**Happy coding! 🚀**
