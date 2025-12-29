# Nginx Configuration

Parameterized nginx configuration that supports multiple environments and domains.

## How It Works

### Configuration Generation

1. **Template File**: `conf.d/app.conf.template`
   - Contains nginx configuration with `${DOMAIN_NAME}` placeholder
   - Used as template for generating environment-specific config

2. **Dockerfile**: `Dockerfile`
   - Builds custom nginx image based on `nginx:alpine`
   - Installs `gettext` package for `envsubst` support
   - Sets custom entrypoint for config generation

3. **Entrypoint Script**: `entrypoint.sh`
   - Runs at container startup
   - Reads `DOMAIN_NAME` environment variable
   - Generates `conf.d/app.conf` from template using `envsubst`
   - Validates nginx config syntax
   - Starts nginx daemon

## Environment Variables

### DOMAIN_NAME (Required)
Specifies the domain for SSL certificates and nginx configuration.

**Default**: `wps.test`

**Examples**:
```bash
# Local development
DOMAIN_NAME=wps.test

# Staging environment
DOMAIN_NAME=staging.wps.test

# Production
DOMAIN_NAME=my-production-domain.com
```

## SSL Certificates

Certificate files should be placed in `nginx/ssl/` with naming pattern:

```
nginx/ssl/${DOMAIN_NAME}.crt    # SSL certificate
nginx/ssl/${DOMAIN_NAME}.key    # SSL private key
```

### Example File Structure

```
nginx/ssl/
├── wps.test.crt
├── wps.test.key
├── staging.wps.test.crt
├── staging.wps.test.key
├── my-production-domain.com.crt
├── my-production-domain.com.key
└── .gitkeep
```

### Creating Certificates

**Development (self-signed)**:
```bash
openssl req -x509 -newkey rsa:2048 -keyout nginx/ssl/wps.test.key -out nginx/ssl/wps.test.crt -days 365 -nodes
```

**Production (Let's Encrypt)**:
```bash
sudo certbot certonly -d your-domain.com
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/your-domain.com.crt
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/your-domain.com.key
```

## Configuration Files

### app.conf (Generated)
**Do not edit directly.** This file is generated from `app.conf.template` at runtime.

### app.conf.template
**Edit this file** for nginx configuration changes. Contains:
- HTTP → HTTPS redirect
- SSL configuration with variable domain
- Health check endpoint
- Laravel routing (/admin, /api)
- Static asset serving
- PHP-FPM handler
- React SPA proxy

## Docker Usage

### Building

```bash
docker-compose build nginx
```

### Running Locally

```bash
# With default domain (wps.test)
docker-compose up -d

# With custom domain
DOMAIN_NAME=staging.wps.test docker-compose up -d
```

### Verification

Check that config was generated correctly:

```bash
# Check container logs
docker-compose logs nginx

# Verify config in running container
docker-compose exec nginx cat /etc/nginx/conf.d/app.conf

# Test nginx config syntax
docker-compose exec nginx nginx -t
```

## Troubleshooting

### Certificate File Not Found
```
SSL_ERROR_RX_RECORD_TOO_LONG
```
**Solution**: Verify certificate files exist:
```bash
ls -la nginx/ssl/${DOMAIN_NAME}.*
```

### Config Generation Failed
```
envsubst: command not found
```
**Solution**: Rebuild nginx image:
```bash
docker-compose build --no-cache nginx
```

### Invalid Configuration
```
[emerg] invalid SSL certificate
```
**Solution**:
1. Verify certificate format (PEM)
2. Check certificate expiration
3. Ensure private key matches certificate

## Maintenance

### Updating Configuration

1. Edit `nginx/conf.d/app.conf.template`
2. Test locally:
   ```bash
   docker-compose restart nginx
   docker-compose logs nginx
   ```
3. Verify with curl:
   ```bash
   curl -k https://localhost:8443/health
   ```

### Adding New Certificate

1. Place certificate files in `nginx/ssl/`
2. Update `DOMAIN_NAME` environment variable
3. Rebuild and restart container:
   ```bash
   docker-compose up -d --build nginx
   ```

### Certificate Renewal

For Let's Encrypt certificates:
```bash
sudo certbot renew
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/your-domain.com.crt
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/your-domain.com.key
docker-compose restart nginx
```

## Security Notes

⚠️ **Important**:
- SSL certificate files (`*.crt`, `*.key`) are in `.gitignore`
- Never commit private keys to version control
- Use strong certificate validation in production
- Regularly update SSL certificates before expiration
- Use TLSv1.2+ only (configured in template)
