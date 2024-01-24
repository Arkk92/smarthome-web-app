.DEFAULT_GOAL := up
MAIN_SERVICE_NAME := smart-home-project

build:
	docker-compose build

up:
	docker-compose up

deploy:
	echo "To be implemented"