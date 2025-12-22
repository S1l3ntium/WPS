# Резюме развёртывания фронтенда

## 📋 Что было сделано

### 1. React Router интеграция
- ✅ Добавлена полная маршрутизация с поддержкой back/forward
- ✅ Параметризованные маршруты для EventPage и NewsPage
- ✅ 18 основных маршрутов приложения

### 2. API интеграция
- ✅ Конфигурация для подключения к `https://worldpublicsummit.test`
- ✅ Hook `useApi` для простого использования API
- ✅ Proxy настройка для dev режима
- ✅ Поддержка CORS

### 3. Локальная разработка
- ✅ Конфигурация для домена `worldpublicsummit.test`
- ✅ Поддержка HTTP на порту 5173 и HTTPS на порту 443
- ✅ Переменные окружения для SSL сертификатов

### 4. Production development
- ✅ Фронтенд собран в папку `dist/`
- ✅ Nginx конфиг для обслуживания фронтенда
- ✅ Proxy для API запросов на Laravel
- ✅ React Router поддержка через index.html перенаправление
- ✅ Кэширование статических файлов

## 🚀 Быстрый старт

### 1. Сборка фронтенда

```bash
cd wps-frontend
npm run build
```

Файлы будут в папке `dist/`.

### 2. Проверка Nginx конфига

```bash
sudo nginx -t
```

Должно быть: `configuration will be successful`

### 3. Перезагрузка Nginx

```bash
sudo nginx -s reload
```

### 4. Запуск Laravel бэкенда

```bash
cd wps-laravel
php artisan serve --port=8000
```

### 5. Открыть в браузере

```
https://worldpublicsummit.test
```

## 📁 Структура файлов

```
wps-frontend/
├── src/
│   ├── app/
│   │   ├── routes.tsx          # 18 маршрутов приложения
│   │   ├── App.tsx             # Главный компонент с useRoutes
│   │   └── components/         # 17 page компонентов
│   ├── hooks/
│   │   └── useApi.ts           # Hook для работы с API
│   └── main.tsx
├── dist/                        # Production build (собирается npm run build)
├── vite.config.ts              # Конфиг Vite с proxy и SSL
├── .env.development            # Dev переменные окружения
├── .env.production             # Production переменные окружения
└── package.json
```

## 🔧 Конфигурация

### vite.config.ts
```typescript
server: {
  host: 'worldpublicsummit.test',
  port: 5173,  // или 443 если есть SSL сертификаты
  proxy: {
    '/api': {
      target: 'https://worldpublicsummit.test',
      // ...
    }
  }
}
```

### Nginx config
```nginx
root "/Volumes/ADATA LEGEND 900/Work/WPS/wps-frontend/dist";

location /api/ {
    proxy_pass http://127.0.0.1:8000;  # Laravel на порту 8000
}

location / {
    try_files $uri $uri/ /index.html;  # React Router
}
```

## 📊 Маршруты приложения

| URL | Компонент |
|-----|-----------|
| `/` | HomePage |
| `/partners` | PartnersPage |
| `/program` | ProgramPage |
| `/event/:eventId` | EventPage |
| `/participants` | ParticipantsPage |
| `/award` | AwardPage |
| `/grants-competition` | GrantsCompetitionPage |
| `/leadership-competition` | LeadershipCompetitionPage |
| `/press-center` | PressCenterPage |
| `/news/:newsId` | NewsPage |
| `/photo-gallery` | PhotoGalleryPage |
| `/venue` | VenuePage |
| `/contacts` | ContactsPage |
| `/about` | AboutPage |
| `/mission` | MissionPage |
| `/org-committee` | OrgCommitteePage |
| `/organizers` | OrganizersPage |
| `/mobile-app` | MobileAppPage |

## 💻 API использование

### В компонентах

```typescript
import { useApi } from '@/hooks/useApi';

const { get, post, put, delete: delete_ } = useApi();

// GET
const data = await get('/api/events');

// POST
const result = await post('/api/events', { title: 'New' });

// PUT
await put('/api/events/1', { title: 'Updated' });

// DELETE
await delete_('/api/events/1');
```

## 📚 Документация

- `NGINX_SETUP.md` - Детальная настройка Nginx
- `ROUTER_SETUP.md` - React Router конфигурация
- `API_CONFIG.md` - API конфигурация
- `DOMAIN_SETUP.md` - Настройка локального домена
- `LOCAL_DOMAIN_SETUP.md` - Полная инструкция по доменам
- `CURRENT_CONFIG.md` - Текущие настройки

## ✅ Чек-лист перед production

- [ ] Фронтенд собран (`npm run build`)
- [ ] Nginx конфиг проверен (`sudo nginx -t`)
- [ ] Nginx перезагружен (`sudo nginx -s reload`)
- [ ] Laravel запущен на порту 8000
- [ ] Доменное имя `worldpublicsummit.test` добавлено в `/etc/hosts`
- [ ] SSL сертификаты в наличии
- [ ] CORS настроены на Laravel
- [ ] Логи Nginx проверены (нет ошибок)

## 🔍 Проверка работы

### 1. Проверить фронтенд

```bash
curl -I https://worldpublicsummit.test
# Должно быть: HTTP/2 200
```

### 2. Проверить API

```bash
curl https://worldpublicsummit.test/api/events
# Должны быть данные от Laravel
```

### 3. Проверить React Router

Открыть несколько страниц, проверить что `back/forward` кнопки работают.

### 4. Проверить логи

```bash
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log
```

## 🐛 Решение проблем

### Ошибка 502 Bad Gateway
- Убедитесь что Laravel запущен на порту 8000
- Проверьте логи: `tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log`

### Ошибка 404 на маршрутах
- Проверьте что React Router конфиг правильный
- Проверьте что `try_files $uri $uri/ /index.html;` в Nginx

### API не работает
- Проверьте CORS настройки на Laravel
- Проверьте что `/api/` location правильно настроен в Nginx
- Смотрите логи в браузере (F12 → Console)

## 📦 Production deployment

1. Собрать фронтенд: `npm run build`
2. Проверить Nginx: `sudo nginx -t`
3. Перезагрузить Nginx: `sudo nginx -s reload`
4. Убедиться что Laravel запущен
5. Проверить в браузере: `https://worldpublicsummit.test`

## 🎯 Следующие шаги

1. Настроить мониторинг логов Nginx
2. Настроить логирование ошибок приложения
3. Добавить e2e тесты для маршрутов
4. Добавить сжатие (gzip) для статических файлов
5. Настроить CDN для кэширования статики

## Контакты и вопросы

Документация находится в:
- `/Volumes/ADATA LEGEND 900/Work/WPS/wps-frontend/`

Основные файлы конфигурации:
- `vite.config.ts` - Vite конфиг
- `.env.development` / `.env.production` - Переменные окружения
- `/opt/homebrew/etc/nginx/sites-available/worldpublicsummit.test.conf` - Nginx конфиг
