'use strict';

var api = require('./controllers/api'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/users')
    .get(api.getUser);
  app.route('/api/users')
    .post(api.newUser);
  app.route('/api/users')
    .put(api.updateUser);

  app.route('/api/rounds')
    .get(api.rounds);

  app.route('/api/reloadStandings')
    .get(api.reloadStandings);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( index.index);
};
