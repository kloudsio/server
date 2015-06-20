
import co from 'co';
import _ from 'lodash';
import { join as pathJoin } from 'path';
import koa from 'koa';
import json from 'koa-json';
import serve from 'koa-static';
import mount from 'koa-mount';
import assert from 'assert';
import { logger } from './util.js';

let { log } = logger('main');

_(['PORT', 'MONGODB', 'ASSETS', 'JWT_KEY', 'STRIPE_SK']).forEach((name) => {
	if (typeof process.env[name] === 'undefined')
		throw `missing ${name} env var`
}).value();


/*
	Main App
*/
let app = koa();
app.use(json());
app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
  	console.error(err);

    this.status = err.status || 500;
    this.body = {
    	error: err.message
    }
    this.app.emit('error', err, this);
  }
});

/*
	Instantiate a koa application and bind a logger.
*/
function create(name) {
	log(`Creating Module ${name}`);

	let sub = koa();

	// Sub-Context
	sub.use(function* (next) {
		// Bind Logger
		_.assign(this,  logger(name));
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
	let assets = process.env.ASSETS;

	if (assets) {
		log(`serving static files at ${assets}`);
		app.use(serve(assets, { defer: false } ));
	}
	let port = process.env.PORT;
	log(`Listening on port ${port}`);

	app.listen(port);
}

module.exports = {
	create: create,
	mount: submount,
	listen: listen
};