.PHONY: help build up down restart logs shell migrate seed clean status

help:
	@echo "WPS Docker Commands"
	@echo "==================="
	@echo "make build       - Build all Docker images"
	@echo "make up          - Start all containers"
	@echo "make down        - Stop all containers"
	@echo "make restart     - Restart all containers"
	@echo "make logs        - View container logs"
	@echo "make shell       - Open Laravel shell"
	@echo "make migrate     - Run database migrations"
	@echo "make seed        - Seed database with test data"
	@echo "make fresh       - Fresh migration and seed"
	@echo "make clean       - Remove all containers and volumes"
	@echo "make status      - Show container status"
	@echo "make ps          - List running containers"

build:
	@echo "Building Docker images..."
	docker-compose build

up:
	@echo "Starting containers..."
	docker-compose up -d
	@echo "Application started!"
	@echo "Frontend: http://localhost"
	@echo "API: http://localhost/api"
	@echo "Admin: http://localhost/admin"

down:
	@echo "Stopping containers..."
	docker-compose down

restart:
	@echo "Restarting containers..."
	docker-compose restart

logs:
	docker-compose logs -f

shell:
	docker-compose exec laravel bash

migrate:
	docker-compose exec laravel php artisan migrate

seed:
	docker-compose exec laravel php artisan db:seed

fresh:
	docker-compose exec laravel php artisan migrate:fresh --seed

clean:
	@echo "Removing containers and volumes..."
	docker-compose down -v
	@echo "Cleaned up!"

status:
	docker-compose ps

ps:
	docker ps | grep wps

ps-all:
	docker ps -a | grep wps

# Development commands
dev-up:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

dev-logs:
	docker-compose logs -f laravel

tinker:
	docker-compose exec laravel php artisan tinker

# Production commands
prod-build:
	docker-compose build --no-cache

prod-up:
	docker-compose -f docker-compose.yml up -d

# Backup commands
backup-db:
	docker-compose exec postgres pg_dump -U postgres wps > backup_$(shell date +%Y%m%d_%H%M%S).sql

# Check health
health:
	docker-compose exec postgres pg_isready
	docker-compose exec redis redis-cli ping
	docker-compose exec laravel curl -f http://localhost:9000/health || echo "PHP-FPM health check"
