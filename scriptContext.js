/*
 * scriptContext.js
 *
 * Each hook run in a particular context. This context exposes core JavaScript and Node.js
 * resources, as well as a few helper methods.
 *
 * This module can be extended to expose additional functionality to the hooks.
 */

module.exports = function(payload) {

	var output = [];

	return {
		payload: payload,

		require: function(m) {
			try {
				return require(m);
			} catch (e) {
				output.push({
					type: 'error',
					message: e.message
				});
			}
		}, 

		console: {
			log: function(message) {
				output.push({
					type: 'log',
					message: message
				});
			},

			warn: function(message) {
				output.push({
					type: 'warn',
					message: message
				});
			},

			error: function(message) {
				output.push({
					type: 'error',
					message: message
				});
			}
		},

		setTimeout: setTimeout,

		output: output

	};

}