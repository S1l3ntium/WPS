# GitHub Actions CI/CD Workflows

WPS использует GitHub Actions для автоматического тестирования, сборки и развёртывания приложения в разные окружения.

> 📚 **Для настройки staging на собственном сервере:** смотрите [STAGING_SETUP.md](../STAGING_SETUP.md)

## 📋 Структура Workflows

### 1. Staging Workflow (staging.yml)
- **Trigger**: Push в `develop` branch
- **Окружение**: Staging (пре-релиз для заказчика)
- **Этапы**:
  1. Build - сборка Docker образов (Laravel + Frontend)
  2. Test - запуск автоматических тестов
  3. Deploy - развёртывание на staging сервер (если настроено)

### 2. Production Workflow (production.yml)
- **Trigger**: Push в `main` branch
- **Окружение**: Production (стабильные версии)
- **Этапы**:
  1. Build - сборка Docker образов
  2. Test - запуск автоматических тестов
  3. Security Check - проверка уязвимостей в зависимостях
  4. Deploy - развёртывание на production сервер (если настроено)
  5. Health Check - проверка доступности приложения

## 🔐 Требуемые GitHub Secrets

Для полной работы CI/CD нужно добавить secrets в GitHub репозиторий.

### Для Staging:
```
STAGING_HOST          # IP или домен staging сервера
STAGING_USER          # SSH пользователь для доступа
SSH_PRIVATE_KEY       # SSH приватный ключ для доступа
```

### Для Production:
```
PROD_HOST             # IP или домен production сервера
PROD_USER             # SSH пользователь для доступа
PROD_DOMAIN           # Доменное имя production сервера (для health check)
SSH_PRIVATE_KEY       # SSH приватный ключ для доступа
```

### Опциональные (Notifications):
```
SLACK_WEBHOOK         # Webhook для уведомлений в Slack
DISCORD_WEBHOOK       # Webhook для уведомлений в Discord
```

### Как добавить Secrets:
1. Перейти в Settings → Secrets and variables → Actions
2. Нажать "New repository secret"
3. Добавить каждый secret

## 🚀 Workflow для трёх окружений

### Local Development
```bash
# Запуск локально (используется по умолчанию)
docker compose up -d

# Доступ: https://wps.test:8443
```

### Staging (Пре-релиз)
```
Develop Branch Push
    ↓
GitHub Actions Trigger
    ↓
Build Docker Images
    ↓
Run Tests
    ↓
Deploy to Staging Server
    ↓
Доступно на: https://staging-wps.example.com
```

### Production
```
Main Branch Push
    ↓
GitHub Actions Trigger
    ↓
Build Docker Images
    ↓
Run Tests + Security Check
    ↓
Deploy to Production Server
    ↓
Health Check
    ↓
Доступно на: https://wps.example.com
```

## 📝 Использование Environment Variables

Каждое окружение использует разные переменные:

### Local (.env.docker)
```
DOMAIN_NAME=wps.test
APP_ENV=development
APP_DEBUG=true
HTTP_PORT_EXTERNAL=8080
HTTPS_PORT_EXTERNAL=8443
```

### Staging (.env.staging)
```
DOMAIN_NAME=staging-wps.example.com
APP_ENV=staging
APP_DEBUG=false
HTTP_PORT_EXTERNAL=8080
HTTPS_PORT_EXTERNAL=8443
```

### Production (.env.production)
```
DOMAIN_NAME=wps.example.com
APP_ENV=production
APP_DEBUG=false
HTTP_PORT_EXTERNAL=80
HTTPS_PORT_EXTERNAL=443
```

## 🔧 Настройка на Staging/Production Сервере

### Требования:
- Docker и Docker Compose установлены
- SSH доступ настроен
- Директория `~/wps` (staging) или `~/wps-production` (prod) существует

### SSH ключ для GitHub Actions:

```bash
# На локальной машине создать SSH ключ:
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# Скопировать публичный ключ на сервер:
ssh-copy-id -i ~/.ssh/github_actions.pub user@staging-server

# Добавить приватный ключ в GitHub Secrets:
# Скопировать содержимое ~/.ssh/github_actions и добавить как SSH_PRIVATE_KEY
```

## ✅ Проверка Статуса

Статус build и deploy можно смотреть в:
- GitHub: Actions tab в репозитории
- Slack/Discord: получать уведомления (если настроено)

## 🚨 Troubleshooting

### Deployment не срабатывает
- Проверить что SSH ключ правильно добавлен в GitHub Secrets
- Проверить что сервер доступен по SSH
- Смотреть logs в GitHub Actions

### Tests падают
- Запустить тесты локально: `cd wps-laravel && php artisan test`
- Проверить базу данных и миграции

### Health check падает после deploy
- Проверить что контейнеры запустились: `docker compose ps`
- Смотреть логи: `docker compose logs laravel`

## 📚 Дополнительная информация

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker in GitHub Actions](https://docs.github.com/en/actions/publishing-packages/publishing-docker-images)
