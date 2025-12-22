# Отладка API

## Проблема

API запросы не работали, потому что в `.env` был неправильный URL:
```
VITE_API_URL=https://worldpublicsummit.test/api  ❌ (НЕПРАВИЛЬНО)
```

Когда вызывается `get('/api/events')`, получалось:
```
https://worldpublicsummit.test/api + /api/events = https://worldpublicsummit.test/api/api/events  ❌
```

## Решение

Исправлен `.env`:
```
VITE_API_URL=https://worldpublicsummit.test  ✅ (ПРАВИЛЬНО)
```

Теперь правильно:
```
https://worldpublicsummit.test + /api/events = https://worldpublicsummit.test/api/events  ✅
```

## Как это работает

### В production (Nginx)

```
Browser запрос:
GET https://worldpublicsummit.test/api/events

↓ Nginx proxy:
GET http://127.0.0.1:8000/events

↓ Laravel:
API обрабатывает запрос и возвращает данные
```

Вот почему в Nginx конфиге в `location /api/` есть `rewrite`:
```nginx
rewrite (path) => path.replace(/^\/api/, ''),
```

Это удаляет `/api` перед тем как отправить на Laravel.

### В development (Vite proxy)

```
Browser запрос:
GET http://localhost:5173/api/events

↓ Vite proxy:
GET https://worldpublicsummit.test/api/events

↓ Nginx:
GET http://127.0.0.1:8000/events

↓ Laravel:
Возвращает данные
```

## Что нужно сделать

### 1. Перезагрузить Nginx

```bash
sudo nginx -s reload
```

### 2. Пересобрать фронтенд (УЖЕ СДЕЛАНО)

```bash
npm run build
```

### 3. Проверить что работает

```bash
# В браузере открыть консоль (F12)
# Перейти на другую страницу
# В Network вкладке должны быть запросы к /api/*

# Или через curl
curl https://worldpublicsummit.test/api/events
```

## Проверка логов

```bash
# Смотрите логи Nginx
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log

# Должны видеть запросы вроде:
# GET /api/events HTTP/2.0
```

## Если всё ещё не работает

1. **Убедитесь что Nginx перезагружен**
   ```bash
   sudo nginx -s reload
   ```

2. **Убедитесь что фронтенд пересобран**
   ```bash
   npm run build
   ```

3. **Очистить браузер кэш**
   - F12 → Application → Clear Storage → Clear All

4. **Проверить что Laravel запущен**
   ```bash
   ps aux | grep artisan
   curl http://localhost:8000/api/events
   ```

5. **Смотреть Network tab в браузере**
   - F12 → Network → Filter by /api
   - Проверить Request URL
   - Проверить Status (должен быть 200, не 502 или 404)
   - Проверить Response (должны быть данные)

## Правильные пути для API

```
Development:
GET http://localhost:5173/api/events    (через Vite proxy)
→ https://worldpublicsummit.test/api/events
→ http://127.0.0.1:8000/events (Laravel)

Production:
GET https://worldpublicsummit.test/api/events
→ http://127.0.0.1:8000/events (Laravel через Nginx proxy)
```

## useApi Hook использование

```typescript
// ПРАВИЛЬНО:
get('/api/events')
get('/api/news/123')
post('/api/events', data)

// НЕПРАВИЛЬНО:
get('events')           // Забыли /api/
get('/events')          // Забыли /api/
get('/api/api/events')  // Двойной /api/
```

## Переменные окружения

```bash
# .env (используется везде)
VITE_API_URL=https://worldpublicsummit.test

# .env.development (dev режим)
VITE_API_URL=https://worldpublicsummit.test

# .env.production (production)
VITE_API_URL=https://worldpublicsummit.test

# Все одинаковые!
```

## Debug вывод

Для отладки можно добавить console.log в useApi.ts:

```typescript
const fetchData = async (endpoint: string, options?: RequestInit) => {
  const url = `${apiUrl}${endpoint}`;
  console.log('API Request:', url, options?.method || 'GET');  // Добавить это

  try {
    const response = await fetch(url, { /* ... */ });
    console.log('API Response:', response.status);  // Добавить это
    // ...
  }
};
```

Тогда в консоли браузера увидите:
```
API Request: https://worldpublicsummit.test/api/events GET
API Response: 200
```

## Итого

✅ Исправлен `.env` с `VITE_API_URL`
✅ Пересобран фронтенд (`npm run build`)
⏳ Нужно перезагрузить Nginx (`sudo nginx -s reload`)
⏳ Проверить что API работает в браузере

Как только перезагрузите Nginx - API должен работать! 🚀
