# Миграция с Blade шаблонов на React фронтенд

## Обзор архитектуры

Проект будет разделён на две части:

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend (SPA)                     │
│                 (Separate Node.js project)                   │
│  - Vite (build tool & dev server)                            │
│  - React 18+ с hooks                                         │
│  - React Router для навигации                                │
│  - Fetch/Axios для API запросов к Laravel                    │
└─────────────────────────────────────────────────────────────┘
                              ↓↑ (HTTP REST API)
┌─────────────────────────────────────────────────────────────┐
│                  Laravel Backend + MoonShine Admin            │
│                    (Существующий проект)                     │
│  - API endpoints (JSON responses)                            │
│  - MoonShine админ-панель (остаётся на Blade)               │
│  - Валидация, авторизация, бизнес-логика                    │
│  - Кеширование, дополнительная обработка                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Фаза 1: Подготовка Laravel Backend

### 1.1 Преобразование маршрутов в API endpoints

**Текущая структура (Blade):**
```php
// routes/web.php
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{news}', [NewsController::class, 'show'])->name('news.show');
```

**Новая структура (REST API):**
```php
// routes/api.php
Route::prefix('api')->group(function () {
    // Новостная лента
    Route::get('/news', [NewsController::class, 'apiIndex']);
    Route::get('/news/{news}', [NewsController::class, 'apiShow']);

    // События/программа
    Route::get('/events', [EventController::class, 'apiIndex']);
    Route::get('/events/{event}', [EventController::class, 'apiShow']);

    // Партнеры
    Route::get('/partners', [PartnerController::class, 'apiIndex']);

    // Награды
    Route::get('/awards', [AwardController::class, 'apiIndex']);
    Route::get('/awards/{award}', [AwardController::class, 'apiShow']);
});

// Web маршруты остаются для админ-панели и других нужд
Route::get('/moonshine', [...]);
```

### 1.2 Создание API Resources

Преобразуйте модели в JSON ресурсы для API:

```bash
php artisan make:resource NewsResource
php artisan make:resource EventResource
php artisan make:resource PartnerResource
php artisan make:resource AwardResource
php artisan make:resource NewsCollection
php artisan make:resource EventCollection
```

**Пример NewsResource:**
```php
// app/Http/Resources/NewsResource.php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->getLocalizedAttribute('title'),
            'excerpt' => $this->getLocalizedAttribute('excerpt'),
            'content' => $this->getLocalizedAttribute('content'),
            'image' => $this->image ? url($this->image) : null,
            'published_at' => $this->published_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
            'views_count' => $this->views_count,
            'slug' => $this->id, // или используйте настоящий slug если есть
        ];
    }
}
```

**Пример NewsCollection:**
```php
// app/Http/Resources/NewsCollection.php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class NewsCollection extends ResourceCollection
{
    public $collects = NewsResource::class;

    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
            'links' => [
                'first' => $this->url(1),
                'last' => $this->url($this->lastPage()),
                'prev' => $this->previousPageUrl(),
                'next' => $this->nextPageUrl(),
            ],
            'meta' => [
                'current_page' => $this->currentPage(),
                'from' => $this->firstItem(),
                'last_page' => $this->lastPage(),
                'per_page' => $this->perPage(),
                'to' => $this->lastItem(),
                'total' => $this->total(),
            ],
        ];
    }
}
```

### 1.3 Обновление контроллеров для API

```php
// app/Http/Controllers/NewsController.php
<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Http\Resources\NewsResource;
use App\Models\News;

class NewsController extends Controller
{
    /**
     * JSON API для React фронтенда
     */
    public function apiIndex()
    {
        $news = News::published()
            ->latest('published_at')
            ->paginate(12);

        return new NewsCollection($news);
    }

    public function apiShow(News $news)
    {
        if (!$news->published_at || $news->published_at->isFuture()) {
            return response()->json([
                'error' => 'News not found'
            ], 404);
        }

        // Увеличить счётчик просмотров
        $news->increment('views_count');

        return new NewsResource($news);
    }

    /**
     * Blade шаблоны (если оставляете)
     */
    public function index()
    {
        // ...
    }

    public function show(News $news)
    {
        // ...
    }
}
```

### 1.4 CORS конфигурация

Настройте CORS для того, чтобы React фронтенд (на другом домене/порте) мог запрашивать API:

```php
// config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'localhost:3000',      // Разработка
        'localhost:5173',      // Vite dev server
        'yourdomain.com',      // Production
        'www.yourdomain.com',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

```php
// app/Http/Middleware/HandleCors.php
// или используйте fruitcake/laravel-cors пакет
```

### 1.5 Response Format Стандартизация

Создайте базовый API response формат:

```php
// app/Traits/ApiResponse.php
<?php

namespace App\Traits;

trait ApiResponse
{
    protected function success($data = null, $message = '', $code = 200)
    {
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => $message,
        ], $code);
    }

    protected function error($message = '', $errors = [], $code = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $code);
    }
}
```

---

## Фаза 2: Создание React фронтенда

### 2.1 Инициализация проекта

```bash
# Создайте папку для React проекта на том же уровне или отдельно
mkdir wps-frontend
cd wps-frontend

# Используйте create-vite для React
npm create vite@latest . -- --template react

# Или используйте более полный шаблон
npm create vite@latest . -- --template react-ts
```

### 2.2 Структура проекта

```
wps-frontend/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   ├── Pages/
│   │   │   ├── Home.jsx
│   │   │   ├── News/
│   │   │   │   ├── NewsList.jsx
│   │   │   │   └── NewsDetail.jsx
│   │   │   ├── Program/
│   │   │   │   ├── EventsList.jsx
│   │   │   │   └── EventDetail.jsx
│   │   │   ├── Partners.jsx
│   │   │   ├── Awards.jsx
│   │   │   └── About.jsx
│   │   └── Common/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── Loading.jsx
│   ├── hooks/
│   │   ├── useFetch.js
│   │   └── useLocale.js
│   ├── services/
│   │   ├── api.js
│   │   ├── news.js
│   │   ├── events.js
│   │   └── partners.js
│   ├── context/
│   │   └── LocaleContext.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── index.html
├── vite.config.js
├── package.json
└── tailwind.config.js (опционально)
```

### 2.3 Установка зависимостей

```bash
npm install
npm install react-router-dom axios
npm install -D tailwindcss postcss autoprefixer

# Опционально для более полного setup
npm install -D typescript @types/react @types/react-dom
npm install zustand @tanstack/react-query
```

### 2.4 Конфигурация Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
```

### 2.5 API Service Layer

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавьте locale в каждый запрос
api.interceptors.request.use((config) => {
  const locale = localStorage.getItem('locale') || 'ru';
  config.params = {
    ...config.params,
    locale,
  };
  return config;
});

export default api;
```

```javascript
// src/services/news.js
import api from './api';

export const newsService = {
  getList: (page = 1, perPage = 12) =>
    api.get('/news', { params: { page, per_page: perPage } }),

  getDetail: (id) =>
    api.get(`/news/${id}`),

  getRecent: (limit = 5) =>
    api.get('/news', { params: { limit } }),
};

export const eventsService = {
  getList: (page = 1) =>
    api.get('/events', { params: { page } }),

  getDetail: (id) =>
    api.get(`/events/${id}`),
};

export const partnersService = {
  getAll: () =>
    api.get('/partners'),
};

export const awardsService = {
  getList: () =>
    api.get('/awards'),

  getDetail: (id) =>
    api.get(`/awards/${id}`),
};
```

### 2.6 Custom Hooks

```javascript
// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

export const useFetch = (fetchFn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchFn();
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};
```

```javascript
// src/hooks/useLocale.js
import { useState, useCallback } from 'react';

export const useLocale = () => {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('locale') || 'ru';
  });

  const changeLocale = useCallback((newLocale) => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
  }, []);

  return [locale, changeLocale];
};
```

### 2.7 Routing

```javascript
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Pages/Home';
import NewsList from './components/Pages/News/NewsList';
import NewsDetail from './components/Pages/News/NewsDetail';
import EventsList from './components/Pages/Program/EventsList';
import EventDetail from './components/Pages/Program/EventDetail';
import Partners from './components/Pages/Partners';
import Awards from './components/Pages/Awards';
import About from './components/Pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 2.8 Пример компонента

```javascript
// src/components/Pages/News/NewsList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../../../services/news';
import Loading from '../../Common/Loading';

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const fetchNews = async (pageNum) => {
    try {
      setLoading(true);
      const response = await newsService.getList(pageNum);
      setNews(response.data.data);
      setPagination({
        current: response.data.meta.current_page,
        last: response.data.meta.last_page,
        total: response.data.meta.total,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h1 className="mb-4">Новости</h1>

      <div className="row">
        {news.map((article) => (
          <div key={article.id} className="col-lg-6 mb-4">
            <div className="card h-100">
              {article.image && (
                <img
                  src={article.image}
                  className="card-img-top"
                  alt={article.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <p className="card-text text-muted">
                  <small>{new Date(article.published_at).toLocaleDateString()}</small>
                </p>
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.excerpt}</p>
                <p className="card-text">
                  <small className="text-muted">Просмотров: {article.views_count}</small>
                </p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <Link to={`/news/${article.id}`} className="btn btn-primary btn-sm">
                  Читать полностью
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pagination && pagination.last > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {page > 1 && (
              <li className="page-item">
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  Назад
                </button>
              </li>
            )}

            {Array.from({ length: pagination.last }, (_, i) => i + 1).map((p) => (
              <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setPage(p)}>
                  {p}
                </button>
              </li>
            ))}

            {page < pagination.last && (
              <li className="page-item">
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  Далее
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
```

---

## Фаза 3: Развертывание и интеграция

### 3.1 Переменные окружения

**.env.development** (React):
```
VITE_API_URL=http://localhost:8000/api
VITE_APP_URL=http://localhost:3000
```

**.env.production** (React):
```
VITE_API_URL=https://yourdomain.com/api
VITE_APP_URL=https://yourdomain.com
```

### 3.2 Laravel конфигурация для продакшена

```php
// config/app.php
'url' => env('APP_URL', 'https://yourdomain.com'),

// config/cors.php
'allowed_origins' => [
    'yourdomain.com',
    'www.yourdomain.com',
],
```

### 3.3 Build и Deploy стратегия

#### Вариант 1: Отдельные хосты

```
Frontend:  https://app.yourdomain.com (Node.js)
Backend:   https://api.yourdomain.com (Laravel)
Admin:     https://admin.yourdomain.com/moonshine (Laravel)
```

#### Вариант 2: Один хост, разные пути

```
Frontend:  https://yourdomain.com/ (React SPA)
API:       https://yourdomain.com/api/ (Laravel API)
Admin:     https://yourdomain.com/moonshine (Laravel MoonShine)
```

#### Вариант 3: Фронтенд собирается на Laravel

```bash
# Build React
cd wps-frontend
npm run build
# Копируем dist в Laravel public/
cp -r dist/* ../public/spa/

# Laravel обслуживает React SPA
# Все остальные маршруты -> /spa/index.html для роутинга в React
```

### 3.4 Dockerfile для контейнеризации

**Dockerfile для React:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  laravel:
    build:
      context: ./wps-laravel
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - APP_URL=http://localhost:8000
      - DB_HOST=postgres
    depends_on:
      - postgres

  react:
    build:
      context: ./wps-frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:8000/api

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=wps
      - POSTGRES_USER=wps
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## Фаза 4: Постепенная миграция

### Рекомендуемый порядок:

1. **Неделя 1**: API endpoints для новостей
2. **Неделя 2**: React компоненты для новостей (NewsList, NewsDetail)
3. **Неделя 3**: API для событий + React компоненты
4. **Неделя 4**: API для партнёров и наград
5. **Неделя 5**: Остальные страницы (о компании, награды, контакты)
6. **Неделя 6**: Оптимизация, тестирование, миграция трафика

### Параллельный запуск (Blue-Green deployment):

```nginx
# nginx.conf
upstream laravel_backend {
    server laravel:8000;
}

upstream react_frontend {
    server react:3000;
}

server {
    listen 80;
    server_name yourdomain.com;

    # API маршруты -> Laravel
    location /api/ {
        proxy_pass http://laravel_backend;
    }

    # Admin панель -> Laravel
    location /moonshine {
        proxy_pass http://laravel_backend;
    }

    # Все остальное -> React
    location / {
        proxy_pass http://react_frontend;
        proxy_set_header Host $host;
    }
}
```

---

## Фаза 5: Оптимизация и особенности

### 5.1 Кеширование

```javascript
// src/hooks/useFetch.js с кешированием
const cache = new Map();

export const useFetch = (fetchFn, cacheKey, cacheTime = 5 * 60 * 1000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем кеш
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < cacheTime) {
        setData(cached.data);
        setLoading(false);
        return;
      }
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchFn();
      cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
      setData(response.data);
    } catch (err) {
      // ...
    }
  };
};
```

### 5.2 Многоязычность

```javascript
// src/context/LocaleContext.jsx
import { createContext, useState, useCallback } from 'react';

export const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(() =>
    localStorage.getItem('locale') || 'ru'
  );

  const changeLocale = useCallback((newLocale) => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
    // Перезагружаем приложение или обновляем данные
    window.location.reload();
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
```

### 5.3 SEO для SPA

```javascript
// src/components/SEO.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SEO = ({ title, description, image }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title ? `${title} - WPS` : 'WPS';

    // Meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = description || 'Default description';
    }

    // Open Graph
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', image);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', window.location.href);
  }, [title, description, image, location]);

  return null;
};

// Использование в компонентах:
// <SEO title="Новости" description="Последние новости" />
```

### 5.4 Обработка ошибок и сетевых проблем

```javascript
// src/components/ErrorBoundary.jsx
import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger">
          <h4>Что-то пошло не так</h4>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## Чек-лист миграции

- [ ] Laravel API endpoints созданы для всех ресурсов
- [ ] CORS правильно сконфигурирован
- [ ] React проект инициализирован с Vite
- [ ] Routing настроен в React
- [ ] API service layer написан
- [ ] Custom hooks созданы
- [ ] Компоненты созданы для ключевых страниц
- [ ] Многоязычность интегрирована в React
- [ ] Кеширование работает
- [ ] SEO оптимизирована
- [ ] Docker конфигурация готова
- [ ] Тестирование в development окружении
- [ ] Production build оптимизирован
- [ ] Nginx/Apache конфигурация готова
- [ ] Мониторинг и логирование настроены

---

## Полезные ссылки

- [React документация](https://react.dev)
- [React Router v7](https://reactrouter.com)
- [Vite](https://vitejs.dev)
- [Laravel API Resources](https://laravel.com/docs/eloquent-resources)
- [Axios](https://axios-http.com)
- [Bootstrap 5](https://getbootstrap.com/docs/5.0/)

---

## Вопросы и ответы

**Q: Сохраняется ли MoonShine админ-панель?**
A: Да, MoonShine админ-панель остаётся на Blade шаблонах и работает как раньше на `/moonshine`.

**Q: Как обрабатывается аутентификация?**
A: Используется Laravel Sessions или JWT токены. React приложение отправляет credentials в cookies, Laravel валидирует.

**Q: Что с локализацией контента?**
A: Laravel API возвращает уже локализованный контент через `getLocalizedAttribute()`. React выбирает язык из localStorage.

**Q: Как миграция влияет на SEO?**
A: React SPA требует SSR (Server-Side Rendering) для хорошего SEO. Рассмотрите использование Next.js или предварительную генерацию страниц.

