# Use PHP 8.2 (CLI version is enough for php -S, but we can keep apache image and just not use it)
FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install mysqli intl gd zip

# Install Node.js (for building the frontend)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Allow Composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Install PHP dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --ignore-platform-reqs --no-scripts

# Build frontend
RUN npm install
RUN npm run build

# Set permissions for CI4
RUN mkdir -p writable/cache writable/logs writable/session writable/debugbar
RUN chown -R www-data:www-data writable
RUN chmod -R 775 writable

# Ensure public/dist exists
RUN mkdir -p public/dist

# Expose port
EXPOSE 8080

# Start PHP built-in server
# We use -t public to set the document root.
# We don't use a router script because CI4's index.php handles routing 
# and php -S naturally serves index.php for the root and missing files in the root.
# For nested routes, CI4's index.php will need to be hit.
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT} -t public"]
