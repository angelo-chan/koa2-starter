export PATH := $(realpath .):$(PATH)

#####################################
#    Makefile for KOA2-Starter      #
#####################################

.PHONY: run setup lint build doc clean prod

run:
	@gulp

watch:
	@gulp watch

setup:
	@npm install

lint:
	@gulp lint

doc:
	@gulp apidoc

version:
	@gulp version

clean:
	@gulp clean

build:
	@gulp build

prod:
	@gulp prod

migrate-local:
	@gulp migrate-local

migrate-ci:
	@gulp migrate-ci

migrate-prod:
	@gulp migrate-prod

pre-deploy:
	@pm2 deploy ecosystem.json production setup

deploy:
	@pm2 deploy ecosystem.json production

pre-deploy-ci:
	@pm2 deploy ecosystem.json ci setup

deploy-ci:
	@pm2 deploy ecosystem.json ci

jmeter-test:
	@sudo rm -rf listener.jtl
	@jmeter -n -t ./test/Jmeter-koa2-starter.jmx -l listener.jtl

jmeter-test-ci:
	@sudo rm -rf listener.jtl
	@jmeter -n -t ./test/Jmeter-koa2-starter.jmx -l listener.jtl -Jtestserver=your_server -Jtestport=your_port
