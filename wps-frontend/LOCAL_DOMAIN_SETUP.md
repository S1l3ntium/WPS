# Настройка локального домена https://worldpublicsummit.test

## Предварительные требования

- mkcert (для генерации локальных SSL сертификатов)
- sudo доступ (для редактирования `/etc/hosts`)

## Шаг 1: Установите mkcert

### macOS
```bash
brew install mkcert
brew install nss  # для Firefox
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get install mkcert
sudo apt-get install libnss3-tools  # для Firefox
```

### Windows
```bash
choco install mkcert
```

## Шаг 2: Создайте локальный CA (только один раз)

```bash
mkcert -install
```

Это установит локальный Certificate Authority в вашу систему.

## Шаг 3: Генерируйте сертификаты для worldpublicsummit.test

```bash
cd wps-frontend
mkcert worldpublicsummit.test
```

Это создаст два файла:
- `worldpublicsummit.test.pem` (сертификат)
- `worldpublicsummit.test-key.pem` (приватный ключ)

## Шаг 4: Обновите `/etc/hosts`

### macOS / Linux
```bash
sudo nano /etc/hosts
```

Добавьте строку:
```
127.0.0.1 worldpublicsummit.test
```

Сохраните (Ctrl+O, Enter, Ctrl+X)

### Windows
Отредактируйте `C:\Windows\System32\drivers\etc\hosts` (от администратора):
```
127.0.0.1 worldpublicsummit.test
```

## Шаг 5: Обновите .env.development

```bash
# Раскомментируйте и обновите пути к сертификатам
SSL_KEY_PATH=./worldpublicsummit.test-key.pem
SSL_CERT_PATH=./worldpublicsummit.test.pem
```

## Шаг 6: Запустите dev сервер

```bash
npm run dev
```

Сервер будет доступен на: **https://worldpublicsummit.test**

## Проблемы и решения

### Ошибка "EACCES: permission denied" на порту 443

**Проблема**: Порт 443 требует прав администратора

**Решение 1**: Используйте другой порт
```bash
# В vite.config.ts измените на:
port: 3000,
```

**Решение 2**: Запустите с sudo (не рекомендуется)
```bash
sudo npm run dev
```

**Решение 3**: Используйте порт > 1024 и перенаправление
```bash
# macOS / Linux
sudo pfctl -f - <<< "
rdr pass inet proto tcp from any to any port 443 -> 127.0.0.1 port 3000
"

# Или используйте iptables (Linux)
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 3000
```

### Браузер не доверяет сертификату

**Проблема**: "NET::ERR_CERT_AUTHORITY_INVALID"

**Решение**:
1. Убедитесь что `mkcert -install` был запущен
2. Перезагрузите браузер
3. Очистите кэш браузера (Cmd+Shift+Delete)

### Firefox не доверяет сертификату

**Причина**: Firefox использует свой хранилище сертификатов

**Решение**:
1. Установите `nss` (см. шаг 1)
2. Перезагрузите Firefox
3. Если не помогает - добавьте исключение вручную

### Localhost работает, но worldpublicsummit.test не работает

**Проблема**: Доменное имя не разрешается

**Проверка**:
```bash
ping worldpublicsummit.test
# Должен вернуть 127.0.0.1

nslookup worldpublicsummit.test
# Должен найти локальный IP
```

**Решение**:
1. Проверьте `/etc/hosts` правильно ли добавлен домен
2. Перезагрузите компьютер или очистите DNS кэш:
   - macOS: `sudo dscacheutil -flushcache`
   - Linux: `sudo systemctl restart systemd-resolved`
   - Windows: `ipconfig /flushdns` (PowerShell от администратора)

## Альтернатива: Без SSL (для локальной разработки)

Если вам не нужен HTTPS локально, можно использовать обычный HTTP:

```typescript
// vite.config.ts
server: {
  host: 'worldpublicsummit.test',
  port: 5173,
  https: false,
  // ...
}
```

Затем используйте: `http://worldpublicsummit.test:5173`

## Использование с Docker

Если вы используете Docker, маппируйте порт 443:

```bash
docker run -p 443:443 -v $(pwd)/worldpublicsummit.test.pem:/app/cert.pem -v $(pwd)/worldpublicsummit.test-key.pem:/app/key.pem my-app
```

## Production deployment

Для production используйте реальные SSL сертификаты (Let's Encrypt):

1. Используйте Nginx или Apache для обработки HTTPS
2. Обновите `.env.production` с реальным доменом
3. Запустите `npm run build`
4. Разместите содержимое `dist/` на веб-сервер

## Проверка конфигурации

```bash
# Проверить что домен разрешается
dig worldpublicsummit.test

# Проверить HTTPS соединение
curl -v https://worldpublicsummit.test

# Проверить сертификат
openssl s_client -connect worldpublicsummit.test:443
```

## Ссылки

- [mkcert GitHub](https://github.com/FiloSottile/mkcert)
- [Vite HTTPS документация](https://vitejs.dev/config/server-options.html#server-https)
- [Let's Encrypt для production](https://letsencrypt.org/)
