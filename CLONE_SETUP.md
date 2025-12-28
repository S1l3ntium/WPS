# WPS Project Clones Setup Guide

## Overview

The WPS (World Public Summit) project architecture supports multiple independent clones for different regional events (Africa, Asia, Europe, etc.). Each clone is a separate instance with its own database, configuration, and frontend customization.

### Clone Structure

```
/Work/WPS/
├── wps-frontend/          # Shared frontend codebase
├── wps-laravel/           # Shared backend codebase
├── nginx/                 # Shared nginx config
├── docker-compose.yml     # Main project
│
└── [CLONES - separate directories]
    ├── wps-africa/                # Africa clone instance
    │   ├── docker-compose.yml     # Clone-specific compose
    │   ├── .env.docker            # Clone-specific env
    │   └── nginx/                 # Clone-specific nginx config
    │
    ├── wps-asia/                  # Asia clone instance
    └── wps-europe/                # Europe clone instance
```

## Setting Up a Clone

### Step 1: Create Clone Directory

```bash
# Example: Create Africa clone
mkdir -p /Volumes/ADATA\ LEGEND\ 900/Work/wps-africa
cd /Volumes/ADATA\ LEGEND\ 900/Work/wps-africa
```

### Step 2: Copy Configuration Files

```bash
# Copy docker-compose.yml and modify ports
cp ../WPS/docker-compose.yml ./docker-compose.yml

# Copy nginx config
mkdir -p nginx/conf.d nginx/ssl
cp -r ../WPS/nginx/conf.d/* ./nginx/conf.d/
cp -r ../WPS/nginx/ssl/* ./nginx/ssl/

# Copy environment file
cp ../WPS/.env.docker ./.env.docker
```

### Step 3: Update Ports for Clone

Edit `docker-compose.yml` to use unique ports for each clone:

```yaml
# For Africa clone (example)
services:
  postgres:
    ports:
      - "5433:5432"  # Changed from 5432

  redis:
    ports:
      - "6380:6379"  # Changed from 6379

  nginx:
    ports:
      - "8080:80"    # Changed from 80
      - "8443:443"   # Changed from 443
```

**Port Assignment Table**:
| Clone | HTTP | HTTPS | PostgreSQL | Redis |
|-------|------|-------|------------|-------|
| Main WPS | 80 | 443 | 5432 | 6379 |
| Africa | 8080 | 8443 | 5433 | 6380 |
| Asia | 8081 | 8444 | 5434 | 6381 |
| Europe | 8082 | 8445 | 5435 | 6382 |

### Step 4: Update Container Names

Edit `docker-compose.yml` to use clone-specific container names:

```yaml
services:
  postgres:
    container_name: wps-africa-postgres

  redis:
    container_name: wps-africa-redis

  laravel:
    container_name: wps-africa-laravel

  frontend:
    container_name: wps-africa-frontend

  nginx:
    container_name: wps-africa-nginx

networks:
  wps-network:
    name: wps-africa-network  # Unique network per clone
```

### Step 5: Update Hosts File (Optional)

```bash
# Add entry for clone (macOS)
echo "127.0.0.1    wps-africa.test" | sudo tee -a /etc/hosts

# Or manually edit /etc/hosts
# 127.0.0.1    wps-africa.test
```

### Step 6: Update Environment Configuration

Edit `.env.docker`:

```bash
# Change app URL
APP_URL=http://wps-africa.test

# Change database name (optional, for separate databases per clone)
DB_DATABASE=wps_africa

# Change cache prefix (to avoid collision)
CACHE_PREFIX=wps_africa_
```

### Step 7: Symlink or Copy Source Code

Option A: Symlink to shared codebase (recommended for development)
```bash
ln -s ../WPS/wps-laravel ./wps-laravel
ln -s ../WPS/wps-frontend ./wps-frontend
```

Option B: Copy for complete independence
```bash
cp -r ../WPS/wps-laravel ./wps-laravel
cp -r ../WPS/wps-frontend ./wps-frontend
```

### Step 8: Generate SSL Certificate for Clone

```bash
openssl req -x509 -newkey rsa:2048 \
  -keyout "nginx/ssl/wps-africa.test.key" \
  -out "nginx/ssl/wps-africa.test.crt" \
  -days 365 -nodes \
  -subj "/CN=wps-africa.test/O=WPS/C=RU"
```

### Step 9: Update Nginx Config for Clone

Edit `nginx/conf.d/app.conf` to reference clone-specific SSL files:

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    ssl_certificate /etc/nginx/ssl/wps-africa.test.crt;
    ssl_certificate_key /etc/nginx/ssl/wps-africa.test.key;

    # ... rest of config
}
```

### Step 10: Start Clone

```bash
cd /Volumes/ADATA\ LEGEND\ 900/Work/wps-africa

# Start containers
docker compose up -d

# Run migrations
docker compose exec -T laravel php artisan migrate --force

# Run seeders (or use clone-specific seeders)
docker compose exec -T laravel php artisan db:seed

# View logs
docker compose logs -f
```

### Step 11: Verify Clone is Running

```bash
# Check containers
docker compose ps

# Test frontend
curl -k https://wps-africa.test/

# Test API
curl -k https://wps-africa.test/api/competitions
```

## Clone-Specific Customization

### Frontend Customization

If using symlinks, create clone-specific overrides:

```bash
# Create clone-specific styles
mkdir -p wps-frontend/src/styles/clones
cat > wps-frontend/src/styles/clones/africa.css << 'EOF'
:root {
  --primary-color: #ff6b35;
  --secondary-color: #004e89;
  --accent-color: #f7b32b;
}
EOF
```

### Database Customization

Create clone-specific seeders:

```bash
# Create Africa-specific seeder
docker compose exec -T laravel php artisan make:seeder AfricaCompetitionSeeder

# Run it
docker compose exec -T laravel php artisan db:seed --class=AfricaCompetitionSeeder
```

### Environment Variables

Per-clone configuration:

```bash
# .env.docker for Africa clone
CLONE_NAME=africa
CLONE_REGION=Africa
CLONE_TIMEZONE=Africa/Johannesburg

# Unique identifiers
STRIPE_ACCOUNT_ID=acct_africa_123
AWS_REGION=af-south-1
```

## Managing Multiple Clones

### Start/Stop All Clones

```bash
# Start all
for clone in main africa asia europe; do
  echo "Starting $clone..."
  cd /Volumes/ADATA\ LEGEND\ 900/Work/wps-$clone
  docker compose up -d
done

# Stop all
for clone in main africa asia europe; do
  echo "Stopping $clone..."
  cd /Volumes/ADATA\ LEGEND\ 900/Work/wps-$clone
  docker compose down
done
```

### Monitor All Clones

```bash
# Create monitoring script
cat > /tmp/monitor-wps.sh << 'EOF'
#!/bin/bash
echo "=== WPS Clone Status ==="
for clone in main africa asia europe; do
  echo ""
  echo "--- Clone: $clone ---"
  cd /Volumes/ADATA\ LEGEND\ 900/Work/wps-$clone
  docker compose ps
done
EOF

chmod +x /tmp/monitor-wps.sh
/tmp/monitor-wps.sh
```

### Backup Clone Databases

```bash
# Backup Africa clone database
docker compose exec -T postgres pg_dump -U postgres wps_africa > backup-africa-$(date +%Y%m%d).sql

# Backup all clone databases
for clone in africa asia europe; do
  docker compose exec -T postgres pg_dump -U postgres wps_$clone > backup-${clone}-$(date +%Y%m%d).sql
done
```

### Restore Clone Database

```bash
# Restore Africa clone from backup
docker compose exec -T postgres psql -U postgres wps_africa < backup-africa-20251228.sql
```

## Clone Deployment to Production

### Production Clone Structure

```
production/
├── wps-africa.worldpublicsummit.org/
│   ├── docker-compose.yml
│   ├── .env.production
│   ├── wps-laravel/
│   ├── wps-frontend/
│   └── nginx/
```

### Production Configuration Checklist

- [ ] Update `APP_URL` to production domain
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Configure real SSL certificates (Let's Encrypt)
- [ ] Set strong `APP_KEY`
- [ ] Configure production database credentials
- [ ] Set up automated backups
- [ ] Configure CDN for static assets
- [ ] Set up monitoring/logging
- [ ] Configure email for notifications
- [ ] Set up rate limiting
- [ ] Configure CORS for API
- [ ] Enable HTTPS redirect
- [ ] Set up SSL certificate renewal

### Production Docker Compose Changes

```yaml
# Production .env variables
services:
  laravel:
    environment:
      APP_ENV: production
      APP_DEBUG: false
    restart: always
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 1G
        reservations:
          cpus: '1'
          memory: 512M

  postgres:
    restart: always
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups

  nginx:
    restart: always
    environment:
      - NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d
```

## Troubleshooting Clones

### Port Conflicts

```bash
# Check which process is using port
lsof -i :8080

# Kill process if needed
kill -9 <PID>
```

### DNS Resolution (clones on different hosts)

Add to `/etc/hosts`:
```
127.0.0.1    wps.test
127.0.0.1    wps-africa.test
127.0.0.1    wps-asia.test
127.0.0.1    wps-europe.test
```

### Shared Code Updates

If using symlinks, pulling updates to main repo:
```bash
cd ../WPS
git pull
# All clones automatically get updates since they symlink
```

If using copies, update each clone:
```bash
for clone in africa asia europe; do
  cp -r ../WPS/wps-laravel/* ./wps-laravel/
  cp -r ../WPS/wps-frontend/* ./wps-frontend/
done
```

### Database Isolation

Each clone should use separate database:
```bash
# Create separate databases
docker compose exec -T postgres psql -U postgres -c "CREATE DATABASE wps_africa;"
docker compose exec -T postgres psql -U postgres -c "CREATE DATABASE wps_asia;"
docker compose exec -T postgres psql -U postgres -c "CREATE DATABASE wps_europe;"

# Update .env.docker DB_DATABASE for each clone
```

## Example: Full Clone Setup Script

```bash
#!/bin/bash

CLONE_NAME="$1"
CLONE_PORT_HTTP=$((8080 + ${2:-0}))
CLONE_PORT_HTTPS=$((8443 + ${2:-0}))
CLONE_DB_PORT=$((5433 + ${2:-0}))
CLONE_REDIS_PORT=$((6380 + ${2:-0}))

echo "Setting up WPS clone: $CLONE_NAME"

# Create directory
mkdir -p "/Volumes/ADATA LEGEND 900/Work/wps-$CLONE_NAME"
cd "/Volumes/ADATA LEGEND 900/Work/wps-$CLONE_NAME"

# Copy files
cp ../WPS/docker-compose.yml .
mkdir -p nginx/conf.d nginx/ssl
cp -r ../WPS/nginx/conf.d/* ./nginx/conf.d/
cp ../WPS/.env.docker .

# Create symlinks
ln -s ../WPS/wps-laravel
ln -s ../WPS/wps-frontend

# Generate SSL certificate
openssl req -x509 -newkey rsa:2048 \
  -keyout "nginx/ssl/wps-$CLONE_NAME.test.key" \
  -out "nginx/ssl/wps-$CLONE_NAME.test.crt" \
  -days 365 -nodes \
  -subj "/CN=wps-$CLONE_NAME.test/O=WPS/C=RU"

# Update environment
sed -i '' "s|APP_URL=.*|APP_URL=https://wps-$CLONE_NAME.test|g" .env.docker
sed -i '' "s|CACHE_PREFIX=.*|CACHE_PREFIX=wps_${CLONE_NAME}_|g" .env.docker

# Update container names in docker-compose.yml
sed -i '' "s|container_name: wps-|container_name: wps-$CLONE_NAME-|g" docker-compose.yml
sed -i '' "s|name: wps_wps-network|name: wps-$CLONE_NAME-network|g" docker-compose.yml

# Update ports
sed -i '' "s|\"80:80\"|\"$CLONE_PORT_HTTP:80\"|g" docker-compose.yml
sed -i '' "s|\"443:443\"|\"$CLONE_PORT_HTTPS:443\"|g" docker-compose.yml
sed -i '' "s|\"5432:5432\"|\"$CLONE_DB_PORT:5432\"|g" docker-compose.yml
sed -i '' "s|\"6379:6379\"|\"$CLONE_REDIS_PORT:6379\"|g" docker-compose.yml

# Add to hosts file
echo "127.0.0.1    wps-$CLONE_NAME.test" | sudo tee -a /etc/hosts

echo "✓ Clone '$CLONE_NAME' created successfully"
echo "  Access at: https://wps-$CLONE_NAME.test:$CLONE_PORT_HTTPS"
echo "  Next: cd wps-$CLONE_NAME && docker compose up -d"
```

Usage:
```bash
chmod +x clone-setup.sh
./clone-setup.sh africa 0
./clone-setup.sh asia 1
./clone-setup.sh europe 2
```

---

**Last Updated**: 2025-12-28
**Version**: 1.0
