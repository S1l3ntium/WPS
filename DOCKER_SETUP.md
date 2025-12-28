# WPS Docker Setup Guide

## Quick Start

### Prerequisites
- Docker Desktop installed and running
- Docker Compose version 3.9+
- macOS with `/etc/hosts` entry for `wps.test`

### Verify Prerequisites

```bash
# Check hosts file entry
grep "wps.test" /etc/hosts
# Should output: 127.0.0.1		wps.test

# Check Docker
docker --version
docker compose --version
```

### Start the Project

```bash
# Navigate to project root
cd /Volumes/ADATA\ LEGEND\ 900/Work/WPS

# Start all containers
docker compose up -d

# Wait for containers to be healthy (usually 30-60 seconds)
docker compose ps
```

### Initialize Database (First Time Only)

```bash
# Run migrations (happens automatically on startup)
docker compose logs laravel | grep -i "migrat"

# Run seeders to populate test data
docker compose exec -T laravel php artisan db:seed
```

### Access the Application

- **Frontend**: https://wps.test/
- **API**: https://wps.test/api/
- **Admin Panel**: https://wps.test/admin
- **Health Check**: https://wps.test/health

## Architecture Overview

### Services

| Service | Port | Role |
|---------|------|------|
| nginx | 80, 443 | Reverse proxy, SSL termination |
| laravel | 9000 | PHP-FPM backend API |
| frontend | 3000 | React development server |
| postgres | 5432 | Primary database |
| redis | 6379 | Cache & session store |

### Network
- All services communicate via internal Docker network `wps-network`
- Nginx routes traffic to Laravel (FastCGI) and React frontend
- Database and cache are isolated from external access

### Volumes
- `laravel_storage` - Laravel storage files
- `laravel_bootstrap` - Laravel bootstrap cache
- `postgres_data` - PostgreSQL database files
- `redis_data` - Redis persistence files

## Important Configuration Files

### Nginx Configuration
**File**: `nginx/conf.d/app.conf`

```nginx
# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name _;
    return 301 https://$host$request_uri;
}

# HTTPS server with SSL
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name _;

    ssl_certificate /etc/nginx/ssl/wps.test.crt;
    ssl_certificate_key /etc/nginx/ssl/wps.test.key;

    # /api/* → FastCGI to Laravel
    location /api { ... }

    # /* → HTTP proxy to React frontend
    location / { ... }
}
```

### Environment Configuration
**File**: `.env.docker`

Key settings:
- `APP_KEY` - Laravel encryption key
- `APP_ENV=development` - Development environment
- `APP_DEBUG=true` - Debug mode enabled
- `DB_HOST=postgres` - PostgreSQL service name
- `REDIS_HOST=redis` - Redis service name
- `CACHE_DRIVER=redis` - Use Redis for caching
- `SESSION_DRIVER=redis` - Use Redis for sessions

### Docker Compose
**File**: `docker-compose.yml`

Services configured with:
- Health checks for database and cache
- Automatic migrations on startup
- Volume mounts for development
- Dependency ordering

## Common Tasks

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f laravel
docker compose logs -f nginx
docker compose logs -f frontend

# Last 50 lines
docker compose logs --tail=50 laravel
```

### Access Database

```bash
# PostgreSQL CLI
docker compose exec -T postgres psql -U postgres -d wps

# Example queries:
# \dt - list all tables
# SELECT * FROM competitions; - list competitions
# \q - quit
```

### Access Cache

```bash
# Redis CLI
docker compose exec redis redis-cli

# Example commands:
# KEYS * - list all keys
# GET key_name - get value
# FLUSHDB - clear database
# EXIT - quit
```

### Execute Laravel Commands

```bash
# Artisan commands
docker compose exec -T laravel php artisan <command>

# Examples:
docker compose exec -T laravel php artisan tinker
docker compose exec -T laravel php artisan cache:clear
docker compose exec -T laravel php artisan config:cache
docker compose exec -T laravel php artisan migrate
docker compose exec -T laravel php artisan db:seed
```

### Restart Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart laravel
docker compose restart nginx
docker compose restart frontend
```

### Clean Up

```bash
# Stop and remove containers
docker compose down

# Stop, remove containers, and delete volumes
docker compose down -v

# Remove unused Docker resources
docker system prune -f
```

## Troubleshooting

### 502 Bad Gateway Error

**Causes**:
1. Local nginx running on port 80 (conflicts with Docker)
2. Laravel container not healthy
3. Nginx config errors

**Solutions**:
```bash
# Kill local nginx
pkill -9 nginx

# Check container health
docker compose ps

# View nginx logs
docker compose logs nginx

# Restart nginx
docker compose restart nginx
```

### Laravel Container Crashing

**Causes**:
1. Missing PHP extensions (Redis)
2. Missing bootstrap/cache directory
3. Database connection issues

**Solutions**:
```bash
# Check Laravel logs
docker compose logs laravel

# Ensure database is healthy
docker compose ps postgres

# Rebuild Laravel image
docker compose build --no-cache laravel
docker compose up -d laravel
```

### Database Connection Failed

**Causes**:
1. PostgreSQL not started
2. Wrong database credentials
3. Network connectivity issue

**Solutions**:
```bash
# Check PostgreSQL status
docker compose ps postgres

# View PostgreSQL logs
docker compose logs postgres

# Test connection from Laravel container
docker compose exec laravel php artisan tinker
>>> DB::connection()->getPdo();
```

### React Frontend Not Loading

**Causes**:
1. Frontend container crashed
2. Port 3000 already in use
3. Nginx proxy misconfiguration

**Solutions**:
```bash
# Check frontend logs
docker compose logs frontend

# Verify frontend is responding
curl http://127.0.0.1:3000/

# Restart frontend
docker compose restart frontend
```

## SSL Certificate

### Self-Signed Certificate for Development

The project includes a self-signed SSL certificate for `wps.test`:
- **Certificate**: `nginx/ssl/wps.test.crt`
- **Private Key**: `nginx/ssl/wps.test.key`
- **Validity**: 365 days from creation

Browser will show a security warning (expected for self-signed certs). To suppress warnings:

```bash
# macOS: Add certificate to Keychain
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain nginx/ssl/wps.test.crt

# Or manually in Keychain Access:
# 1. Open Keychain Access
# 2. Import nginx/ssl/wps.test.crt
# 3. Right-click → Get Info → Trust
# 4. Set "When using this certificate" to "Always Trust"
```

To regenerate certificate:
```bash
openssl req -x509 -newkey rsa:2048 \
  -keyout nginx/ssl/wps.test.key \
  -out nginx/ssl/wps.test.crt \
  -days 365 -nodes \
  -subj "/CN=wps.test/O=WPS/C=RU"
```

## Performance Notes

### Redis Caching
- Application uses Redis for query caching
- Laravel cache driver configured to use Redis
- Session data stored in Redis (not database)

### Database Optimization
- PostgreSQL 15 Alpine (lightweight image)
- Connection pooling via Laravel connection manager
- Migrations run automatically on startup

### Frontend Build
- React app built with Vite for fast development
- Development server with hot module replacement
- Production build in `dist/` directory

## Security Notes

⚠️ **Development Only**
- `.env.docker` contains development credentials
- SSL certificate is self-signed (not for production)
- Debug mode enabled (shows error details)
- Admin access not restricted (development environment)

**Before Production Deployment**:
1. Generate proper SSL certificates (Let's Encrypt)
2. Use production `.env` with secure credentials
3. Disable debug mode (`APP_DEBUG=false`)
4. Configure proper authentication/authorization
5. Set up database backups
6. Enable firewall rules
7. Use environment variables for sensitive data

## Monitoring

### Health Checks

Docker Compose automatically monitors:
- PostgreSQL health (responds to `pg_isready`)
- Redis health (responds to `PING`)
- Nginx health (responds to HTTP `/health` endpoint)
- Frontend health (responds to HTTP requests)

View health status:
```bash
docker compose ps
```

### Logs Rotation

Configure log rotation in Docker Daemon to prevent disk space issues:
```bash
# ~/.docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

## Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

**Last Updated**: 2025-12-28
**Version**: 1.0
