
# run with environment
NODE := iojs serve.js

start:
	@$(NODE) serve.sh
.PHONY:start

dev:
	@ $(NODE) serve.js
.PHONY:dev
