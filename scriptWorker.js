/*
 * scriptWorker.js
 *
 * Each hook runs as a child proccess of Croc. This script initializes resources
 * and enables communication between itself and the parent process.
 */

var contexify = require('contextify')
	, Context = require('./scriptContext');

process.on('message', function(m) {
	var m = JSON.parse(m);

	if (m.name == 'script' && m.data) {
		var sandbox = contexify(new Context(m.data.payload))
			, type = 'success'
			, output
			, res;

		try {
			// Push the req data to the sandbox
			sandbox.req = m.data.req;

			// Initialize the response object for the sandbox
			sandbox.res = { type: null, body: null };

			// Script exit callback.
			sandbox.exit = function(err) {
				if (err) {
					// If an error is passed, log it as such
					type = 'error';
					output = {
						type: type,
						message: err.message
					};
				} else {
					for (var i = 0; i < sandbox.output.length; i++) {
						if (sandbox.output[i].type == 'error') {
							type = 'error';
						}
					}

					output = {
						type: type,
						message: (type == 'success' ? m.data.name + ' ran successfully.' : '')
					};
				}

				output.consoleOut = sandbox.output;
				res = sandbox.res;

				// Unbind the sandbox
				sandbox.dispose();

				// Send complete message to parent process
				process.send(JSON.stringify({
					name: 'complete',
					data: {
						output: output,
						res: res
					}
				}));

				// Exit the child process
				process.exit();
			}

			// Execute the script
			sandbox.run(m.data.script, m.data.name);

			// Set a timeout for the script.
			// Throw an error if the time limit is exceeded
			setTimeout(function() { sandbox.exit(new Error('script timeout')) }, m.data.options.timeout);

		} catch (e) {
			// Log error and send complete message to parent process
			output = {
				type: 'error',
				message: e,
				consoleOut: sandbox.output 
			};

			process.send(JSON.stringify({
				name: 'complete',
				data: {
					output: output
				}
			}));
		}
	}
});