var _ = require('lodash');
var route = require('koa-route');
var jsonBody = require('koa-json-body');
var json = require('koa-json');

var main = require('../lib/main.js');
var db = require('../lib/db.js')
var stripe = require('stripe')(process.env.STRIPE_SK);
var auth = require('koa-jwt')({ secret: process.env.JWT_KEY });


function createStripeCustomer(customer) {
  return function(cb) {
    return stripe.customers.create(customer, cb)
  }
}


var app = main.create('Payments');

app.use(auth);
app.use(jsonBody({ limit: '10kb' }));
app.use(json());


app.use(route.post('/', function* purchaseApp() {

  var params = this.request.body;
  var app = params.app;
  var stripeToken = params.tok;


  var customer = yield createStripeCustomer({
    source: stripeToken,
    plan: "web_application",
    email: this.state.user.email
  });

  console.log('Stripe Customer', stripeCustomer);

  this.assert(customer, 500, 'Stripe api call failed');

  this.body = { customer: customer.id };

  var inserted = yield db.stripe.insert(customer);
  console.log(inserted);
}));

main.mount('/payments', app);
