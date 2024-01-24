.DEFAULT_GOAL := dev
MAIN_SERVICE_NAME := home-backend
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
	npm run dev

.ONESHELL:
test:
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm run test

.ONESHELL:
deploy:
	rm -rf node_modules/
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm install --legacy-peer-deps
	npm run build

docker-run:	
	docker build -t $(MAIN_SERVICE_NAME) . && docker run --env-file='.env' -p 3000:3000 $(MAIN_SERVICE_NAME)

docker-stop:
	docker stop $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)" -q)
	docker rm $(shell docker ps --filter ancestor="$(MAIN_SERVICE_NAME)" -q)