# run with environment
SHELL := bash
NODE := iojs serve.js
start:
	@$(NODE) serve.sh
.PHONY:start

dev:
	@ $(NODE) serve.js
.PHONY:dev

docker-klouds: 
	docker run -d --link klouds-db:db -p 80:8080 klouds

docker-mongo: 
	docker run -d -v $(pwd)/db:/data/db --name klouds-db mongo

docker-clean:
	@docker ps -a | grep klouds && docker rm -f klouds
	@docker ps -a | grep klouds-db && docker rm -f klouds-db
.PHONY: docker-mongo docker-klouds clean-docker
