/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

	// By default Croc uses mongoDB as its datastore.
	// This can be changed by adding a new adapter, and modifying
	// these connection settings as appropriate.
	connections: {
		mongoServer: {
			adapter: 'sails-mongo',
			host: 'localhost',
			port: 27017,
			user: 'username',
			password: 'password',
			database: 'croc_db'
		}
	},

	models: {
		connection: 'mongoServer',
		migrate: 'safe'
	},

	log: {
		level: 'warn'
	},

	port: 80
};
