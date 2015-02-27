var moduleLoader = require('./lib/moduleLoader')
	, assets = require('./lib/assets')
	, express = require('express')
	, partials = require('express-partials')
	, expiry = require('static-expiry')
	, winston = require('winston')
	, Promise = require('promise')
	, expressApp = express()
	, router = express.Router()
	, config
	, controllers
	, assetPipeline
	, assetsComplete

// Initialize global values
GLOBAL.app = {
	// Load the config
	config: require('./lib/config')(),

	// Load the controllers
	controllers: moduleLoader('app/controllers'),
};

// Initialze logging
require('./lib/logger');

// Start the asset pipeline
assetPipeline = Promise.denodeify(assets);
assetsComplete = assetPipeline(app.config.http.assetPath, app.config.http.staticPath, 'default');

// Setup the views
expressApp.set('views', __dirname + '/app/views');
expressApp.set('view engine', 'ejs');

// Finsish loading the application once the asset pipeline has completed
assetsComplete.then(function() {
	// Load middleware
	initMiddleware();

	// Load the routes
	initRoutes();

	// Start the webserver
	startServer();
});

function initMiddleware() {
	// Enable partials
	expressApp.use(partials());

	logger.verbose('*************************************');
	logger.verbose('Initializing the static asset cache');
	logger.verbose('`````````````````````````````````````');
	logger.verbose('Serving files from: %s', __dirname + '/' + app.config.http.staticPath);
	if (process.env.NODE_ENV != 'production') {
		logger.verbose('View cache at GET /expiry');
	}
	logger.verbose('*************************************');

	// Start static asset caching
	expressApp.use(expiry(expressApp, {
		dir: __dirname + '/' + app.config.http.staticPath,
		debug: process.env.NODE_ENV != 'production'
	}));

	// Serve static assets
	expressApp.use(express.static(__dirname + '/' + app.config.http.staticPath));

	// Request logging
	expressApp.use(function(req, res, next) {
		logger.log('verbose', req.method + ' ' + req.path);
		next();
	});
}

function initRoutes() {
	GLOBAL.app.routes = require('./lib/parseRoutes')(expressApp, app.config.routes)
}

function startServer() {
	var server = expressApp.listen(app.config.port, '0.0.0.0', function() {
		logger.info('App listening at http://%s:%s', server.address().address, server.address().port);
	});
}