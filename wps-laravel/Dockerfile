# Multi-stage build for Laravel
FROM php:8.2-fpm as base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    libpq-dev \
    libzip-dev \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install -j$(nproc) \
    pdo_pgsql \
    zip \
    bcmath \
    ctype \
    json \
    mbstring \
    openssl

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy composer files
COPY composer.json composer.lock ./

# Install dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copy application files
COPY . .

# Set permissions
RUN chown -R www-data:www-data /app && \
    chmod -R 755 /app && \
    chmod -R 775 /app/storage /app/bootstrap/cache

# Expose port
EXPOSE 9000

# Health check
HEALTHCHECK --interval=10s --timeout=3s --start-period=40s --retries=3 \
    CMD php -r "exit((int)!fsockopen('127.0.0.1', 9000));"

CMD ["php-fpm"]
