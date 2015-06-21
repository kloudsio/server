# run with environment
SHELL := bash
NODE := iojs serve.js
start:
	@$(NODE) serve.sh
.PHONY:start

dev:
	@ $(NODE) serve.js
.PHONY:dev

docker: docker-build docker-db docker-klouds
.PHONY: docker

docker-build: Dockerfile
	@docker build --tag=klouds .
.PHONY: docker-build

docker-klouds:
	@docker start klouds 2>/dev/null || echo 'creating app container';
	@docker run -d\
	  --link klouds-db:db\
	  -p 3000:8080\
	  -e JWT_KEY='abcd'\
	  -e STRIPE_SK='sk_test_Z34c2IRtyypD4EIQjdowKeLd'\
	  --name klouds klouds
.PHONY: docker-klouds

docker-db:
	@docker rm -f klouds-db 2>/dev/null || echo 'creating mongo container';
	@docker run -d -v $(pwd)/db:/data/db --name klouds-db mongo
.PHONY: docker-db

docker-clean:
	@docker rm -f klouds 2>/dev/null || echo klouds container already off
	@docker rm -f klouds-db 2>/dev/null || echo no klouds-db container already off
.PHONY: docker
