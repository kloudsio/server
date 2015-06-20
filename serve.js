require('babel/register')

var main = require('./lib/main.js'),
	apps = require('./apps/index.js'),
	user = require('./users/index.js'),
	payment = require('./payment/index.js')


main.listen();
