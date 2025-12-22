# Быстрая настройка API URL

## Самый быстрый способ

### Шаг 1: Скопируйте файл конфигурации
```bash
cp .env.example .env.development
```

### Шаг 2: Отредактируйте URL (если нужно)
```bash
# Откройте .env.development и измените VITE_API_URL если нужно
# По умолчанию: http://localhost:8000
```

### Шаг 3: Запустите
```bash
npm run dev
```

## Где что находится

| Что | Где | Для чего |
|-----|-----|---------|
| Конфигурация API | `.env.development` | Dev режим |
| Конфигурация для prod | `.env.production` | Production сборка |
| Пример конфигурации | `.env.example` | Шаблон |
| Vite proxy настройки | `vite.config.ts` | Перенаправление запросов |
| Hook для API | `src/hooks/useApi.ts` | Использование в компонентах |

## Примеры URL для разных случаев

```env
# Локальный бэкенд на порту 8000
VITE_API_URL=http://localhost:8000

# Локальный бэкенд на другом порту
VITE_API_URL=http://localhost:3000

# Локальная сеть (для тестирования на других устройствах)
VITE_API_URL=http://192.168.1.10:8000

# Production сервер
VITE_API_URL=https://api.example.com

# Staging
VITE_API_URL=https://staging-api.example.com
```

## Использование в коде

```typescript
import { useApi } from '@/hooks/useApi';

function MyComponent() {
  const { get, post } = useApi();

  // GET запрос
  const data = await get('/api/events');

  // POST запрос
  const result = await post('/api/events', {
    title: 'New Event',
  });
}
```

## Окончательно готово?

- ✅ React Router установлен и работает
- ✅ API URL можно настраивать через `.env` файлы
- ✅ Proxy настроен для обхода CORS в dev режиме
- ✅ Hook `useApi` готов к использованию

Подробно см:
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Полное руководство
- [API_CONFIG.md](./API_CONFIG.md) - Детальная конфигурация
- [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) - Интеграция с Laravel
