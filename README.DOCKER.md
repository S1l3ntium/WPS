# WPS Docker Quick Start

## 🚀 One-Command Startup

```bash
# 1. Setup environment
cp .env.docker .env

# 2. Build and start
docker-compose up -d --build

# 3. Initialize database
docker-compose exec laravel php artisan migrate --force
docker-compose exec laravel php artisan db:seed

# 4. Done! Access at:
# Frontend: http://localhost
# API: http://localhost/api
# Admin: http://localhost/admin
```

## 📦 What's Included

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| PostgreSQL | postgres:15-alpine | 5432 | Main database |
| Redis | redis:7-alpine | 6379 | Cache & Queue |
| Laravel | Custom PHP 8.2-FPM | 9000 | Backend API |
| React | Custom Node 20 | 3000 | Frontend |
| Nginx | nginx:alpine | 80/443 | Reverse Proxy |

## 🛠️ Common Tasks

### Using Make (Recommended)

```bash
make up              # Start all containers
make down            # Stop all containers
make logs            # View logs
make shell           # Open Laravel shell
make migrate         # Run migrations
make seed            # Seed database
make fresh           # Migrate + seed
make status          # Show container status
```

### Using Docker Compose

```bash
docker-compose up -d                    # Start
docker-compose down                     # Stop
docker-compose logs -f laravel          # View logs
docker-compose exec laravel bash        # Shell
docker-compose restart nginx            # Restart service
```

## 📋 Requirements

- Docker >= 20.10
- Docker Compose >= 1.29
- 4GB+ RAM
- 10GB+ disk space

## 🔧 Configuration

Edit `.env` to customize:

```env
APP_URL=https://yourdomain.com
DB_PASSWORD=your_secure_password
REDIS_PASSWORD=your_redis_password
```

## 🌐 Service URLs

- **Frontend**: http://localhost
- **API**: http://localhost/api
- **Admin Panel**: http://localhost/admin
- **Health Check**: http://localhost/health

## 📚 Full Documentation

See [DOCKER.md](./DOCKER.md) for comprehensive guide including:

- Architecture overview
- Production deployment
- SSL/TLS configuration
- Backup & recovery
- Performance optimization
- Kubernetes deployment
- Troubleshooting

## 🔐 Security

✅ Features included:
- Multi-stage Docker builds
- Non-root containers
- Security headers in Nginx
- Network isolation
- Health checks
- HTTPS ready

## 💾 Database

```bash
# Backup
docker-compose exec postgres pg_dump -U postgres wps > backup.sql

# Restore
cat backup.sql | docker-compose exec -T postgres psql -U postgres -d wps

# Access shell
docker-compose exec postgres psql -U postgres -d wps
```

## 🐛 Troubleshooting

```bash
# Check service status
docker-compose ps

# View all logs
docker-compose logs

# Rebuild containers
docker-compose build --no-cache

# Reset everything
docker-compose down -v
docker-compose up -d --build
```

## 📦 Production Deployment

For AWS, GCP, Azure, or self-hosted:

1. Update `.env` with production values
2. Generate `APP_KEY`: `docker run --rm php:8.2-cli php -r "echo bin2hex(random_bytes(16));"`
3. Configure SSL certificates in `nginx/ssl/`
4. Run: `docker-compose -f docker-compose.yml up -d`

See [DOCKER.md](./DOCKER.md#production-deployment) for detailed steps.

## 🆘 Need Help?

1. Check logs: `docker-compose logs`
2. Verify health: `make health` or `docker-compose ps`
3. Read [DOCKER.md](./DOCKER.md#troubleshooting)
4. Open an issue on GitHub

## 📄 License

See LICENSE file in the root directory.
