/**
 * hooks
 *
 * Middleware to add hooks to local variables
 */

module.exports = function(req, res, next) {
	var hooksData = {
		all: [],
		user: []
	};

	Hook.find().populate('owner').exec(function(err, hooks) {
		if (err) {
			res.send(500);
			return;
		}

		for (var i = 0; i < hooks.length; i += 1) {
			// Get the logged-in user's hooks
			if (hooks[i].owner.id == req.user.id) {
				hooksData.user.push(hooks[i]);
			}

			// Filter out any hidden hooks if the user is not the owner
			if (hooks[i].owner.id == req.user.id || !hooks[i].hidden) {
				hooksData.all.push(hooks[i]);
			}
		}

		// Assign data to locals
		res.locals.hooks = hooksData;
		res.locals.inspect = require('util').inspect;

		next();
	});
}