#!/bin/bash
set -e

echo "Starting WPS Application..."

# Wait for database
echo "Waiting for PostgreSQL..."
until pg_isready -h postgres -U postgres; do
  sleep 1
done

echo "PostgreSQL is ready!"

# Clear and cache config
echo "Clearing cache..."
php artisan cache:clear || true
php artisan config:clear || true

echo "Caching config..."
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

# Storage permissions
echo "Setting permissions..."
chmod -R 775 storage bootstrap/cache || true

echo "Application started successfully!"

exec "$@"
