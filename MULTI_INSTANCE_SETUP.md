# Масштабирование: Несколько экземпляров WPS на одной VPS

## 🎯 Обзор

Этот документ описывает как развернуть несколько независимых экземпляров World Public Summit на одной VPS, каждый на своем поддомене:

- `africa.wps.test`
- `irak.wps.test` (или `iraq.wps.test`)
- `asia.wps.test`
- и т.д.

### Архитектура

```
Internet (80/443)
    ↓
Nginx (главный хост на 80)
    ├→ africa.wps.test → wps-africa-nginx → wps-africa-laravel + wps-africa-frontend
    ├→ irak.wps.test → wps-irak-nginx → wps-irak-laravel + wps-irak-frontend
    └→ asia.wps.test → wps-asia-nginx → wps-asia-laravel + wps-asia-frontend

Каждый экземпляр имеет:
- Независимую БД PostgreSQL (wps_africa, wps_irak, etc.)
- Независимый Redis (разные порты или имена)
- Независимые storage и bootstrap файлы
- Независимый Nginx конфиг для своего домена
```

---

## ✅ Требования

### Локально (для тестирования)

1. **Обновить /etc/hosts:**
```bash
sudo nano /etc/hosts

# Добавить
127.0.0.1    wps.test africa.wps.test irak.wps.test asia.wps.test
```

2. **Docker и Docker Compose установлены**

### На VPS (для production)

1. **Домены настроены на IP VPS:**
```
A record: africa.wps.test -> YOUR_VPS_IP
A record: irak.wps.test -> YOUR_VPS_IP
A record: asia.wps.test -> YOUR_VPS_IP
```

2. **SSL сертификаты (опционально):**
```bash
# Wildcard сертификат для *.wps.test
certbot certonly --manual -d "*.wps.test" -d "wps.test"
```

---

## 🚀 Быстрый старт (локально)

### 1. Запустить первый экземпляр (Africa)

```bash
cd /path/to/wps

# Создать .env файл для africa
cp .env.docker .env.africa
nano .env.africa

# Важные параметры:
APP_URL=http://africa.wps.test
VITE_API_BASE_URL=http://africa.wps.test/api
DB_PASSWORD=africa_password_123
REDIS_PORT=6380
NGINX_PORT=80  # Или другой, если конфликт
```

Запустить:
```bash
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml up -d --build
```

Проверить:
```bash
curl http://africa.wps.test
docker-compose -f docker-compose-multi.yml ps  # для africa
```

### 2. Запустить второй экземпляр (Iraq)

```bash
# Создать .env файл
cp .env.docker .env.irak
nano .env.irak

# Важные параметры:
APP_URL=http://irak.wps.test
VITE_API_BASE_URL=http://irak.wps.test/api
DB_PASSWORD=irak_password_456
REDIS_PORT=6381
NGINX_PORT=80  # Используем тот же, Nginx сам разберется по server_name
```

Запустить:
```bash
WPS_INSTANCE=irak docker-compose -f docker-compose-multi.yml --env-file .env.irak up -d --build
```

### 3. Масштабировать дальше

Повторить для каждого нового экземпляра (asia, europa, etc.)

---

## 📋 Структура файлов

```
wps/
├── docker-compose-multi.yml          # Multi-instance конфиг
├── .env.docker                        # Шаблон для одного экземпляра
├── .env.africa                        # Africa instance переменные
├── .env.irak                          # Iraq instance переменные
├── .env.asia                          # Asia instance переменные
├── nginx/
│   ├── conf.d/
│   │   ├── default.conf               # Основной конфиг (используется для localhost)
│   │   ├── instance-africa.conf       # Africa instance конфиг
│   │   ├── instance-irak.conf         # Iraq instance конфиг
│   │   └── instance-asia.conf         # Asia instance конфиг (создать самому)
│   └── ssl/
│       ├── cert.pem                   # SSL сертификат
│       └── key.pem                    # SSL приватный ключ
├── wps-laravel/
│   └── Dockerfile                     # Один Dockerfile для всех
├── wps-frontend/
│   └── Dockerfile                     # Один Dockerfile для всех
└── MULTI_INSTANCE_SETUP.md           # Этот файл
```

---

## 🔧 Команды для управления

### Управление одним экземпляром

```bash
# Запустить Africa
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml --env-file .env.africa up -d

# Остановить Africa
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml down

# Логи Africa
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml logs -f

# Миграции для Africa
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml exec laravel php artisan migrate --force

# Shell для Africa
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml exec laravel php artisan tinker
```

### Управление всеми экземплярами

```bash
# Запустить все
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml up -d
WPS_INSTANCE=irak docker-compose -f docker-compose-multi.yml --env-file .env.irak up -d
WPS_INSTANCE=asia docker-compose -f docker-compose-multi.yml --env-file .env.asia up -d

# Или создать скрипт start-all.sh (см. ниже)
bash start-all.sh
```

---

## 📝 Скрипты для автоматизации

### Скрипт: start-all.sh

```bash
#!/bin/bash

# Запустить все экземпляры WPS

INSTANCES=("africa" "irak" "asia")

for instance in "${INSTANCES[@]}"; do
    echo "🚀 Starting $instance..."
    WPS_INSTANCE=$instance docker-compose -f docker-compose-multi.yml --env-file .env.$instance up -d
    echo "✅ $instance started"
done

echo ""
echo "All instances started!"
echo ""
echo "Access at:"
for instance in "${INSTANCES[@]}"; do
    echo "  http://$instance.wps.test"
done
```

### Скрипт: stop-all.sh

```bash
#!/bin/bash

INSTANCES=("africa" "irak" "asia")

for instance in "${INSTANCES[@]}"; do
    echo "⏹️ Stopping $instance..."
    WPS_INSTANCE=$instance docker-compose -f docker-compose-multi.yml down
    echo "✅ $instance stopped"
done

echo "All instances stopped!"
```

### Скрипт: status-all.sh

```bash
#!/bin/bash

INSTANCES=("africa" "irak" "asia")

for instance in "${INSTANCES[@]}"; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Status for: $instance"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    WPS_INSTANCE=$instance docker-compose -f docker-compose-multi.yml ps
    echo ""
done
```

---

## 🗄️ Инициализация баз данных

### Для новой БД (при первом запуске)

```bash
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml exec laravel php artisan migrate --force
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml exec laravel php artisan db:seed --force
```

### Для существующей БД (обновить)

```bash
# Запустить новые миграции
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml exec laravel php artisan migrate --force

# Обновить кэш
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml exec laravel php artisan cache:clear
```

---

## 📊 Контроль ресурсов

### Порты на VPS

Каждый экземпляр использует свои порты для БД и кэша:

```
Africa:
  - Nginx: 80 (слушает по domain)
  - Laravel: 9001 (внутренний)
  - PostgreSQL: 5433 (если нужен доступ снаружи)
  - Redis: 6380

Iraq:
  - Nginx: 80 (слушает по domain)
  - Laravel: 9002 (внутренний)
  - PostgreSQL: 5434 (если нужен доступ снаружи)
  - Redis: 6381

Asia:
  - Nginx: 80 (слушает по domain)
  - Laravel: 9003 (внутренний)
  - PostgreSQL: 5435 (если нужен доступ снаружи)
  - Redis: 6382
```

Все контейнеры слушают на **одном Nginx на портах 80/443**, который направляет трафик по `server_name`.

### Экономия памяти

Если нужна минимизация памяти:
1. Отключить Redis для некритичных экземпляров
2. Использовать общую БД для нескольких экземпляров (не рекомендуется)
3. Использовать shared storage для файлов (S3, NFS)

---

## 🔐 Безопасность

### .env файлы

```bash
# Никогда не коммитить .env файлы!
echo ".env*" >> .gitignore
echo "!.env.docker" >> .gitignore

# Давать права только пользователю
chmod 600 .env.africa .env.irak .env.asia
```

### Пароли баз данных

```bash
# Генерировать сильные пароли
openssl rand -base64 32

# Или использовать уникальные для каждого экземпляра:
# africa: "random_string_1"
# irak: "random_string_2"
# asia: "random_string_3"
```

### Firewall

На VPS:
```bash
# Закрыть внутренние порты PostgreSQL/Redis
ufw allow 80/tcp
ufw allow 443/tcp
ufw deny 5432/tcp    # PostgreSQL - только локально
ufw deny 6379/tcp    # Redis - только локально
ufw deny 6380/tcp    # Redis africa - только локально
ufw deny 6381/tcp    # Redis irak - только локально
```

---

## 🧪 Тестирование

### Проверить что всё работает

```bash
# 1. Проверить контейнеры
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml ps

# 2. Проверить API
curl http://africa.wps.test/api/competitions

# 3. Проверить фронтенд
curl http://africa.wps.test

# 4. Проверить админ-панель
curl http://africa.wps.test/admin

# 5. Проверить логи
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml logs --tail=50
```

### Параллельный тест

```bash
# Одновременно запросить все экземпляры
curl http://africa.wps.test/api/competitions &
curl http://irak.wps.test/api/competitions &
curl http://asia.wps.test/api/competitions &
wait

echo "All instances responded!"
```

---

## 📈 Масштабирование в production

### На AWS/GCP/DigitalOcean

1. **Создать VPS с Docker и Docker Compose**

2. **Установить Nginx (главный хост вне контейнеров)**
```bash
apt-get install nginx
# Или использовать Docker образ для главного Nginx
```

3. **Развернуть каждый экземпляр в отдельный контейнер**
```bash
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml --env-file .env.africa up -d
WPS_INSTANCE=irak docker-compose -f docker-compose-multi.yml --env-file .env.irak up -d
```

4. **Настроить SSL с Let's Encrypt**
```bash
certbot certonly --webroot -w /var/www/certbot -d "*.wps.test"
# Обновить nginx конфиг с SSL
```

### Альтернатива: Kubernetes

Если нужна высокая доступность:
```bash
# Развернуть как K8s deployment
kubectl apply -f k8s-wps-africa.yml
kubectl apply -f k8s-wps-irak.yml
kubectl apply -f k8s-wps-asia.yml
```

---

## 🐛 Troubleshooting

### Контейнеры не стартуют

```bash
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml logs

# Проверить что все переменные установлены
echo $WPS_INSTANCE

# Убедиться что .env файл существует
ls -la .env.africa
```

### Конфликт портов

```bash
# Проверить что занято
lsof -i :80
lsof -i :5432
lsof -i :6379

# Изменить в docker-compose-multi.yml или .env
POSTGRES_PORT=5433
REDIS_PORT=6380
```

### API не отвечает

```bash
# Проверить логи Laravel
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml logs laravel

# Проверить миграции
WPS_INSTANCE=africa docker-compose -f docker-compose-multi.yml exec laravel php artisan migrate --force
```

### Домен не разрешается

```bash
# Убедиться что в /etc/hosts (локально)
grep africa /etc/hosts

# На VPS проверить DNS
nslookup africa.wps.test
dig africa.wps.test

# Или просто использовать IP
curl http://YOUR_VPS_IP -H "Host: africa.wps.test"
```

---

## ✅ Чек-лист: Готовность к масштабированию

- ✅ docker-compose-multi.yml настроен с переменными
- ✅ Nginx конфиги для каждого поддомена
- ✅ .env шаблоны для каждого экземпляра
- ✅ Скрипты автоматизации (start-all.sh, stop-all.sh)
- ✅ Независимые БД для каждого экземпляра
- ✅ Независимые Redis для каждого экземпляра
- ✅ Независимое хранилище для каждого экземпляра
- ✅ Документация по развертыванию
- ✅ Firewall правила
- ✅ SSL конфигурация (готова к использованию)

---

## 📞 Дополнительные вопросы

### Можно ли использовать одну БД для всех экземпляров?

**Не рекомендуется!** Причины:
- Каждый экземпляр может иметь свои данные
- Легче backup/restore для отдельного экземпляра
- Проще масштабировать (перенести экземпляр на другой хост)
- Лучше для мультитенантных приложений

Если нужно: используйте `wps_all` для всех или добавьте tenant_id в таблицы.

### Можно ли использовать одно хранилище (S3)?

**Да!** Это лучший вариант для production:
```bash
# В каждом .env
FILESYSTEM_DISK=s3

AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=yyy
AWS_BUCKET=wps-files
AWS_REGION=eu-central-1
```

### Как обновить все экземпляры одновременно?

```bash
# Скрипт: update-all.sh
for instance in africa irak asia; do
    WPS_INSTANCE=$instance docker-compose -f docker-compose-multi.yml \
      --env-file .env.$instance pull && \
      WPS_INSTANCE=$instance docker-compose -f docker-compose-multi.yml up -d
done
```

---

## Итого

Проект **полностью готов** к масштабированию на несколько экземпляров!

Все компоненты (Laravel, React, Nginx, PostgreSQL, Redis) могут независимо работать для каждого экземпляра.
