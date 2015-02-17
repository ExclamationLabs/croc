var crypto = require('crypto');

var User = {
	// Enforce model schema in the case of schemaless databases
	schema: true,

	attributes: {
		username  : { type: 'string', unique: true },
		firstName: { type: 'string' },
		lastName: { type: 'string' },
		email     : { type: 'email',  unique: true },
		admin: { type: 'boolean', defaultsTo: false, required: true },
		passports : { collection: 'Passport', via: 'user' },
	
		getAvatar: function() {
			var md5 = crypto.createHash('md5')
				, hexVal
				, url = 'http://www.gravatar.com/avatar/';

			md5.update(this.email);
			hexVal = md5.digest('hex');
			
			return url + hexVal + '?s=100';
		},

		getFullName: function() {
			return this.firstName + ' ' + this.lastName;
		}
	}
};

module.exports = User;
