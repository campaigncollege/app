/**
 * Module dependencies.
 */

var config = require('lib/config');
var express = require('express');
var passport = require('passport');
var log = require('debug')('democracyos:auth:routes');
var facebook = require('./facebook');

/**
 * Lazy create app
 */

var app;

/**
 * Expose auth app
 */

module.exports = app = express();

/**
 * Local Auth routes
 */

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

/**
 * Logout
 */

app.post('/logout',
  function(req, res, next) {
    try {
      req.logout();
      log('Logging out citizen %s', req.user);
      res.send(200);
    } catch (err) {
      log('Failed to logout citizen: %s', err);
      res.send(500);
    }
  }
);

if (config.auth.facebook.clientID) {
  app.use(facebook);
}
