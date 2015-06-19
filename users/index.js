
var main = require('../lib/main');


/*
  Route
*/
var routes = require('./routes');
var router = require('koa-joi-router')();
router.route(routes.register);
router.route(routes.login);

/*
  App
*/
var app = main.create('Users');
app.use(router.middleware());
main.mount('/users', app);