.DEFAULT_GOAL := dev
MAIN_SERVICE_NAME := home-web-app
MAIN_SERVICE_PORT := 8080
NODE_VERSION := 20


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
	echo $(fs.inotify.max_user_watches=524288) | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
	npm run dev

.ONESHELL:
test:
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	echo $(fs.inotify.max_user_watches=524288) | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
	npm install --include=dev
	npm run test:unit

.ONESHELL:
deploy:
	rm -rf node_modules/
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm install --legacy-peer-deps
	npm run build

docker-dev-build:
	docker build -t $(MAIN_SERVICE_NAME)-dev -f Dockerfile.dev . --pull

docker-dev-run:
	docker run --env-file='.env' -v $(shell pwd):/app -p $(MAIN_SERVICE_PORT):$(MAIN_SERVICE_PORT) $(MAIN_SERVICE_NAME)-dev

.ONESHELL:
docker-dev-stop:
	docker stop $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)-dev" -q)
	docker rm $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)-dev" -q)

docker-run:	
	docker build -t $(MAIN_SERVICE_NAME) . && docker run --env-file='.env' -p $(MAIN_SERVICE_PORT):$(MAIN_SERVICE_PORT) $(MAIN_SERVICE_NAME)

.ONESHELL:
docker-stop:
	docker stop $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)" -q)
	docker rm $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)" -q)

docker-test-build:
	docker build -t $(MAIN_SERVICE_NAME)-test -f Dockerfile.test . --pull

docker-test-run:
	docker run --env-file='.env' -p $(MAIN_SERVICE_PORT):$(MAIN_SERVICE_PORT) $(MAIN_SERVICE_NAME)-test