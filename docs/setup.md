Setup
=====

The initial setup for Croc is dead simple.
Croc uses MongoDB as its datastore, so make sure you have that running before
attempting to start the server.


## Configuration

Croc can be configured by altering the JavaScript files in the `config`
directory. In general, the only files you will be concerned with exist in the
`env` subdirectory. This is where the environment specific configurations will
be defined. These configurations tell Croc how it should run and override any
settings specified elsewhere.


### Production

Rename `env/production-sample.js` to `env/production.js`.
All your production environment configurations can be set here. Be sure edit
the `mongoServer` object to include your MongoDB host, port and a name for your
database.

Here is a sample configuration:

```javascript
module.exports = {

	connections: {
		mongoServer: {
			adapter: 'sails-mongo',
			host: 'localhost',
			port: 27017,
			user: '',
			password: '',
			database: 'croc'
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
```


### Development

Rename `env/development-sample.js` to `env/development.js`.
As with production, ensure that the MongoDB options match your setup.


## Running

When running Croc for the first time, the database will be seeded with a set
of default system settigns and an initial admin user.

The default user created for Croc has the username **admin** and password
**changemenow**. It is important that during the initial run, you either change
the password for this user, or create a new admin user and delete the default
user.