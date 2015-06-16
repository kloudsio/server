var monk = require('monk');
var wrap = require('co-monk');

var db = monk(process.env.MONGODB);

var tables = {
	apps: wrap(db.get('apps')),
    users: wrap(db.get('users')),
  	stripe: wrap(db.get('stripe')),
}

function createMiddleware(key) {
	return function* () {
		this.db = db;
		this[key] = tables[key]
	}
}

module.exports = {
	db: db,
	apps: tables.apps,
	users: tables.users,
	stripe: tables.stripe,
  	middleware: createMiddleware
};