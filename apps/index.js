var jsonBody = require('koa-json-body');
var json = require('koa-json');
var route = require('koa-route');

var main = require('../lib/main');
var db = require('../lib/db')

/*
  Route
*/

function* get() {
  var apps = yield db.apps.find({});
  this.body = {
  	apps: apps
  };
 }

/*
  App
*/
var app = main.create('Apps');

app.use(jsonBody({ limit: '10kb' }));
app.use(json());

app.use(route.get('/', get));

main.mount('/apps', app);