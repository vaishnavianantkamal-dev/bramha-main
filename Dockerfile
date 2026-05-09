# Use PHP 8.2 with Apache
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

# Enable Apache mod_rewrite
RUN a2enmod rewrite

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

# Configure Apache Document Root to /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Fix Apache port for Railway
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Set permissions for CI4
RUN mkdir -p writable/cache writable/logs writable/session writable/debugbar
RUN chown -R www-data:www-data writable
RUN chmod -R 775 writable

# Ensure public/dist exists (prevent errors if build failed but didn't stop)
RUN mkdir -p public/dist

# Expose port (Railway will override this with $PORT)
EXPOSE 8080

# Start Apache
CMD ["apache2-foreground"]
