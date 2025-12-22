# Интеграция с Laravel бэкендом

## Конфигурация CORS на Laravel бэкенде

Для того чтобы фронтенд мог обращаться к API, необходимо правильно настроить CORS на бэкенде.

### 1. Обновите `config/cors.php`

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://192.168.1.*',  // Для локальной сети
        'https://example.com', // Production URL
    ],

    'allowed_origins_patterns' => [
        '/localhost:\d+/',
        '/192\.168\.\d+\.\d+:\d+/',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [
        'Authorization',
        'X-Total-Count',
        'X-Page-Count',
    ],

    'max_age' => 0,

    'supports_credentials' => true,
];
```

### 2. Включите CORS middleware в `app/Http/Kernel.php`

```php
protected $middleware = [
    // ...
    \Illuminate\Http\Middleware\HandleCors::class,
];

protected $middlewareGroups = [
    'api' => [
        \Illuminate\Http\Middleware\HandleCors::class,
        // ... остальные middleware
    ],
];
```

### 3. Установите пакет для CORS (если нужен дополнительный функционал)

```bash
composer require fruitcake/laravel-cors
```

## Настройка API endpoints

### Структура API

```
GET    /api/events              # Список событий
GET    /api/events/:id          # Одно событие
POST   /api/events              # Создание события
PUT    /api/events/:id          # Обновление события
DELETE /api/events/:id          # Удаление события

GET    /api/news                # Список новостей
GET    /api/news/:id            # Одна новость
POST   /api/news                # Создание новости
PUT    /api/news/:id            # Обновление новости
DELETE /api/news/:id            # Удаление новости

GET    /api/partners            # Список партнеров
GET    /api/participants        # Список участников
GET    /api/awards              # Список наград
```

### Пример контроллера

```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Event;
use Illuminate\Http\JsonResponse;

class EventController
{
    public function index(): JsonResponse
    {
        return response()->json(
            Event::paginate(15)
        );
    }

    public function show(Event $event): JsonResponse
    {
        return response()->json($event);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'date' => 'required|date',
            // ... другие поля
        ]);

        $event = Event::create($validated);

        return response()->json($event, 201);
    }

    public function update(Request $request, Event $event): JsonResponse
    {
        $event->update($request->validated());
        return response()->json($event);
    }

    public function destroy(Event $event): JsonResponse
    {
        $event->delete();
        return response()->json(null, 204);
    }
}
```

### Пример маршрутов в `routes/api.php`

```php
<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\PartnerController;
use Illuminate\Support\Facades\Route;

Route::apiResources([
    'events' => EventController::class,
    'news' => NewsController::class,
    'partners' => PartnerController::class,
]);
```

## Запуск бэкенда

### 1. Установите зависимости

```bash
cd wps-laravel
composer install
```

### 2. Создайте `.env` файл

```bash
cp .env.example .env
php artisan key:generate
```

### 3. Запустите миграции

```bash
php artisan migrate
```

### 4. Запустите сервер

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

Сервер будет доступен на `http://localhost:8000`

## Использование API из фронтенда

### Простой пример

```typescript
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
}

export function EventsList() {
  const { get } = useApi();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const response = await get('/api/events');
        setEvents(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
}
```

## Отладка

### Проверка CORS запросов

В браузере (DevTools → Network):
1. Найдите OPTIONS запрос перед вашим запросом
2. В Response Headers должны быть:
```
access-control-allow-origin: http://localhost:5174
access-control-allow-credentials: true
access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
access-control-allow-headers: *
```

### Логирование Laravel API

```bash
# Смотрите логи
tail -f storage/logs/laravel.log
```

## Примеры запросов

### Curl примеры

```bash
# Получить список событий
curl -X GET http://localhost:8000/api/events \
  -H "Accept: application/json"

# Создать событие
curl -X POST http://localhost:8000/api/events \
  -H "Content-Type: application/json" \
  -d '{"title":"New Event","date":"2025-12-22"}'

# Обновить событие
curl -X PUT http://localhost:8000/api/events/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Event"}'

# Удалить событие
curl -X DELETE http://localhost:8000/api/events/1
```

### Insomnia / Postman примеры

1. Импортируйте коллекцию из `/postman/` папки
2. Обновите URL на ваш бэкенд URL
3. Тестируйте endpoints

## Проблемы и решения

### CORS ошибка: "Access to XMLHttpRequest blocked"

**Проблема**: Бэкенд не возвращает правильные CORS заголовки

**Решение**:
1. Убедитесь что CORS middleware включен в `Kernel.php`
2. Проверьте `config/cors.php` - ваш фронтенд URL должен быть в `allowed_origins`
3. Перезагрузите сервер Laravel

### 404 на /api endpoints

**Проблема**: API маршруты не определены

**Решение**:
1. Проверьте `routes/api.php` - маршруты определены?
2. Запустите `php artisan route:list` чтобы увидеть все маршруты
3. Проверьте что контроллеры существуют

### Timeout на больших запросах

**Решение**:
```php
// Увеличьте timeout в AppServiceProvider
$query->timeout(60); // 60 секунд
```

## Безопасность

1. **Всегда валидируйте входные данные** на бэкенде
2. **Используйте Laravel validation rules**
3. **Не отправляйте sensitive данные** в открытом виде
4. **Используйте HTTPS** в production
5. **Настройте rate limiting** для API endpoints

```php
Route::middleware('throttle:60,1')->group(function () {
    Route::apiResource('events', EventController::class);
});
```
