FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    libpq-dev \
    libzip-dev \
    libonig-dev \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_pgsql \
    zip \
    bcmath \
    mbstring \
    opcache

# Install Redis PHP extension using PECL
RUN pecl install redis && docker-php-ext-enable redis

# Copy PHP configuration
COPY php.ini /usr/local/etc/php/conf.d/99-custom.ini

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy application files but exclude vendor
COPY --chown=www-data:www-data . .
RUN rm -rf vendor composer.lock

# Create required directories before composer install (artisan needs these)
RUN mkdir -p /app/bootstrap/cache \
    /app/storage/logs \
    /app/storage/framework/sessions \
    /app/storage/framework/views \
    /app/storage/framework/cache \
    /app/storage/framework/testing && \
    chmod -R 777 /app/bootstrap/cache /app/storage/framework/cache

# Copy .env.example as .env for composer to work
RUN cp .env.example .env

# Install dependencies (skip scripts that need DB, run them in container startup)
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts || true

# Now run post-autoload script with proper environment
RUN composer run-script post-autoload-dump || true

# Set permissions
RUN chown -R www-data:www-data /app && \
    chmod -R 755 /app && \
    mkdir -p /app/storage/logs /app/storage/framework/{sessions,views,cache,testing} && \
    chmod -R 775 /app/storage /app/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
