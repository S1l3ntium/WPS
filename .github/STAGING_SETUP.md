# Настройка Staging на Собственном Сервере

Пошаговые инструкции для развёртывания WPS staging на сервере с существующими Docker проектами.

## 📋 Требования

- Docker и Docker Compose установлены
- SSH доступ на сервер
- Свободные порты для staging (рекомендуется: 8080, 8443, 5433, 6380)
- Достаточно места на диске (~10GB минимум)

---

## 🔧 Шаг 1: Подготовка на Сервере

### 1.1 Создать директорию для проекта

```bash
# На сервере
mkdir -p /home/docker/wps-staging
cd /home/docker/wps-staging
```

### 1.2 Создать структуру директорий

```bash
# На сервере
mkdir -p data/backups data/uploads
mkdir -p nginx/ssl nginx/conf.d
touch init-db.sql
```

### 1.3 Инициализировать git репозиторий

```bash
# На сервере
cd /home/docker/wps-staging
git init
git remote add origin https://github.com/YOUR_USERNAME/wps.git
git fetch origin
git checkout develop  # или staging branch если создали
```

---

## 🔑 Шаг 2: SSH Ключи для GitHub Actions

### 2.1 На локальной машине создать SSH ключ

```bash
ssh-keygen -t ed25519 -C "github-actions-wps" -f ~/.ssh/github_actions_wps
# Просто нажмите Enter на вопрос о passphrase
```

### 2.2 Скопировать публичный ключ на сервер

```bash
# На локальной машине
cat ~/.ssh/github_actions_wps.pub | ssh user@staging-server.com "cat >> ~/.ssh/authorized_keys"

# Или вручную:
# 1. ssh user@staging-server.com
# 2. nano ~/.ssh/authorized_keys
# 3. Вставить содержимое ~/.ssh/github_actions_wps.pub
```

### 2.3 Добавить приватный ключ в GitHub

```bash
# На локальной машине
cat ~/.ssh/github_actions_wps
# Скопировать ВСЁ содержимое (включая BEGIN/END PRIVATE KEY)
```

**В GitHub репозитории:**
1. Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `SSH_PRIVATE_KEY`
4. Value: (вставить содержимое приватного ключа)

### 2.4 Добавить другие staging secrets

В GitHub репозитории добавить:

```
STAGING_HOST     = staging-server.com (или IP)
STAGING_USER     = username (пользователь для SSH)
```

---

## 📝 Шаг 3: Файлы конфигурации на Сервере

### 3.1 Создать .env.staging

```bash
# На сервере: /home/docker/wps-staging/.env.staging
cat > .env.staging << 'EOF'
APP_NAME=WPS
APP_ENV=staging
APP_DEBUG=false
APP_KEY=base64:2FPjQajGEZfwEOPNm1Kb0xUA9ZeMh7WdpG8/4hJio2k=

DOMAIN_NAME=staging.wps.test
APP_URL=https://staging.wps.test

APP_LOCALE=ru
APP_FALLBACK_LOCALE=ru
APP_FAKER_LOCALE=ru_RU

# Database (внутри контейнера стандартные порты)
DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=wps_staging
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password_here

# Redis
REDIS_CLIENT=phpredis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=null

# Cache & Session
SESSION_DRIVER=redis
CACHE_STORE=redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis

# External Ports (для хоста)
DB_PORT_EXTERNAL=5433
REDIS_PORT_EXTERNAL=6380
HTTP_PORT_EXTERNAL=8080
HTTPS_PORT_EXTERNAL=8443

# API & CORS
VITE_API_BASE_URL=https://staging.wps.test/api
CORS_ALLOWED_ORIGINS=https://staging.wps.test,https://wps.test,http://localhost:3000

# Mail
MAIL_MAILER=log

# Admin Panel
ADMIN_EMAIL=admin
ADMIN_PASSWORD=secret

# Logging
LOG_CHANNEL=stack
LOG_LEVEL=info
EOF
```

### 3.2 Создать docker-compose.staging.yml

```bash
# На сервере: /home/docker/wps-staging/docker-compose.staging.yml
# Копируем обычный docker-compose.yml и переименовываем:
cp docker-compose.yml docker-compose.staging.yml
```

**Отредактировать, чтобы использовать переменные:**

```yaml
# docker-compose.staging.yml
version: '3.9'

services:
  postgres:
    image: postgres:15-alpine
    container_name: wps-staging-postgres
    env_file:
      - .env.staging
    environment:
      POSTGRES_DB: ${DB_DATABASE:-wps_staging}
      POSTGRES_USER: ${DB_USERNAME:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-postgres}
    volumes:
      - postgres_staging_data:/var/lib/postgresql/data
      - ./init-db.sql:/docker-entrypoint-initdb.d/init.sql
      - ./data/backups:/backups
    ports:
      - "${DB_PORT_EXTERNAL:-5433}:5432"
    networks:
      - wps-staging-network
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: wps-staging-redis
    command: redis-server --appendonly yes
    volumes:
      - redis_staging_data:/data
    ports:
      - "${REDIS_PORT_EXTERNAL:-6380}:6379"
    networks:
      - wps-staging-network
    restart: unless-stopped

  laravel:
    build:
      context: ./wps-laravel
      dockerfile: Dockerfile
    container_name: wps-staging-laravel
    env_file:
      - .env.staging
    environment:
      - DB_HOST=postgres
      - REDIS_HOST=redis
    volumes:
      - ./wps-laravel:/app
      - laravel_staging_storage:/app/storage
      - laravel_staging_bootstrap:/app/bootstrap/cache
      - ./data/uploads:/app/storage/uploads
    depends_on:
      - postgres
      - redis
    networks:
      - wps-staging-network
    restart: unless-stopped
    command: >
      sh -c "
      php artisan migrate --force 2>&1 || true &&
      php artisan cache:clear &&
      php artisan config:cache &&
      rm -f /app/public/storage &&
      ln -s /app/storage/app/public /app/public/storage &&
      php-fpm
      "

  frontend:
    build:
      context: ./wps-frontend
      dockerfile: Dockerfile
    container_name: wps-staging-frontend
    environment:
      - VITE_API_BASE_URL=${VITE_API_BASE_URL:-https://staging.wps.test/api}
      - NODE_ENV=production
    depends_on:
      - laravel
    networks:
      - wps-staging-network
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    container_name: wps-staging-nginx
    ports:
      - "${HTTP_PORT_EXTERNAL:-8080}:80"
      - "${HTTPS_PORT_EXTERNAL:-8443}:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/ssl:/etc/nginx/ssl
      - ./wps-laravel:/app:ro
      - laravel_staging_storage:/app/storage
    depends_on:
      - laravel
      - frontend
    networks:
      - wps-staging-network
    restart: unless-stopped

volumes:
  postgres_staging_data:
  redis_staging_data:
  laravel_staging_storage:
  laravel_staging_bootstrap:

networks:
  wps-staging-network:
    driver: bridge
```

### 3.3 Создать nginx конфиг для staging

```bash
# На сервере скопировать nginx конфиг:
cp nginx/conf.d/app.conf nginx/conf.d/app-staging.conf
```

Отредактировать `nginx/conf.d/app-staging.conf`:
- Заменить `wps.test` на `staging.wps.test`
- Обновить пути к SSL сертификатам

### 3.4 SSL Сертификаты

```bash
# На сервере, если есть Let's Encrypt:
sudo certbot certonly -d staging.wps.test

# Скопировать в nginx/ssl:
sudo cp /etc/letsencrypt/live/staging.wps.test/fullchain.pem \
        nginx/ssl/staging.wps.test.crt
sudo cp /etc/letsencrypt/live/staging.wps.test/privkey.pem \
        nginx/ssl/staging.wps.test.key

# Дать права:
sudo chown $USER:$USER nginx/ssl/*.key
```

---

## 🚀 Шаг 4: Тестирование Локально

### 4.1 Убедитесь что можете подключиться

```bash
# На локальной машине
ssh -i ~/.ssh/github_actions_wps user@staging-server.com "cd /home/docker/wps-staging && pwd"
```

Должно вывести: `/home/docker/wps-staging`

### 4.2 Попробуйте развернуть вручную

```bash
# На локальной машине
ssh -i ~/.ssh/github_actions_wps user@staging-server.com << 'EOF'
cd /home/docker/wps-staging
export DB_PORT_EXTERNAL=5433
export REDIS_PORT_EXTERNAL=6380
export HTTP_PORT_EXTERNAL=8080
export HTTPS_PORT_EXTERNAL=8443
docker compose -f docker-compose.staging.yml down || true
docker compose -f docker-compose.staging.yml pull
docker compose -f docker-compose.staging.yml up -d
sleep 10
docker compose -f docker-compose.staging.yml ps
EOF
```

---

## 📋 Шаг 5: Обновить GitHub Actions Workflow

Отредактировать `.github/workflows/staging.yml`:

Найти секцию `Deploy to Staging` и обновить:

```yaml
- name: Deploy to Staging
  if: secrets.STAGING_HOST != ''
  uses: appleboy/ssh-action@v1.0.3
  with:
    host: ${{ secrets.STAGING_HOST }}
    username: ${{ secrets.STAGING_USER }}
    key: ${{ secrets.SSH_PRIVATE_KEY }}
    script: |
      cd /home/docker/wps-staging || exit 1
      git fetch origin
      git checkout develop
      git pull origin develop

      # Задайте переменные для staging окружения
      export DB_PORT_EXTERNAL=5433
      export REDIS_PORT_EXTERNAL=6380
      export HTTP_PORT_EXTERNAL=8080
      export HTTPS_PORT_EXTERNAL=8443

      # Соберите и запустите контейнеры
      docker compose -f docker-compose.staging.yml down || true
      docker compose -f docker-compose.staging.yml build
      docker compose -f docker-compose.staging.yml up -d

      # Запустите миграции БД
      docker compose -f docker-compose.staging.yml exec -T laravel php artisan migrate --force
      docker compose -f docker-compose.staging.yml exec -T laravel php artisan cache:clear
      docker compose -f docker-compose.staging.yml exec -T laravel php artisan config:cache

      # Прогрейте кэш
      docker compose -f docker-compose.staging.yml exec -T laravel php artisan cache:warmup
```

---

## 🔍 Шаг 6: Мониторинг и Управление

### 6.1 Просмотр логов

```bash
# На сервере
cd /home/docker/wps-staging
docker compose -f docker-compose.staging.yml logs -f laravel
docker compose -f docker-compose.staging.yml logs -f nginx
docker compose -f docker-compose.staging.yml logs -f postgres
```

### 6.2 Перезагрузка контейнеров

```bash
# На сервере
cd /home/docker/wps-staging
docker compose -f docker-compose.staging.yml restart laravel
docker compose -f docker-compose.staging.yml restart nginx
```

### 6.3 Просмотр статуса

```bash
# На сервере
cd /home/docker/wps-staging
docker compose -f docker-compose.staging.yml ps
```

### 6.4 Очистка БД

```bash
# На сервере (будьте осторожны!)
cd /home/docker/wps-staging
docker compose -f docker-compose.staging.yml down
docker volume rm wps-staging_postgres_staging_data
# Затем: docker compose -f docker-compose.staging.yml up -d
```

---

## 📊 Изоляция от Других Проектов

Важные моменты для изоляции:

### Контейнеры
```
Каждый контейнер имеет префикс: wps-staging-*
- wps-staging-postgres
- wps-staging-redis
- wps-staging-laravel
- wps-staging-frontend
- wps-staging-nginx
```

### Сети
```
Используется сеть: wps-staging-network
Это отделяет staging от других проектов
```

### Volumes
```
Используются именованные volumes:
- postgres_staging_data
- redis_staging_data
- laravel_staging_storage
- laravel_staging_bootstrap
```

### Порты
```
Staging использует:
- HTTP: 8080 (внешний) → 80 (внутри)
- HTTPS: 8443 (внешний) → 443 (внутри)
- PostgreSQL: 5433 (внешний) → 5432 (внутри)
- Redis: 6380 (внешний) → 6379 (внутри)

Не конфликтует с другими проектами!
```

---

## ✅ Чек-лист для Запуска

- [ ] SSH ключи сгенерированы и добавлены
- [ ] GitHub Secrets добавлены (STAGING_HOST, STAGING_USER, SSH_PRIVATE_KEY)
- [ ] Директория `/home/docker/wps-staging` создана на сервере
- [ ] `.env.staging` создан с правильными значениями
- [ ] `docker-compose.staging.yml` скопирован и отредактирован
- [ ] nginx конфиг отредактирован для staging домена
- [ ] SSL сертификаты скопированы в `nginx/ssl`
- [ ] Локальный тест SSH развёртывания прошёл успешно
- [ ] GitHub Actions workflow обновлён
- [ ] Сделан push в develop branch для запуска workflow

---

## 🚨 Troubleshooting

### Портов не открываются
```bash
# Проверить firewall
sudo ufw allow 8080
sudo ufw allow 8443
sudo ufw allow 5433
sudo ufw allow 6380
```

### SSH ключ не работает
```bash
# На сервере, проверить права
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### GitHub Actions не может подключиться
```bash
# На локальной машине, тест SSH:
ssh -i ~/.ssh/github_actions_wps user@staging-server.com "echo OK"
```

### Контейнеры не запускаются
```bash
# На сервере
docker compose -f docker-compose.staging.yml logs
```

### БД неправильная версия
```bash
# На сервере, очистить и пересоздать
docker volume rm wps-staging_postgres_staging_data
docker compose -f docker-compose.staging.yml up -d postgres
# Дождитесь, пока postgres запустится
docker compose -f docker-compose.staging.yml up -d
```

---

## 📚 Полезные Команды

```bash
# Просмотр всех контейнеров staging
docker ps | grep wps-staging

# Просмотр всех volumes staging
docker volume ls | grep wps-staging

# Очистка staging (будьте осторожны!)
docker compose -f docker-compose.staging.yml down -v

# Просмотр использования диска
du -sh /home/docker/wps-staging/

# Просмотр журнала nginx
docker compose -f docker-compose.staging.yml exec nginx cat /var/log/nginx/error.log
```

---

## 🎯 Итого

После выполнения этих шагов:

1. **Локально** на вашем компьютере:
   - `git push origin develop` → GitHub Actions trigger

2. **GitHub Actions**:
   - Build образов
   - Запуск тестов
   - SSH deploy на сервер

3. **На сервере**:
   - Контейнеры запускаются
   - БД мигрирует
   - Staging доступен на `https://staging.wps.test`

4. **Заказчик**:
   - Может смотреть staging 24/7
   - Может согласовывать изменения
   - Демонстрация перед production
