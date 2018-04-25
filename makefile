.DEFAULT_GOAL := build
.PHONY: build test

PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

####################################
## MAIN

info:
	@echo "Available make commands:"
	@echo
	@echo "  $$ make              Compile JS/Jade files into 'public'"
	@echo "  $$ make dev          Compile, watch and live reload"
	@echo "  $$ make run          Build and start the server as if in production"
	@echo
	@echo "  $$ make start        Start the app server (pm2)"
	@echo "  $$ make stop         Stop the app server (pm2)"
	@echo "  $$ make reload       Restart gracefully (pm2)"
	@echo "  $$ make restart      Stop and start the app server (pm2)"
	@echo
	@echo "  $$ make test         Run the test suite (detailed)"
	@echo "  $$ make check        Run the test suite (pretty)"
	@echo "  $$ make populate     Create some data into the DB (development only)"
	@echo "  $$ make wipe         Clean the database"
	@echo
	@echo "  $$ make install      Install the NPM packages and build"
	@echo "  $$ make info         What you are reading"
	@echo

clean:
	@echo
	@echo "# Cleaning ./public"
	@rm -Rf ./public
	@make folders

####################################
## BUILD TARGETS

folders:
	@echo
	@echo "# Creating the public folder"
	mkdir -p ./public

build: folders
	@echo
	@echo "# Building the app"
	@make media
	@make webpack

media:
	@echo
	@echo "# Copying media files to public/media"
	cp -a ./app/media ./public

watch-media:
	watch 'make media' app/media --wait=3 -d -u

webpack:
	@echo
	@echo "# Running webpack"
	NODE_ENV=production webpack --colors --progress -p --config webpack.prod.config.js


####################################
## DEVELOPMENT TARGETS

dev: folders
	@echo
	@echo "# Running Webpack Watch + Nodemon"
	@make media
	@make watch-media &
	@make watch-webpack &
	@make watch-server

watch-webpack:
	webpack-dev-server

watch-server:
	nodemon --watch app/api --watch app/models --watch app/lib --watch app/state .

run:
	@echo
	@echo "# Starting server"
	NODE_ENV=production DEBUG= node .

launch:
	@sleep 3
	@echo "# Launching http://localhost:8080"
	@node -e "require('open')('http://localhost:8080');"

install:
	yarn || npm install

####################################
## TEST

test:
	@node_modules/.bin/mocha test/index.js --reporter=tap --timeout 5000

check:
	@node_modules/.bin/mocha test/index.js --reporter=spec --timeout 5000

populate:
	node test/populate

wipe:
	node test/wipe
	make populate

####################################
## SERVER TARGETS

start:
	NODE_ENV=production DEBUG= pm2 start process.json5 || make run
	pm2 dump

stop:
	pm2 stop process.json5

reload:
	pm2 reload process.json5

restart:
	pm2 restart process.json5
