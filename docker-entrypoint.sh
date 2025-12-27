#!/bin/bash
set -e

echo "Starting WPS Application..."

# Wait for database
echo "Waiting for PostgreSQL..."
until pg_isready -h postgres -U postgres; do
  sleep 1
done

echo "PostgreSQL is ready!"

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Clear and cache config
echo "Clearing cache..."
php artisan cache:clear
php artisan config:clear

echo "Caching config..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Storage permissions
echo "Setting permissions..."
chmod -R 775 storage bootstrap/cache

echo "Application started successfully!"

exec "$@"
