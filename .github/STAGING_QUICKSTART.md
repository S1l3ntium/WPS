# 🚀 Staging Quickstart

Краткие инструкции для запуска staging на вашем сервере за 10 минут.

## 1️⃣ На Локальной Машине

```bash
# Создать SSH ключ
ssh-keygen -t ed25519 -C "github-actions-wps" -f ~/.ssh/github_actions_wps

# Просмотреть приватный ключ
cat ~/.ssh/github_actions_wps
```

## 2️⃣ На Сервере

```bash
# Создать директорию
mkdir -p /home/docker/wps-staging
cd /home/docker/wps-staging

# Инициализировать репозиторий
git init
git remote add origin https://github.com/YOUR_USERNAME/wps.git
git fetch origin
git checkout develop

# Создать структуру
mkdir -p data/backups data/uploads nginx/ssl nginx/conf.d
touch init-db.sql

# Скопировать файлы (из клона репозитория)
cp docker-compose.yml docker-compose.staging.yml
cp nginx/conf.d/app.conf nginx/conf.d/app-staging.conf
```

## 3️⃣ Создать .env.staging

На сервере в `/home/docker/wps-staging/.env.staging`:

```env
APP_NAME=WPS
APP_ENV=staging
APP_DEBUG=false
APP_KEY=base64:2FPjQajGEZfwEOPNm1Kb0xUA9ZeMh7WdpG8/4hJio2k=

DOMAIN_NAME=staging.wps.test
APP_URL=https://staging.wps.test

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=wps_staging
DB_USERNAME=postgres
DB_PASSWORD=YOUR_SECURE_PASSWORD

REDIS_HOST=redis
REDIS_PORT=6379

SESSION_DRIVER=redis
CACHE_STORE=redis
QUEUE_CONNECTION=redis

DB_PORT_EXTERNAL=5433
REDIS_PORT_EXTERNAL=6380
HTTP_PORT_EXTERNAL=8080
HTTPS_PORT_EXTERNAL=8443

VITE_API_BASE_URL=https://staging.wps.test/api
CORS_ALLOWED_ORIGINS=https://staging.wps.test

ADMIN_EMAIL=admin
ADMIN_PASSWORD=secret
```

## 4️⃣ SSH Ключи

На сервере:

```bash
mkdir -p ~/.ssh
cat >> ~/.ssh/authorized_keys << 'EOF'
# ВСТАВИТЬ СОДЕРЖИМОЕ ~/.ssh/github_actions_wps.pub ОТСЮДА
EOF

chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## 5️⃣ GitHub Secrets

В GitHub репозитории → Settings → Secrets:

```
STAGING_HOST = staging-server.com (или IP)
STAGING_USER = username
SSH_PRIVATE_KEY = (содержимое ~/.ssh/github_actions_wps)
```

## 6️⃣ Тест

На локальной машине:

```bash
ssh -i ~/.ssh/github_actions_wps user@staging-server.com \
  "cd /home/docker/wps-staging && git status"
```

## 7️⃣ Deploy

```bash
# На локальной машине
git push origin develop

# Смотрите: GitHub Actions → Actions tab
# Workflow запустится автоматически!
```

---

## 📝 Дополнительно

- **Полные инструкции:** [STAGING_SETUP.md](STAGING_SETUP.md)
- **nginx конфиг:** Отредактировать `nginx/conf.d/app-staging.conf`
- **SSL сертификаты:** Let's Encrypt в `nginx/ssl/`
- **Логи:** `docker compose -f docker-compose.staging.yml logs -f`

---

## ✅ Готово!

После первого успешного deploy:

- Staging доступен на `https://staging.wps.test`
- Каждый push в develop автоматически обновляет staging
- БД мигрирует автоматически
- Заказчик может согласовывать изменения

🎉 Готово к демонстрации!
