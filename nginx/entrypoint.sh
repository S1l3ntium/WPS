#!/bin/sh
# nginx entrypoint: substitute environment variables in config

set -e

# Используем переменные из .env или Docker environment
DOMAIN_NAME="${DOMAIN_NAME:-wps.test}"

echo "=========================================="
echo "nginx Configuration Setup"
echo "=========================================="
echo "Domain: $DOMAIN_NAME"
echo ""

# Проверяем наличие шаблона
if [ -f /etc/nginx/conf.d/app.conf.template ]; then
    echo "Generating nginx config from template..."

    # Используем envsubst для замены переменных
    export DOMAIN_NAME
    envsubst '${DOMAIN_NAME}' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/app.conf

    echo "✓ Config generated successfully"

    # Проверяем синтаксис конфига
    echo "Validating nginx config..."
    if nginx -t 2>&1; then
        echo "✓ nginx configuration is valid"
    else
        echo "✗ Error in nginx configuration!"
        exit 1
    fi
else
    echo "✗ Template file not found: /etc/nginx/conf.d/app.conf.template"
    exit 1
fi

echo ""
echo "=========================================="
echo "Starting nginx..."
echo "=========================================="

# Запускаем nginx
exec nginx -g 'daemon off;'
