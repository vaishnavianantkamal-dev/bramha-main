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
    gnupg

# Install PHP extensions
RUN docker-php-ext-install mysqli intl gd zip

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install Node.js (for building the frontend)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Set working directory
WORKDIR /var/www/html

# Allow Composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Copy project files
COPY . .

# Install PHP dependencies
# We use --ignore-platform-reqs to avoid issues with missing extensions during build
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --ignore-platform-reqs

# Build frontend
RUN npm install
RUN npm run build

# Configure Apache Document Root to /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Set permissions for CI4
RUN chown -R www-data:www-data writable

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
