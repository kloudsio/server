# run with environment
SHELL := bash
NODE := iojs serve.js
start:
	@$(NODE) serve.sh
.PHONY:start

dev:
	@ $(NODE) serve.js
.PHONY:dev

docker: docker-mongo
	@docker rm -f klouds 2>/dev/null
	@docker run -d --link klouds-db:db -p 80:8080 --name klouds klouds

docker-db: 
	@docker rm -f klouds-db 2>/dev/null
	@docker run -d -v $(pwd)/db:/data/db --name klouds-db mongo

docker-clean:
	@docker rm -f klouds 2>/dev/null || echo klouds container already off
	@docker rm -f klouds-db 2>/dev/null || echo no klouds-db container already off
.PHONY: docker docker-db docker-clean
