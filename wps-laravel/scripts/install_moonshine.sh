#!/usr/bin/env bash
set -e

echo "=== Установка MoonShine ==="

composer require moonshine/moonshine

echo "Публикация ресурсов и конфигов (если есть)"
php artisan vendor:publish --tag=moonshine-config --force || true

echo "Запуск инсталлятора MoonShine"
php artisan moonshine:install -Q || true

echo "Миграции и сидеры"
php artisan migrate --force
php artisan db:seed --class=AdminUserSeeder --force || true

echo "Готово. Админ: admin@example.com / secret (если сидер не изменён)"
