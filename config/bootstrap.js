/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var Promise = require('promise')
	, fs = require('fs');

module.exports.bootstrap = function(cb) {
	sails.services.passport.loadStrategies();
	initRunnable();

	// Start seeding the database
	(new Promise(function(resolve) { resolve(); }))
		.then(seedAdmin())
		.then(seedSystem())
		.then(cb, function(err) {
			logger.error(err);
			process.exit(1);
		});
};

/*
 * Seed the database with an admin user */
function seedAdmin() {
	User.findOrCreate({ username: 'admin' }, {
		username: 'admin',
		email: '',
		admin: true,
		firstName: 'System',
		lastName: 'admin'
	}).exec(function(err, user) {
		if (err) {
			throw new Error(err);
		}

		Passport.create({
			protocol: 'local'
			, password: 'changemenow'
			, user: user.id
		}, function (err, passport) {
			if (err) {
				throw new Error(err);
			}

			return;
		});
	});
}

/*
 * Seed the database with default system settings */
function seedSystem() {
	System.findOrCreate().exec(function(err) {
		if (err) {
			throw new Error(err);
		}

		return;
	});
}

/*
 * Initialize the runnable directory to ensure `node_modules` exists */
function initRunnable() {
	if (!fs.existsSync('runnable/node_modules')) {
		fs.mkdirSync('runnable/node_modules');
	}
}
