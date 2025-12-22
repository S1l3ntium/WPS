# Настройка локального домена worldpublicsummit.test

## Краткий старт (HTTP)

Самый простой способ - использовать HTTP без SSL:

### 1. Добавьте домен в /etc/hosts

```bash
# macOS / Linux
echo "127.0.0.1 worldpublicsummit.test" | sudo tee -a /etc/hosts
```

или отредактируйте вручную:
```bash
sudo nano /etc/hosts
# Добавьте: 127.0.0.1 worldpublicsummit.test
```

### 2. Запустите сервер

```bash
npm run dev
```

### 3. Откройте в браузере

```
http://worldpublicsummit.test:5173
```

---

## Если хотите HTTPS (более сложно)

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

### 3. Генерируйте сертификаты для домена

```bash
cd wps-frontend
mkcert worldpublicsummit.test
```

Создаст файлы:
- `worldpublicsummit.test.pem`
- `worldpublicsummit.test-key.pem`

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

### 6. Запустите (может потребоваться sudo для порта 443)

```bash
npm run dev

# Или с sudo если нужен порт 443
sudo npm run dev
```

### 7. Откройте в браузере

```
https://worldpublicsummit.test
```

---

## Текущая конфигурация

- **Dev сервер**: `http://worldpublicsummit.test:5173` (или `https://worldpublicsummit.test` с SSL)
- **API URL**: `https://worldpublicsummit.test`
- **API Proxy**: `/api/*` → `https://worldpublicsummit.test/*`

---

## Проверка

### Проверить что домен работает

```bash
ping worldpublicsummit.test
# Должен показать: PING worldpublicsummit.test (127.0.0.1)
```

### Если домен не разрешается

Очистите DNS кэш:

```bash
# macOS
sudo dscacheutil -flushcache

# Linux
sudo systemctl restart systemd-resolved

# Windows (PowerShell от администратора)
ipconfig /flushdns
```

---

## Использование в коде

```typescript
import { useApi } from '@/hooks/useApi';

function MyComponent() {
  const { get, post } = useApi();

  // Автоматически использует VITE_API_URL из .env
  const events = await get('/api/events');
  const result = await post('/api/events', { title: 'New' });
}
```

---

## Дополнительно

- [QUICK_LOCAL_SETUP.md](./QUICK_LOCAL_SETUP.md) - Быстрый старт
- [LOCAL_DOMAIN_SETUP.md](./LOCAL_DOMAIN_SETUP.md) - Полная инструкция
- [API_CONFIG.md](./API_CONFIG.md) - Конфигурация API
- [CURRENT_CONFIG.md](./CURRENT_CONFIG.md) - Текущие настройки
