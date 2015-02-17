/**
 * execute
 *
 * @description :: Run the hook script
 */

var checkSyntax = require('syntax-error');
var path = require('path')
	, fs = require('fs')
	, vm = require('vm')
	, cp = require('child_process');

module.exports = function(hook, request, callback) {

	var syntaxError
		, scriptContext
		, child
		, hookNS = path.join(process.cwd(), 'runnable', hook.id);

	// Create subdirectory for hook if it doesn't already exist
	if (!fs.existsSync(hookNS)) {
		fs.mkdirSync(path.join(process.cwd(), 'runnable', hook.id));
	}

	// Check for syntax errors in script
	syntaxError = checkSyntax(hook.script, hook.name);

	if (!syntaxError) {
		try {
			child = cp.fork(process.cwd() + '/scriptWorker', {
				cwd: hookNS,
				env: {
					'NODE_PATH': path.join(process.cwd(), 'runnable', 'node_modules')
				}
			});
		} catch(e) {
			// Log error
			hook.logs.unshift({
				type: 'error',
				timestamp: (new Date).getTime(),
				message: e.message,
				output: []
			});
		}

		child.send(JSON.stringify({
			name: 'script',
			data: {
				script: hook.script,
				payload: request.body,
				name: hook.name,
				req: {
					query: request.query,
					body: request.body,
					cookies: request.cookies,
					signedCookies: request.signedCookies,
					id: request.ip
				},
				options: {
					timeout: sails.config.app.scriptTimeout
				}
			}
		}));

		child.on('message', function(m) {
			var m = JSON.parse(m)
				, res = null;

			if (m.name == 'complete' && m.data) {
				hook.logs.unshift({
					type: m.data.output.type,
					timestamp: (new Date).getTime(),
					message: m.data.output.message,
					output: m.data.output.consoleOut
				});

				if (m.data.res) res = m.data.res;

				saveHookAndExit(hook, request.body, res, callback);
			}
		});

	} else {
		// Log error
		hook.logs.unshift({
			type: 'error',
			timestamp: (new Date).getTime(),
			message: syntaxError.toString(),
			output: []
		});

		saveHookAndExit(hook, request.body, null, callback);
	}
};


function saveHookAndExit(hook, payload, res, callback) {
	// Save the payload
	hook.latestPayload = JSON.stringify(payload);

	hook.save(function(err) {
		if (err) {
			return callback(new Error('Failed to save hook'));
		}

		callback(null, res);
	});
}