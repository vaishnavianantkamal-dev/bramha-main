FROM node:22-slim AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY vite.config.js ./
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./index.html
RUN npm run build

FROM php:8.2-cli
RUN apt-get update && apt-get install -y git unzip curl libzip-dev \
    && docker-php-ext-install zip \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY composer.json ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction
COPY . .
COPY --from=frontend /app/public/dist ./public/dist
EXPOSE ${PORT:-8080}
CMD ["sh", "-c", "php spark serve --host=0.0.0.0 --port=${PORT:-8080}"]
