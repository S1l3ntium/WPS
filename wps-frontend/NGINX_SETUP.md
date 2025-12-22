# Настройка Nginx для фронтенда и бэкенда

## Что было изменено в конфиге

Ваш конфиг `/opt/homebrew/etc/nginx/sites-available/worldpublicsummit.test.conf` был обновлен для:

1. **Обслуживания React фронтенда** из папки `dist`
2. **Проксирования API запросов** на Laravel бэкенд
3. **Поддержки React Router** (все маршруты идут в index.html)
4. **Настройки CORS** для API запросов
5. **Кэширования статических файлов**

## Ключевые изменения

### 1. Фронтенд root

```nginx
root "/Volumes/ADATA LEGEND 900/Work/WPS/wps-frontend/dist";
index index.html;
```

Сервер теперь обслуживает фронтенд из `dist` папки, а не Laravel public.

### 2. API proxy

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8000;
    # ...остальные параметры
}
```

Все запросы к `/api/` перенаправляются на Laravel сервер на порту 8000.

### 3. React Router поддержка

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Все не найденные файлы перенаправляются в `index.html`, что позволяет React Router работать.

### 4. Кэширование

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 7d;
    add_header Cache-Control "public, immutable";
}
```

Статические файлы кэшируются на 7 дней.

### 5. CORS для API

```nginx
add_header 'Access-Control-Allow-Origin' '$http_origin' always;
add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
```

API запросы работают с правильными CORS заголовками.

## Применение конфига

### 1. Проверить синтаксис конфига

```bash
sudo nginx -t
```

Должны увидеть:
```
nginx: the configuration file /opt/homebrew/etc/nginx/nginx.conf syntax is ok
nginx: configuration will be successful
```

### 2. Перезагрузить Nginx

```bash
# Если Nginx запущен
sudo nginx -s reload

# Или запустить, если не запущен
sudo nginx

# Проверить статус
sudo nginx -s status
```

### 3. Собрать фронтенд (уже сделано)

```bash
cd /Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend
npm run build
```

Файлы будут в папке `dist/`.

## Проверка работы

### 1. Убедитесь что Laravel запущен

```bash
cd /Volumes/ADATA\ LEGEND\ 900/Work/Other/wps-laravel
php artisan serve --port=8000
```

### 2. Откройте в браузере

```
https://worldpublicsummit.test
```

Должна загрузиться React приложение.

### 3. Протестируйте API запросы

В браузере console:
```javascript
fetch('/api/events')
  .then(r => r.json())
  .then(console.log)
```

Должны получить данные от Laravel.

## Если что-то не работает

### Ошибка 502 Bad Gateway

**Причина**: Laravel сервер не запущен или слушает на другом порту

**Решение**:
```bash
# Убедитесь что Laravel запущен на порту 8000
cd /Volumes/ADATA\ LEGEND\ 900/Work/Other/wps-laravel
php artisan serve --port=8000
```

### Ошибка 404 при навигации в React

**Причина**: React Router конфиг неправильный

**Проверка**: В логах Nginx должно быть перенаправление на index.html

```bash
# Смотрите логи
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log
```

### Статические файлы не загружаются

**Причина**: Неправильный путь к dist папке

**Решение**: Проверьте что `root` указывает на правильную папку:
```bash
ls -la "/Volumes/ADATA LEGEND 900/Work/WPS/wps-frontend/dist/"
```

Должны быть файлы и папка `assets`.

### CORS ошибки в API запросах

**Проверка**: В Response Headers должны быть:
```
Access-Control-Allow-Origin: https://worldpublicsummit.test
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

Если нет - нужно обновить Laravel конфиг CORS.

## Структура проекта в Nginx

```
worldpublicsummit.test
├── / (статика + React Router)
│   └── index.html (для всех неизвестных маршрутов)
├── /assets (CSS, JS, images)
│   └── кэшируется на 7 дней
├── /api/ (proxy на Laravel)
│   └── http://127.0.0.1:8000
└── /favicon.ico, /robots.txt (без логирования)
```

## Обновление фронтенда

После изменений в коде:

```bash
cd /Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend

# Разработка
npm run dev

# Или сборка для production
npm run build

# Потом перезагрузить Nginx
sudo nginx -s reload
```

## Проверка логов

```bash
# Логи доступа
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.access.log

# Логи ошибок
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log
```

## Дополнительные настройки

### Если Laravel на другом порту

Измените в конфиге:
```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3000;  # Ваш порт вместо 8000
}
```

### Если нужна компрессия

```nginx
gzip on;
gzip_types text/plain text/css text/javascript application/javascript application/json;
gzip_min_length 1000;
```

## Команды Nginx

```bash
# Запустить
sudo nginx

# Перезагрузить конфиг (без перезагрузки сервера)
sudo nginx -s reload

# Остановить
sudo nginx -s stop

# Проверить синтаксис
sudo nginx -t

# Просмотр процессов
ps aux | grep nginx
```

## Безопасность

Конфиг включает:
- ✅ HTTPS только (SSL)
- ✅ HTTP/2
- ✅ Безопасные заголовки (X-Frame-Options, HSTS и т.д.)
- ✅ TLS 1.2+
- ✅ Сильные cipher suites
- ✅ Ограничение размера файлов (200MB)
