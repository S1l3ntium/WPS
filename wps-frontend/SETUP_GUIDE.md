# Руководство по настройке wps-frontend

## Быстрый старт

### 1. Установка зависимостей
```bash
cd wps-frontend
npm install
```

### 2. Настройка API URL

Скопируйте файл примера:
```bash
cp .env.example .env.development
```

Отредактируйте `.env.development` и установите URL вашего API:
```env
VITE_API_URL=http://localhost:8000
```

Или если используете другой порт/хост:
```env
VITE_API_URL=http://192.168.1.100:8000
VITE_API_URL=https://api.example.com
```

### 3. Запуск в режиме разработки
```bash
npm run dev
```

Приложение откроется на `http://localhost:5174`

### 4. Сборка для production
```bash
npm run build
```

Обновите `.env.production` с реальным API URL перед сборкой.

## Структура файлов

```
wps-frontend/
├── src/
│   ├── app/
│   │   ├── components/     # React компоненты
│   │   ├── routes.tsx      # Определение маршрутов
│   │   └── App.tsx         # Главный компонент
│   ├── hooks/
│   │   └── useApi.ts       # Hook для работы с API
│   ├── styles/
│   └── main.tsx            # Entry point
├── vite.config.ts          # Конфигурация Vite + proxy для API
├── .env.example            # Шаблон переменных окружения
├── .env.development        # Переменные для разработки
├── .env.production         # Переменные для production
├── package.json
└── README.md
```

## Документация

- **[ROUTER_SETUP.md](./ROUTER_SETUP.md)** - Настройка React Router и маршрутизации
- **[API_CONFIG.md](./API_CONFIG.md)** - Полная документация по конфигурации API

## Возможные проблемы

### Dev сервер не запускается

```bash
# Очистить node_modules и переустановить
rm -rf node_modules
npm install
npm run dev
```

### Порт 5173 занят

Dev сервер автоматически выберет следующий порт (5174, 5175 и т.д.)

### API запросы не работают

1. Проверьте что `.env.development` содержит правильный URL API
2. Убедитесь что API сервер запущен и слушает на указанном адресе
3. Проверьте консоль браузера (F12) на наличие CORS ошибок

## Использование API в компонентах

```typescript
import { useApi } from '@/hooks/useApi';

export function MyComponent() {
  const { get, post } = useApi();

  useEffect(() => {
    get('/api/events').then(data => {
      console.log(data);
    });
  }, []);

  return <div>Your component</div>;
}
```

Подробно см. [API_CONFIG.md](./API_CONFIG.md)

## Команды

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Просмотр собранного проекта
npm preview
```

## Требования

- Node.js 18+
- npm 9+ или pnpm

## Стек технологий

- React 18
- React Router 7
- Vite 6
- TypeScript
- Tailwind CSS
- Radix UI компоненты

## Дополнительно

### React Router

Приложение использует полноценную маршрутизацию с поддержкой:
- История браузера (back/forward)
- Direct URL навигация
- Параметризованные маршруты

### Proxy для API

В режиме разработки используется Vite proxy для решения CORS проблем:
- Запросы к `/api/*` перенаправляются на `VITE_API_URL`
- Автоматическая подстановка правильных headers
