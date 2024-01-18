.DEFAULT_GOAL := dev
MAIN_SERVICE_NAME := home-web-app
NODE_VERSION := 18

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
deploy:
	rm -rf node_modules/
	. ${HOME}/.nvm/nvm.sh
	nvm install $(NODE_VERSION)
	nvm use $(NODE_VERSION)
	npm install --legacy-peer-deps
	npm run build
