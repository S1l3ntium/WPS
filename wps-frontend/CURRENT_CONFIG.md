# Текущая конфигурация

## API URL

**Основной API сервер**: `https://worldpublicsummit.test`

Эта конфигурация установлена во всех файлах:
- `.env.development` - для локальной разработки
- `.env.production` - для production сборки
- `vite.config.ts` - default значение для proxy

## Как фронтенд обращается к API

### Dev режим (npm run dev)

```
Фронтенд (http://localhost:5175)
  ↓
Запрос к /api/events
  ↓
Vite proxy перенаправляет на:
https://worldpublicsummit.test/events
  ↓
Бэкенд ответ
```

### Production режим (npm run build)

```
Фронтенд (https://worldpublicsummit.test)
  ↓
Запрос к https://worldpublicsummit.test/api/events
  ↓
Бэкенд ответ
```

## Примеры API запросов

### Из компонентов React

```typescript
import { useApi } from '@/hooks/useApi';

const { get, post } = useApi();

// GET запрос
const events = await get('/api/events');

// POST запрос
const newEvent = await post('/api/events', {
  title: 'New Event',
  date: '2025-12-22'
});
```

### Curl примеры

```bash
# Через proxy dev сервера
curl http://localhost:5175/api/events

# Напрямую на бэкенд
curl https://worldpublicsummit.test/api/events
```

## Если нужно изменить URL

Отредактируйте:
1. `.env.development` - для dev режима
2. `.env.production` - для production
3. `vite.config.ts` - default значение

Затем перезагрузите сервер:
```bash
npm run dev
```

## CORS и SSL

Так как используется HTTPS, убедитесь что:

1. **Бэкенд правильно настроен для CORS**:
```php
// config/cors.php
'allowed_origins' => [
    'https://worldpublicsummit.test',
    'http://localhost:5175',
    'http://localhost:5174',
    'http://localhost:5173',
],
```

2. **SSL сертификаты действительны** (для worldpublicsummit.test)

3. **Если используется самоподписанный сертификат**, может потребоваться:
```bash
# В .env.development добавить
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## Текущая версия

- Node.js: 18+
- React: 18.3.1
- React Router: 7.11.0
- Vite: 6.3.5

## Ссылки на документацию

- [API_SETUP_QUICK.md](./API_SETUP_QUICK.md) - Быстрый старт
- [API_CONFIG.md](./API_CONFIG.md) - Детальная конфигурация
- [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) - Интеграция с бэкендом
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Полное руководство
