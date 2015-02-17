var npm = require('npm');

module.exports = {
	
	index: function(req, res, next) {
		// cd into the runnable directory
		process.chdir('runnable');
		
		npm.load(null, function() {
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

				res.json(output, 200);
			});
		});
	},

	search: function(req, res, next) {
		var cwd = process.cwd()
			, output = {};

		// cd into the runnable directory
		process.chdir(cwd + '/runnable');

		npm.load(null, function() {

			// Get the list of node modules from the local NPM
			npm.commands.view([req.params['name']], true, function(err, data) {
				if (err) {
					res.json({
						error: 'Could not find module'
					}, 404);
				} else {
					if (Object.keys(data).length > 0) {
						res.json({
							module: data[Object.keys(data)[0]] 
						}, 200);
					} else {
						res.json({
							error: 'Could not find module'
						}, 404);
					}
				}

				// cd back to the original working diretory
				process.chdir(cwd);
				
			});
		});
	},

	install: function(req, res, next) {
		var cwd = process.cwd()
			, name = req.param('name');

		// cd into the runnable directory
		process.chdir(cwd + '/runnable');

		npm.load(null, function() {

			// Get the list of node modules from the local NPM
			npm.commands.install([name], function(err, data) {
				if (err) {
					res.json({
						message: 'Failed to install module'
					}, 500);
				} else {
					res.json({
						message: 'Successfully installed module'
					}, 200);
				}

				// cd back to the original working diretory
				process.chdir(cwd);
				
			});
		});
	},

	remove: function(req, res, next) {
		var cwd = process.cwd()
			, name = req.param('name');

		// cd into the runnable directory
		process.chdir(cwd + '/runnable');

		npm.load(null, function() {

			// Get the list of node modules from the local NPM
			npm.commands.uninstall([name], function(err, data) {
				if (err) {
					res.json({
						message: 'Failed to delete module'
					}, 500);
				} else {
					res.json({
						message: 'Successfully deleted module'
					}, 200);
				}

				// cd back to the original working diretory
				process.chdir(cwd);
				
			});
		});
	}

};