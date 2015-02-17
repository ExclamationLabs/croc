/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  // -- Authentication routes
  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  // -- User routes
  'post /user': 'UserController.create',
  'post /user/:id': 'UserController.update',
  'get /user/delete/:id': 'UserController.delete',

  // -- Dashboard routes
  '/': 'DashboardController.index',

  // -- Settings routes
  'get /settings': 'SettingsController.index',
  'get /settings/:section': 'SettingsController.admin',
  'put /settings/system': 'SettingsController.updateSystem',

  // -- Hook routes
  'get /hook/:id': 'HooksController.edit',
  'get /hook/:id/:section': 'HooksController.sections',
  'post /hook/:id/script': 'HooksController.updateScript',
  'post /hook/:id': 'HooksController.update',
  'post /hook': 'HooksController.create',
  'delete /hook/:id': 'HooksController.delete',

  // -- Modules
  'get /modules': 'ModulesController.index',
  'get /modules/search/:name': 'ModulesController.search',
  'post /modules/install': 'ModulesController.install',
  'post /modules/delete': 'ModulesController.remove',

  // -- Incomming webhooks
  'post /run/:identifier': 'RunController.index',

};
