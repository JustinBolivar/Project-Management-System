FROM php:8.2-fpm-alpine

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apk add --no-cache \
    git \
    curl \
    libxml2-dev \
    sqlite-dev \
    nodejs \
    npm \
    linux-headers

# Install PHP extensions
RUN docker-php-ext-install pdo_sqlite exif pcntl bcmath sockets

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy package files and install npm dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY --chown=www-data:www-data . /var/www/html
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
# Expose port 9000 and run php-fpm
EXPOSE 9000
CMD ["php-fpm", "-F"]