# Быстрый справочник команд

## 🚀 Deployment (Production)

```bash
# 1. Собрать фронтенд
cd /Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend
npm run build

# 2. Проверить Nginx конфиг
sudo nginx -t

# 3. Перезагрузить Nginx
sudo nginx -s reload

# 4. В отдельном терминале: запустить Laravel
cd /Volumes/ADATA\ LEGEND\ 900/Work/Other/wps-laravel
php artisan serve --port=8000

# 5. Открыть браузер
# https://worldpublicsummit.test
```

## 💻 Development

```bash
# Запустить dev сервер
npm run dev

# Откроется на
# http://worldpublicsummit.test:5173
```

## 🔧 Nginx

```bash
# Проверить синтаксис
sudo nginx -t

# Запустить
sudo nginx

# Перезагрузить конфиг (без перезагрузки сервера)
sudo nginx -s reload

# Остановить
sudo nginx -s stop

# Просмотр процессов
ps aux | grep nginx

# Просмотр конфига
cat /opt/homebrew/etc/nginx/sites-available/worldpublicsummit.test.conf

# Логи ошибок
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log

# Логи доступа
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.access.log
```

## 🛢 Laravel

```bash
# Запустить на порту 8000
cd /Volumes/ADATA\ LEGEND\ 900/Work/Other/wps-laravel
php artisan serve --port=8000

# Миграции
php artisan migrate

# Seeders
php artisan db:seed

# Очистить кэш
php artisan cache:clear

# Логи
tail -f storage/logs/laravel.log
```

## 📦 Node.js / npm

```bash
# Установить зависимости
npm install

# Сборка для production
npm run build

# Dev сервер
npm run dev

# Размер бандла
npm run build -- --analyze

# Очистить node_modules
rm -rf node_modules && npm install
```

## 🔍 Проверки

```bash
# Проверить что Nginx запущен
ps aux | grep nginx

# Проверить что Laravel запущен
ps aux | grep artisan

# Проверить что домен разрешается
ping worldpublicsummit.test

# Проверить Nginx слушает на 443
sudo lsof -i :443

# Проверить Laravel слушает на 8000
lsof -i :8000

# Проверить фронтенд доступен
curl -I https://worldpublicsummit.test

# Проверить API доступен
curl https://worldpublicsummit.test/api/events
```

## 📂 Важные пути

```
Фронтенд:
/Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend/

Build output:
/Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend/dist/

Nginx конфиг:
/opt/homebrew/etc/nginx/sites-available/worldpublicsummit.test.conf

Nginx логи:
/opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log
/opt/homebrew/var/log/nginx/worldpublicsummit.test.access.log

Laravel:
/Volumes/ADATA\ LEGEND\ 900/Work/Other/wps-laravel/

/etc/hosts:
/etc/hosts
```

## 🐛 Troubleshooting

```bash
# Проверить 502 ошибку (Bad Gateway)
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log
ps aux | grep artisan  # Laravel запущен?

# Проверить 404 ошибку
curl -v https://worldpublicsummit.test/some-path
# Должна вернуться index.html с 200

# Проверить CORS ошибку
# Откройте F12 → Network → выберите failing запрос
# Посмотрите Response Headers на наличие Access-Control-Allow-Origin

# Проверить что фронтенд собран
ls -la /Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend/dist/

# Проверить размер фронтенда
du -sh /Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend/dist/
```

## 🔄 Полный цикл разработки

```bash
# 1. Разработка
npm run dev
# → http://worldpublicsummit.test:5173

# 2. Тестирование в браузере
# Открыть несколько страниц
# Проверить back/forward кнопки
# Проверить API запросы

# 3. Сборка для production
npm run build

# 4. Проверить Nginx
sudo nginx -t

# 5. Перезагрузить Nginx
sudo nginx -s reload

# 6. Проверить в браузере
# https://worldpublicsummit.test

# 7. Смотреть логи
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log
```

## 📊 Мониторинг

```bash
# Real-time логи ошибок
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log

# Последние 50 запросов
tail -50 /opt/homebrew/var/log/nginx/worldpublicsummit.test.access.log

# Все запросы к /api
grep '/api/' /opt/homebrew/var/log/nginx/worldpublicsummit.test.access.log

# Все 5xx ошибки
grep ' 5[0-9][0-9] ' /opt/homebrew/var/log/nginx/worldpublicsummit.test.access.log

# Все 4xx ошибки
grep ' 4[0-9][0-9] ' /opt/homebrew/var/log/nginx/worldpublicsummit.test.access.log

# Количество запросов в секунду
tail -100 /opt/homebrew/var/log/nginx/worldpublicsummit.test.access.log | wc -l
```

## 🛑 Остановка сервисов

```bash
# Остановить Nginx
sudo nginx -s stop

# Убить процесс Nginx если зависает
sudo pkill -9 nginx

# Убить Laravel dev сервер
pkill -f "php artisan serve"

# Убить Node.js dev сервер
pkill -f "vite"
```

## 🆘 Экстренные действия

```bash
# Если Nginx не запускается
# 1. Проверить синтаксис
sudo nginx -t

# 2. Проверить что порт не занят
sudo lsof -i :443

# 3. Убить процесс занимающий порт
sudo kill -9 <PID>

# 4. Запустить Nginx снова
sudo nginx

# Если фронтенд не обновляется
# 1. Очистить кэш браузера (Cmd+Shift+Delete)
# 2. Собрать заново
npm run build

# 3. Перезагрузить Nginx
sudo nginx -s reload
```

## 📝 Файлы конфигурации

```bash
# Переменные окружения (dev)
cat /Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend/.env.development

# Переменные окружения (prod)
cat /Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend/.env.production

# Vite конфиг
cat /Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend/vite.config.ts

# Nginx конфиг
cat /opt/homebrew/etc/nginx/sites-available/worldpublicsummit.test.conf
```

## 🎯 Минимальный набор для работы

```bash
# Окно 1: Nginx
sudo nginx

# Окно 2: Laravel
cd /Volumes/ADATA\ LEGEND\ 900/Work/Other/wps-laravel && php artisan serve --port=8000

# Окно 3: Frontend (если нужно изменять код)
cd /Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend && npm run dev

# Браузер
https://worldpublicsummit.test
```

## 📚 Документация в проекте

```bash
# Быстрый старт
open PRODUCTION_CHECKLIST.md

# Архитектура
open ARCHITECTURE.md

# Nginx настройка
open NGINX_SETUP.md

# React Router
open ROUTER_SETUP.md

# API конфигурация
open API_CONFIG.md

# Deployment
open DEPLOYMENT_SUMMARY.md
```
