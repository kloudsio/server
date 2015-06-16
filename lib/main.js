var co = require('co');
var _ = require('lodash');
var pathJoin = require('path').join;

var koa = require('koa');
var serve = require('koa-static');
var mount = require('koa-mount');

var util = require('./util');

/*
	Main App
*/
var app = koa();

var log = util.logger('main').log;


/*
	Error Middleware
*/
app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
  	console.error(err);

    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

/*
	Instantiate a koa application and bind a logger.
*/
function create(name) {
	log(`Creating Module ${name}`);

	var sub = koa();

	// Sub-Context
	sub.use(function* (next) {
		// Bind Logger
		_.assign(this,  util.logger(name));
		// Log Requests
		this.log(this.request.path);
		yield next;
	});


	return sub;
}

function submount(location, sub) {
	log(`Mounting ${location}`);

	app.use(mount(location, sub));
}

function listen() {
	var assets = process.env.ASSETS;

	if (assets) {
		log(`serving static files at ${assets}`);
		app.use(serve(assets, { defer: false } ));
	}
	var port = process.env.PORT;
	log(`Listening on port ${port}`);

	app.listen(port);
}

module.exports = {
	create: create,
	mount: submount,
	listen: listen
};