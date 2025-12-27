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

# Copy PHP configuration
COPY php.ini /usr/local/etc/php/conf.d/99-custom.ini

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy all application files
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction --ignore-platform-reqs 2>&1 || true

# Set permissions
RUN chown -R www-data:www-data /app && \
    chmod -R 755 /app && \
    mkdir -p /app/storage/logs /app/storage/framework/{sessions,views,cache,testing} && \
    chmod -R 775 /app/storage /app/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
