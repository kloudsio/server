var jwt = require('koa-jwt');
var pswd = require('pswd')();
var Joi = require('joi');

var db = require('../lib/db');


function authorize(user) {
  delete user.password;
  return {
    token: jwt.sign(user, process.env.JWT_KEY, { expiresInMinutes: 60 * 5 }),
    user: user,
  }
}


module.exports.login = {
  method: 'post',
  path: '/login',
  validate: {
    body: {
      email: Joi.string().lowercase().email(),
      password: Joi.string().max(100)
    },
    type: 'json'
  },
  handler: function* () {
    var email = this.request.body.email;
    var password = this.request.body.password;

    var user = yield db.users.findOne({ email: email });
    this.assert(user, 401, 'authentication failed');

    var valid = yield pswd.compare(password, user.password);
    this.assert(valid, 401, 'authentication failed');

    this.body = authorize(user);

  }
};

module.exports.register = {
  method: 'post',
  path: '/register',
  validate: {
    body: {
      email: Joi.string().lowercase().email(),
      password: Joi.string().max(100)
    },
    type: 'json'
  },
  handler: function* () {
    var email = this.request.body.email;
    var password = this.request.body.password;

    var duplicate = yield db.users.findOne({ email: email });
    this.assert(!duplicate, 400, 'Klouds ID already exists');

    var hash = yield pswd.hash(password);
    this.assert(hash, 500, 'Failed to hash password');

    var user = yield db.users.insert({
      email: email,
      password: hash
    });
    this.assert(user, 500, 'Failed to insert new user');

    this.body = authorize(user);
  }
}