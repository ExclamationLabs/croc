/**
 * modules
 *
 * Middleware to add modules to local variables
 */

var npm = require('npm');

module.exports = function(req, res, next) {
	var cwd = process.cwd();

	try {
		// cd into the runnable directory
		process.chdir(cwd + '/runnable');

		npm.load(null, function() {

			// Get the list of node modules from the local NPM
			npm.commands.ls(null, true, function(err, data) {
				if (err) {
					return res.send(500);
				}

				var output = [];

				// Dependencies are circular which causes some issues when sending a JSON responnse.
				// To mitigate this, only pull out the neccessary information.
				for(var i in data.dependencies) {
					output.push({
						name: i,
						homepage: data.dependencies[i].homepage
					})
				}

				res.locals.modules = output;
				next();

				// cd back to the original working diretory
				process.chdir(cwd);
			});
		});
	} catch (e) {
		console.error(e);
		res.locals.modules = [];
		next();
	}
}