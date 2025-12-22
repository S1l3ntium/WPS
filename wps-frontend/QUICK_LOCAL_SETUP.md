# Быстрая настройка локального домена

## Способ 1: HTTP без SSL (самый простой)

### 1. Добавьте домен в /etc/hosts

macOS / Linux:
```bash
echo "127.0.0.1 worldpublicsummit.test" | sudo tee -a /etc/hosts
```

Windows (PowerShell от администратора):
```powershell
Add-Content -Path "C:\Windows\System32\drivers\etc\hosts" -Value "`n127.0.0.1 worldpublicsummit.test"
```

### 2. Обновите vite.config.ts

```typescript
server: {
  host: 'worldpublicsummit.test',
  port: 5173,
  // https: false (по умолчанию)
}
```

### 3. Запустите

```bash
npm run dev
```

Откройте: `http://worldpublicsummit.test:5173`

---

## Способ 2: HTTPS с локальными сертификатами (рекомендуется)

### 1. Установите mkcert

```bash
# macOS
brew install mkcert

# Linux
sudo apt-get install mkcert

# Windows
choco install mkcert
```

### 2. Создайте локальный CA

```bash
mkcert -install
```

### 3. Генерируйте сертификаты

```bash
cd wps-frontend
mkcert worldpublicsummit.test
```

### 4. Добавьте домен в /etc/hosts

```bash
echo "127.0.0.1 worldpublicsummit.test" | sudo tee -a /etc/hosts
```

### 5. Обновите .env.development

```env
VITE_API_URL=https://worldpublicsummit.test
SSL_KEY_PATH=./worldpublicsummit.test-key.pem
SSL_CERT_PATH=./worldpublicsummit.test.pem
```

### 6. Запустите

```bash
npm run dev
```

Откройте: `https://worldpublicsummit.test`

---

## Проверка

### Проверить разрешение домена

```bash
ping worldpublicsummit.test
# Должен показать 127.0.0.1
```

### Проверить HTTPS (если используете)

```bash
curl -v https://worldpublicsummit.test
# Должен вернуть 200 (если сертификаты настроены)
```

### Очистить DNS кэш (если домен не разрешается)

```bash
# macOS
sudo dscacheutil -flushcache

# Linux
sudo systemctl restart systemd-resolved

# Windows (PowerShell от администратора)
ipconfig /flushdns
```

---

## Если получаете ошибку "EACCES: permission denied"

Это значит что порт 443 требует sudo. Используйте вместо этого другой порт:

```typescript
// vite.config.ts
server: {
  host: 'worldpublicsummit.test',
  port: 3443,  // Вместо 443
  https: { /* ... */ }
}
```

Откройте: `https://worldpublicsummit.test:3443`

---

## Что выбрать?

| Способ | Плюсы | Минусы |
|--------|-------|--------|
| HTTP (5173) | Простой, не требует setup | Не HTTPS, нужен порт в URL |
| HTTPS (443) | Как в production | Требует SSL сертификаты, sudo |
| HTTPS (3443) | Как в production, без sudo | Не стандартный порт |

**Рекомендация**: Для разработки используйте **HTTP на 5173**, это самый простой способ.

Когда будете готовы к production, переходите на HTTPS.

---

## Текущая конфигурация в проекте

- API URL: `https://worldpublicsummit.test`
- Dev сервер: `https://worldpublicsummit.test` (порт 443, если есть SSL)
- Proxy API: `/api/*` → `https://worldpublicsummit.test/*`

Подробнее: [LOCAL_DOMAIN_SETUP.md](./LOCAL_DOMAIN_SETUP.md)
