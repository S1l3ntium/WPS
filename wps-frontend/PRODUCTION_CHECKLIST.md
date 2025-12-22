# Production Checklist

## ✅ Перед запуском

### 1. Сборка фронтенда (3 минуты)

```bash
cd /Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend
npm run build
```

✅ Проверка:
```bash
ls -la dist/
# Должны быть: index.html и папка assets/
```

### 2. Проверка Nginx конфига (1 минута)

```bash
sudo nginx -t
```

✅ Ожидаемый вывод:
```
nginx: the configuration file /opt/homebrew/etc/nginx/nginx.conf syntax is ok
nginx: configuration will be successful
```

### 3. Применение конфига (1 минута)

```bash
sudo nginx -s reload
```

или если Nginx не запущен:
```bash
sudo nginx
```

### 4. Запуск Laravel бэкенда (1 минута)

```bash
cd /Volumes/ADATA\ LEGEND\ 900/Work/Other/wps-laravel
php artisan serve --port=8000
```

✅ Проверка:
```bash
curl http://localhost:8000/api/events
# Должны быть данные (или 200/404, но не connection refused)
```

### 5. Проверка в браузере (1 минута)

```
https://worldpublicsummit.test
```

✅ Проверка:
- [ ] Страница загружается
- [ ] React компоненты отображаются
- [ ] Back/forward кнопки работают
- [ ] API запросы работают (F12 → Network → /api/)

---

## 🔍 Проверка статуса

### Nginx статус
```bash
ps aux | grep nginx
# Должны быть процессы nginx
```

### Laravel статус
```bash
curl -I http://localhost:8000
# HTTP/1.1 200 OK
```

### Логи Nginx
```bash
# Последние ошибки
tail -20 /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log

# Последние запросы
tail -20 /opt/homebrew/var/log/nginx/worldpublicsummit.test.access.log
```

---

## 🚨 Если что-то не работает

### Ошибка 502 Bad Gateway

**Решение**: Убедитесь что Laravel запущен
```bash
ps aux | grep artisan
# Если нет - запустите:
cd wps-laravel && php artisan serve --port=8000
```

### Ошибка 404 на маршрутах

**Решение**: React Router конфиг может быть неправильным
```bash
# Проверьте что в dist есть index.html
ls -la dist/index.html
```

### API запросы не работают

**Решение**:
1. Проверьте Laravel CORS конфиг
2. Смотрите browser console (F12)
3. Смотрите Nginx логи

### Домен не разрешается

**Решение**: Проверьте /etc/hosts
```bash
cat /etc/hosts | grep worldpublicsummit
# Должно быть: 127.0.0.1 worldpublicsummit.test
```

---

## 📊 Полезные команды

```bash
# Остановить Nginx
sudo nginx -s stop

# Просмотр всех конфигов
cat /opt/homebrew/etc/nginx/nginx.conf

# Просмотр нашего конфига
cat /opt/homebrew/etc/nginx/sites-available/worldpublicsummit.test.conf

# Перестроить и переразвернуть (полный процесс)
cd wps-frontend && npm run build && sudo nginx -s reload

# Смотреть логи в реальном времени
tail -f /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log
```

---

## 🎯 Минимум для работы

Должны быть запущены:
1. **Nginx** - обслуживает фронтенд и проксирует API
2. **Laravel** - на порту 8000

Файлы должны быть:
1. **Фронтенд собран** - в папке `dist/`
2. **Nginx конфиг** - в `/opt/homebrew/etc/nginx/sites-available/worldpublicsummit.test.conf`
3. **Домен в /etc/hosts** - `127.0.0.1 worldpublicsummit.test`
4. **SSL сертификаты** - если используется HTTPS

---

## 📈 Мониторинг

### Размер фронтенда
```bash
du -sh dist/
```

### Трафик API
```bash
# Последние запросы к /api/
grep '/api/' /opt/homebrew/var/log/nginx/worldpublicsummit.test.access.log | tail -20
```

### Ошибки
```bash
# Все 5xx ошибки
grep '5[0-9][0-9]' /opt/homebrew/var/log/nginx/worldpublicsummit.test.error.log
```

---

## 🔐 Безопасность (уже настроено)

- ✅ HTTPS обязателен
- ✅ HSTS заголовки установлены
- ✅ X-Frame-Options = DENY
- ✅ X-Content-Type-Options = nosniff
- ✅ TLS 1.2+
- ✅ Сильные cipher suites

---

## 📝 Версии

- React: 18.3.1
- React Router: 7.11.0
- Vite: 6.3.5
- Nginx: (смотреть `nginx -v`)
- PHP: 8.3
- Laravel: (в wps-laravel)

---

## ✨ Итого за 5 минут

```bash
# 1. Собрать фронтенд
cd wps-frontend && npm run build

# 2. Проверить конфиг
sudo nginx -t

# 3. Перезагрузить Nginx
sudo nginx -s reload

# 4. Запустить Laravel (в отдельном терминале)
cd wps-laravel && php artisan serve --port=8000

# 5. Открыть в браузере
# https://worldpublicsummit.test
```

**Готово! 🎉**
