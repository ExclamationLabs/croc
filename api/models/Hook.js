module.exports = {
	attributes: {

		name: {
			type: 'string',
			required: true
		},

		slug: {
			type: 'string'
		},

		script: {
			type: 'string',
			required: true,
			defaultsTo: '// Enter script here'
		},

		logs: {
			type: 'array',
			defaultsTo: []
		},

		latestPayload: {
			type: 'string'
		},

		owner: {
			model: 'user'
		},

		hidden: {
			type: 'boolean',
			defaultsTo: false
		}

	},

	beforeCreate: function(values, callback) {
		// Trim the name
		values.name = values.name.trim();

		// Create a default slug from the name
		if (!values.slug) {
			values.slug = values.name.replace(/\s/g, '-').toLowerCase();
		}

		callback();
	}
}