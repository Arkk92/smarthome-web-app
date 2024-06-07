.DEFAULT_GOAL := dev
MAIN_SERVICE_NAME := home-backend
MAIN_SERVICE_PORT := 3000
NODE_VERSION := 20


## LOCAL COMMANDS ##
## Note: To be used for local development ##
.ONESHELL:
.PHONY:
nvm-use:
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)

.ONESHELL:
create:
	rm -rf node_modules/
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm create vue@latest

.ONESHELL:
run-npm-cmd:
	rm -rf node_modules/
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm $(cmd)

.ONESHELL:
install-package:
	rm -rf node_modules/
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm install --save $(PACKAGE)

.ONESHELL:
build:
	rm -rf node_modules/
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm install --legacy-peer-deps

.ONESHELL:
dev:
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm run dev

.ONESHELL:
test:
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm run test

.ONESHELL:
test-coverage:
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm run test-coverage

.ONESHELL:
deploy:
	rm -rf node_modules/
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm install --legacy-peer-deps
	npm run build

## Containerized Commands ##
## The following commands require Docker to be installed ##
## Containerized development commands
.ONESHELL:
docker-dev-build:
	docker build -t $(MAIN_SERVICE_NAME)-dev -f Dockerfile.dev . --pull

.ONESHELL:
docker-dev-run:
	docker run --env-file='dev.env' -v $(shell pwd):/app -p $(MAIN_SERVICE_PORT):$(MAIN_SERVICE_PORT) $(MAIN_SERVICE_NAME)-dev

.ONESHELL:
docker-dev-stop:
	docker stop $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)-dev" -q)
	docker rm $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)-dev" -q)

.ONESHELL:
docker-test-build:
	docker build -t $(MAIN_SERVICE_NAME)-test -f Dockerfile.test . --pull

.ONESHELL:
docker-test-run:
	$(MAKE) docker-test-build && docker run --env-file='test.env' -v $(shell pwd):/app -p $(MAIN_SERVICE_PORT):$(MAIN_SERVICE_PORT) $(MAIN_SERVICE_NAME)-test

.ONESHELL:
docker-test-stop:
	docker stop $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)-test" -q)
	docker rm $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)-test" -q)

## Containerized deployment commands
docker-run:	
	docker build -t $(MAIN_SERVICE_NAME) . && docker run --env-file='.env' -p $(MAIN_SERVICE_PORT):$(MAIN_SERVICE_PORT) $(MAIN_SERVICE_NAME)

docker-stop:
	docker stop $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)" -q)
	docker rm $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)" -q)