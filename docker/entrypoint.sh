#!/bin/sh
set -e

# Ensure SQLite DB exists
mkdir -p /var/www/html/database
if [ ! -f /var/www/html/database/database.sqlite ]; then
    touch /var/www/html/database/database.sqlite
fi

# Make folders writable
chown -R www-data:www-data /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache

# Run migrations + seed (only if APP_ENV=local)
if [ "$APP_ENV" = "local" ]; then
    echo "Running migrations with seed..."
    php artisan migrate:fresh --seed --force || true
else
    echo "Running migrations (no seed)..."
    php artisan migrate --force || true
fi

# Start PHP-FPM
exec "$@"
