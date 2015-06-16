
var main = require('./lib/main'),
	apps = require('./apps/index.js'),
	user = require('./users/index.js'),
	payment = require('./payment/index.js')

setTimeout(function() {
	main.listen();
}, 1000);
