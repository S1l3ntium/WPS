# WPS Docker Deployment Guide

## Overview

This project uses Docker for containerization and is optimized for both development and production environments. The setup includes:

- **PostgreSQL 15**: Primary database
- **Redis 7**: Caching and queue system
- **PHP 8.2-FPM**: Laravel backend
- **Node 20**: React frontend with production build
- **Nginx Alpine**: Reverse proxy and load balancer

## Architecture

```
Internet
    ↓
[Nginx Reverse Proxy] (Port 80/443)
    ↓
    ├─→ [Frontend] (React - Port 3000)
    ├─→ [Laravel API] (PHP-FPM - Port 9000)
    └─→ [Storage/Assets]
    ↓
[PostgreSQL] (Database)
[Redis] (Cache & Queue)
```

## Prerequisites

- Docker >= 20.10
- Docker Compose >= 1.29
- Make (optional, for convenience commands)

## Quick Start

### 1. Clone and Setup

```bash
cd /path/to/WPS
cp .env.docker .env
```

### 2. Generate Laravel Key

```bash
docker run --rm \
  -v $(pwd)/wps-laravel:/app \
  php:8.2-cli \
  php -r "echo bin2hex(random_bytes(16));" > /tmp/key.txt

# Update APP_KEY in .env with the generated key
```

### 3. Build and Start

```bash
# Using Make (recommended)
make build
make up

# Or using Docker Compose directly
docker-compose build
docker-compose up -d
```

### 4. Initialize Database

```bash
make migrate
make seed
```

### 5. Verify Services

```bash
make status

# Or check manually
curl http://localhost/health
```

## Service URLs (Development)

- **Frontend**: http://localhost
- **API**: http://localhost/api
- **Admin Panel**: http://localhost/admin
- **API Documentation**: http://localhost/api/documentation

## Common Commands

### Container Management

```bash
# View logs
make logs
make logs | grep laravel

# Open shell
make shell

# Stop/Start
make down
make up
make restart
```

### Database Operations

```bash
# Run migrations
make migrate

# Seed with test data
make seed

# Fresh start (migrate + seed)
make fresh

# Backup database
make backup-db

# Access database directly
docker-compose exec postgres psql -U postgres -d wps
```

### Laravel Commands

```bash
# Access tinker
make tinker

# Or directly
docker-compose exec laravel php artisan tinker

# Clear cache
docker-compose exec laravel php artisan cache:clear
docker-compose exec laravel php artisan config:clear

# Run tests
docker-compose exec laravel php artisan test
```

### Frontend Commands

```bash
# Build frontend
docker-compose exec frontend npm run build

# Watch mode
docker-compose exec frontend npm run dev
```

## Configuration

### Environment Variables

Key variables in `.env.docker`:

```env
# Application
APP_NAME=World Public Summit
APP_ENV=production
APP_DEBUG=false
APP_URL=https://worldpublicsummit.com

# Database
DB_HOST=postgres
DB_DATABASE=wps
DB_USERNAME=postgres
DB_PASSWORD=change_me_in_production

# Redis
CACHE_DRIVER=redis
REDIS_HOST=redis
QUEUE_CONNECTION=redis
```

### Nginx Configuration

Located in `nginx/conf.d/default.conf`:

- **API Routes**: `/api/*` → Laravel backend
- **Admin Routes**: `/admin/*` → Laravel backend
- **Static Assets**: `/storage/*` → Laravel storage
- **Frontend Routes**: `/*` → React application
- **Health Check**: `/health` → Returns 200 OK

### SSL/TLS Setup

To enable HTTPS:

1. Place SSL certificates in `nginx/ssl/`:
   - `cert.pem` - Certificate
   - `key.pem` - Private key

2. Uncomment the HTTPS section in `nginx/conf.d/default.conf`

3. Restart Nginx:
   ```bash
   docker-compose restart nginx
   ```

## Performance Optimization

### Database

- Connection pooling via Nginx
- Prepared statements
- Query result caching via Redis
- Automatic slow query logging (> 1 second)

### Caching Strategy

1. **HTTP Caching**: 30-day expiry for assets
2. **Redis Cache**: 1-hour cache for API responses
3. **Query Caching**: Automatic through Eloquent
4. **View Caching**: Production build

### Gzip Compression

Enabled in Nginx for:
- text/plain, text/css
- text/javascript, application/javascript
- JSON, XML, fonts, SVG

## Monitoring & Health Checks

Each service includes health checks:

```bash
# Check all services
docker-compose ps

# Manual health check
curl http://localhost/health

# Check specific services
docker-compose exec postgres pg_isready
docker-compose exec redis redis-cli ping
docker-compose exec laravel curl -f http://localhost:9000/health
```

## Backup & Recovery

### Automated Backups

```bash
# Backup database
make backup-db

# List backups
ls backup_*.sql
```

### Manual Database Dump

```bash
docker-compose exec postgres pg_dump -U postgres wps > dump.sql
```

### Restore from Backup

```bash
cat backup_20231228_120000.sql | \
docker-compose exec -T postgres psql -U postgres -d wps
```

## Scaling

### Horizontal Scaling

For production with multiple instances:

1. Use a load balancer (AWS ELB, Nginx, HAProxy)
2. Configure session storage to Redis (already done)
3. Use shared storage for uploads (S3, NFS, or mounted volume)

### Resource Limits

Set in `docker-compose.yml`:

```yaml
services:
  laravel:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

## Troubleshooting

### Services won't start

```bash
# Check logs
docker-compose logs

# Rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Database connection issues

```bash
# Verify PostgreSQL
docker-compose exec postgres pg_isready

# Check credentials
docker-compose exec laravel php artisan tinker
>>> DB::connection()->getPdo();
```

### Redis cache issues

```bash
# Check Redis
docker-compose exec redis redis-cli ping

# Clear Redis
docker-compose exec redis redis-cli FLUSHALL
```

### Nginx routing issues

```bash
# Test Nginx config
docker-compose exec nginx nginx -t

# Check logs
docker-compose logs nginx
```

## Production Deployment

### Pre-deployment Checklist

- [ ] Update `APP_KEY` in `.env`
- [ ] Set `APP_DEBUG=false`
- [ ] Configure `APP_URL` with actual domain
- [ ] Update database credentials
- [ ] Configure email settings
- [ ] Set up SSL certificates
- [ ] Configure backups
- [ ] Set resource limits
- [ ] Enable monitoring

### Deployment Steps

```bash
# 1. Build images
make prod-build

# 2. Start services
make prod-up

# 3. Run migrations
make migrate

# 4. Seed (if needed)
make seed

# 5. Verify
make health
```

### Docker Swarm Deployment

For multi-host deployment:

```bash
# Initialize Swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml wps
```

### Kubernetes Deployment

For cloud-native deployment, generate Kubernetes manifests:

```bash
# Using Kompose
kompose convert -f docker-compose.yml -o k8s/

# Or use official Helm charts for PostgreSQL, Redis
```

## Security Best Practices

✅ **Implemented**:
- Multi-stage Docker builds (smaller images)
- Non-root user in containers
- Health checks
- Network isolation
- Environment variable separation
- Security headers in Nginx
- HTTPS ready

⚠️ **To Implement**:
- [ ] Secret management (Vault, Secrets Manager)
- [ ] Image scanning (Trivy, Aqua)
- [ ] Container scanning in CI/CD
- [ ] Network policies
- [ ] RBAC in Kubernetes
- [ ] Regular security updates
- [ ] Log aggregation (ELK, Splunk)

## Maintenance

### Regular Tasks

```bash
# Weekly: Update dependencies
docker-compose build --no-cache

# Monthly: Prune unused images/volumes
docker system prune -a

# Quarterly: Review logs and metrics
docker-compose logs | tail -1000
```

### Database Optimization

```bash
# Analyze tables
docker-compose exec postgres psql -U postgres -d wps \
  -c "ANALYZE;"

# Reindex
docker-compose exec postgres psql -U postgres -d wps \
  -c "REINDEX DATABASE wps;"
```

## Support

For issues and questions:

1. Check Docker logs: `make logs`
2. Check application logs: `docker-compose exec laravel tail -f storage/logs/laravel.log`
3. Verify all services are healthy: `make health`

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Laravel Docker Documentation](https://laravel.com/docs/deployment#docker)
- [Nginx Best Practices](https://nginx.org/en/docs/)
