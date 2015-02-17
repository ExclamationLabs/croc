/**
 * System Model
 * 
 * This model stores global system settings.
 */

module.exports = {
	attributes: {

		settings: {
			type: 'json',
			required: true,
			defaultsTo: {
				domain: '',
				scriptTimeout: 10000
			}
		}

	}
}