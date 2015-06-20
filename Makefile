
# run with environment
IOJS := bash -c source\ env.sh\ \&\&\ iojs\ \$(read)

start:
	@ $(IOJS) serve.js
.PHONY:start

dev:
	@ $(IOJS) serve.js
.PHONY:dev
