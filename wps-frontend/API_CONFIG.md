# API Configuration

## Настройка URL API

### Файлы конфигурации

#### `.env.example`
Шаблон переменных окружения. Скопируйте его содержимое в `.env` файлы.

#### `.env.development`
Переменные для development режима (используется при `npm run dev`)
```env
VITE_API_URL=http://localhost:8000
```

#### `.env.production`
Переменные для production режима (используется при `npm run build`)
```env
VITE_API_URL=https://api.example.com
```

### Изменение URL API

#### Способ 1: Через переменные окружения (рекомендуется)

1. Отредактируйте `.env.development` для dev сервера:
```env
VITE_API_URL=http://localhost:8000
```

2. Отредактируйте `.env.production` для production сборки:
```env
VITE_API_URL=https://your-api-url.com
```

3. Перезагрузите dev сервер, чтобы изменения вступили в силу:
```bash
npm run dev
```

#### Способ 2: Через переменные окружения системы

```bash
# Linux/Mac
export VITE_API_URL=https://api.example.com
npm run dev

# Windows
set VITE_API_URL=https://api.example.com
npm run dev
```

### Использование в компонентах

#### С помощью hook `useApi`

```typescript
import { useApi } from '@/hooks/useApi';

export function MyComponent() {
  const { get, post } = useApi();

  const loadData = async () => {
    try {
      const data = await get('/api/endpoint');
      console.log(data);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const sendData = async () => {
    try {
      const response = await post('/api/endpoint', {
        name: 'value',
      });
      console.log(response);
    } catch (error) {
      console.error('Failed to send data:', error);
    }
  };

  return (
    <div>
      <button onClick={loadData}>Load Data</button>
      <button onClick={sendData}>Send Data</button>
    </div>
  );
}
```

### Технические детали

#### Development режим (npm run dev)

В режиме разработки используется **proxy** через Vite:
- Фронтенд слушает на `http://localhost:5174`
- Запросы к `/api/*` перенаправляются на `VITE_API_URL`
- Это решает проблему CORS для локальной разработки

Пример:
```
Фронтенд запрос: http://localhost:5174/api/events
↓
Vite proxy
↓
Бэкенд запрос: http://localhost:8000/events
```

#### Production режим (npm run build)

В production используется обычный fetch с полным URL:
```
Фронтенд запрос: https://example.com/events
↓
Бэкенд ответ
```

### Конфигурация в vite.config.ts

```typescript
server: {
  proxy: {
    '/api': {
      target: process.env.VITE_API_URL || 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

Этот конфиг говорит Vite:
- Перехватывать все запросы к `/api`
- Перенаправлять их на `VITE_API_URL` (из переменных окружения)
- Удалять `/api` из URL перед отправкой на бэкенд
- Устанавливать `changeOrigin: true` для обработки CORS

### Решение проблем

#### CORS ошибки

Если получаете CORS ошибки:

1. **В development**: Убедитесь, что proxy правильно настроен в `vite.config.ts`
2. **В production**: Убедитесь, что бэкенд правильно настроен для CORS

#### API не отвечает

```bash
# Проверьте, что бэкенд запущен
curl http://localhost:8000/health

# Проверьте переменные окружения
npm run dev -- --debug

# Проверьте что URL правильный в консоли браузера
console.log(import.meta.env.VITE_API_URL)
```

### Best Practices

1. **Никогда не коммитьте реальные URL в `.env.development`** - используйте localhost
2. **Используйте `.env.example`** как шаблон и добавьте его в `.gitignore`
3. **Разные URL для разных окружений** - используйте `.env.production` для prod URL
4. **Всегда проверяйте ошибки** - обрабатывайте ошибки API в компонентах
