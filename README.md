# Project Management System

A Laravel + React project with TailwindCSS, Vite, and Docker.

This README provides clear instructions to set up and run the application on any machine using Docker.

---

## Prerequisites

Before starting, make sure you have:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Step 1: Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/JustinBolivar/Project-Management-System.git
cd project-management-system

Update the .env file with the following SQLite and application settings:

APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:your-generated-key
APP_DEBUG=true
APP_URL=http://web
VITE_APP_URL=http://web
VITE_DEV_SERVER_URL=http://vite:5173

DB_CONNECTION=sqlite
DB_DATABASE=/var/www/html/database/database.sqlite

SESSION_DRIVER=database
SESSION_LIFETIME=120

Ensure the database folder exists:

mkdir -p database
touch database/database.sqlite

The project uses Docker for the backend, frontend (Vite), and web server (Nginx). Build and start the containers with:
docker-compose up -d --build


After the containers are up, run the migrations to create tables including sessions:
docker-compose exec app php artisan migrate --force

YOu should see the application in http://localhost:8000
