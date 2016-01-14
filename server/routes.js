/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/accountings', require('./api/accounting'));
  app.use('/api/votes', require('./api/vote'));
  app.use('/api/categorys', require('./api/category'));
  app.use('/api/polls', require('./api/poll'));
  app.use('/api/purchases', require('./api/purchase'));
  app.use('/api/groups', require('./api/group'));
  app.use('/api/acls', require('./api/acl'));
  app.use('/api/roles', require('./api/role'));
  app.use('/api/orders', require('./api/order'));
  app.use('/api/carts', require('./api/cart'));
  app.use('/api/socials', require('./api/social'));
  app.use('/api/displays', require('./api/display'));
  app.use('/api/charts', require('./api/chart'));
  app.use('/api/scrolls', require('./api/scroll'));
  app.use('/api/emails', require('./api/email'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};