.DEFAULT_GOAL := up
SHELL := /bin/bash
MAIN_SERVICE_NAME := smart-home-project
NETWORK_NAME := smart-home-network

.ONESHELL:
.PHONY:
build:
	source build.sh && pre_build
	docker network create $(NETWORK_NAME) || true
	docker-compose pull && docker-compose build
	source build.sh && post_build

run:
	docker-compose run $(MAIN_SERVICE_NAME)

up:
	docker-compose up

up-d:
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down

deploy:
	$(MAKE) down
	docker network create $(NETWORK_NAME) || true
	$(MAKE) build
	$(MAKE) up-d

dev:
	docker-compose pull && docker-compose -f docker-compose.dev.yml up --build

.ONESHELL:
test:
	docker network create $(NETWORK_NAME) || true
	docker-compose pull
	docker-compose -f docker-compose.test.yml build
	docker-compose -f docker-compose.test.yml up