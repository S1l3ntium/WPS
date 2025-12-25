# Deployment Guide - World Public Summit (WPS)

**Last Updated:** December 25, 2025
**Target Environment:** Production Linux Server

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Application Deployment](#application-deployment)
4. [Database Setup](#database-setup)
5. [Web Server Configuration](#web-server-configuration)
6. [SSL/TLS Setup](#ssltls-setup)
7. [Verification](#verification)
8. [Maintenance](#maintenance)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **OS:** Ubuntu 20.04 LTS or later / CentOS 8+
- **PHP:** 8.1 or higher
- **Database:** MySQL 8.0 or PostgreSQL 12+
- **Web Server:** Nginx 1.18+
- **Memory:** Minimum 2GB RAM, recommended 4GB+
- **Disk:** Minimum 10GB free space

### Required Software
```bash
# Check versions
php -v
mysql --version
nginx -v
```

---

## Server Setup

### 1. Update System
```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install PHP and Extensions
```bash
sudo apt install -y php8.1-fpm php8.1-cli php8.1-mysql php8.1-pgsql \
  php8.1-json php8.1-xml php8.1-mbstring php8.1-curl php8.1-zip \
  php8.1-gd php8.1-opcache php8.1-redis
```

### 3. Install Composer
```bash
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
```

### 4. Install Nginx
```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 5. Install MySQL (or PostgreSQL)
```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation

# Create database and user
sudo mysql -u root -p << EOF
CREATE DATABASE wps_production;
CREATE USER 'wps_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON wps_production.* TO 'wps_user'@'localhost';
FLUSH PRIVILEGES;
EOF
```

### 6. Install Redis (Optional but recommended)
```bash
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

---

## Application Deployment

### 1. Clone Repository
```bash
cd /var/www
sudo git clone https://github.com/yourusername/wps.git
cd wps
```

### 2. Set Permissions
```bash
sudo chown -R www-data:www-data /var/www/wps
sudo chmod -R 755 /var/www/wps
sudo chmod -R 775 /var/www/wps/storage
sudo chmod -R 775 /var/www/wps/bootstrap/cache
```

### 3. Copy Environment Configuration
```bash
cd /var/www/wps/wps-laravel
sudo cp .env.production .env
sudo nano .env  # Edit with your production settings
```

**Critical .env Values:**
```env
APP_NAME="World Public Summit"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://wps.example.com
APP_KEY=base64:xxxxx  # Generate with: php artisan key:generate

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=wps_production
DB_USERNAME=wps_user
DB_PASSWORD=your_secure_password

CACHE_STORE=file
SESSION_DRIVER=cookie
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=your_email@example.com
MAIL_PASSWORD=your_email_password
MAIL_FROM_ADDRESS=noreply@wps.example.com
```

### 4. Install Dependencies
```bash
cd /var/www/wps/wps-laravel
sudo composer install --no-dev --optimize-autoloader
```

### 5. Generate Application Key
```bash
php artisan key:generate
```

### 6. Cache Configuration
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

---

## Database Setup

### 1. Run Migrations
```bash
cd /var/www/wps/wps-laravel
php artisan migrate --force
```

### 2. Seed Database (Optional)
```bash
php artisan db:seed --class=ProductionSeeder
```

### 3. Add Performance Indexes
```bash
php artisan migrate --path=database/migrations/2025_12_25_094156_add_performance_indexes.php
```

### 4. Verify Database
```bash
php artisan tinker
>>> DB::connection()->getPdo();
>>> DB::select('SELECT VERSION()');
```

---

## Web Server Configuration

### Nginx Configuration
Create file: `/etc/nginx/sites-available/wps`

```nginx
server {
    listen 80;
    server_name wps.example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name wps.example.com;
    root /var/www/wps/wps-laravel/public;
    index index.php index.html;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/wps.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/wps.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # Logging
    access_log /var/log/nginx/wps_access.log;
    error_log /var/log/nginx/wps_error.log;

    # Laravel routing
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP-FPM Configuration
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;

        # Performance optimization
        fastcgi_buffer_size 128k;
        fastcgi_buffers 8 256k;
    }

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
    }

    location ~ /config/ {
        deny all;
    }
}
```

### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/wps /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

## SSL/TLS Setup

### Using Let's Encrypt (Recommended)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d wps.example.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Manual Certificate (if using custom CA)
```bash
# Copy your certificate files
sudo cp your_certificate.crt /etc/letsencrypt/live/wps.example.com/fullchain.pem
sudo cp your_private_key.key /etc/letsencrypt/live/wps.example.com/privkey.pem
sudo chmod 600 /etc/letsencrypt/live/wps.example.com/privkey.pem
```

---

## Frontend Deployment (Vue.js)

### 1. Build Frontend
```bash
cd /var/www/wps/wps-frontend
npm install
npm run build
```

### 2. Deploy Built Files
```bash
# Copy dist folder to Nginx root or configure separate domain
sudo cp -r dist/* /var/www/wps/wps-laravel/public/
```

### 3. Or Setup Separate Nginx Config for SPA
```nginx
server {
    listen 443 ssl http2;
    server_name app.wps.example.com;
    root /var/www/wps/wps-frontend/dist;
    index index.html;

    # SPA routing - all requests go to index.html
    location / {
        try_files $uri /index.html;
    }

    # API proxy to backend
    location /api/ {
        proxy_pass https://api.wps.example.com/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # ... SSL configuration (same as above)
}
```

---

## Post-Deployment Verification

### 1. Check Application Status
```bash
cd /var/www/wps/wps-laravel

# Check application health
php artisan tinker
>>> app()->isProduction()
>>> config('app.debug')

# Verify database connection
php artisan db
```

### 2. Test API Endpoints
```bash
# Test main endpoints
curl -I https://wps.example.com/api/events
curl https://wps.example.com/api/events?page=1&per_page=5

# Check response headers
curl -i https://wps.example.com/api/events
```

### 3. Monitor Logs
```bash
# Application logs
tail -f /var/www/wps/wps-laravel/storage/logs/laravel.log

# Nginx access logs
tail -f /var/log/nginx/wps_access.log

# Nginx error logs
tail -f /var/log/nginx/wps_error.log

# PHP-FPM logs
tail -f /var/log/php8.1-fpm.log
```

### 4. Verify SSL
```bash
# Check certificate validity
sudo certbot certificates

# Test SSL grade
curl -I https://wps.example.com
openssl s_client -connect wps.example.com:443
```

---

## Maintenance

### Regular Tasks

#### Daily
```bash
# Monitor logs for errors
grep "ERROR" /var/www/wps/wps-laravel/storage/logs/laravel.log

# Check disk space
df -h
```

#### Weekly
```bash
# Clear old logs
cd /var/www/wps/wps-laravel
php artisan logs:clear

# Update composer dependencies
composer update --no-dev
php artisan config:cache
```

#### Monthly
```bash
# Check security vulnerabilities
composer audit

# Verify backups are working
```

#### Quarterly
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Verify SSL certificate expiration
sudo certbot certificates
```

### Backup Strategy

#### Automated Backup Script
```bash
#!/bin/bash
BACKUP_DIR="/backups/wps"
APP_DIR="/var/www/wps/wps-laravel"
DB_NAME="wps_production"
DB_USER="wps_user"

# Create backup directory
mkdir -p $BACKUP_DIR/$(date +%Y-%m-%d)

# Backup database
mysqldump -u $DB_USER -p $DB_NAME > $BACKUP_DIR/$(date +%Y-%m-%d)/database.sql

# Backup application files
tar -czf $BACKUP_DIR/$(date +%Y-%m-%d)/app.tar.gz $APP_DIR

# Delete old backups (keep 30 days)
find $BACKUP_DIR -type d -mtime +30 -exec rm -rf {} \;
```

#### Setup Cron Job
```bash
# Edit crontab
sudo crontab -e

# Add backup job (daily at 2 AM)
0 2 * * * /usr/local/bin/backup-wps.sh
```

---

## Troubleshooting

### 500 Internal Server Error
```bash
# Check Laravel logs
tail -f /var/www/wps/wps-laravel/storage/logs/laravel.log

# Verify permissions
sudo chown -R www-data:www-data /var/www/wps
sudo chmod -R 775 /var/www/wps/storage

# Clear cache
cd /var/www/wps/wps-laravel
php artisan cache:clear
php artisan config:cache
```

### Database Connection Error
```bash
# Test connection
mysql -u wps_user -p -h 127.0.0.1 wps_production

# Check .env file
grep DB_ /var/www/wps/wps-laravel/.env

# Verify MySQL is running
sudo systemctl status mysql
```

### High Server Load
```bash
# Check running processes
top
ps aux | grep php

# Restart PHP-FPM
sudo systemctl restart php8.1-fpm

# Clear cache
php artisan cache:clear
```

### SSL Certificate Issues
```bash
# Renew certificate manually
sudo certbot renew --force-renewal

# Check certificate details
openssl x509 -in /etc/letsencrypt/live/wps.example.com/fullchain.pem -text -noout
```

---

## Rollback Procedure

### If Deployment Fails
```bash
# Revert to previous version
cd /var/www/wps
sudo git revert HEAD --no-edit
cd wps-laravel

# Clear caches
php artisan cache:clear
php artisan config:cache

# Restart services
sudo systemctl restart php8.1-fpm
sudo systemctl reload nginx
```

---

## Contact & Support

- **DevOps:** devops@wps.example.com
- **Database Admin:** dba@wps.example.com
- **Security Issues:** security@wps.example.com

---

**Version:** 1.0
**Last Tested:** December 25, 2025
**Next Review:** March 25, 2026
