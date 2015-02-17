/**
 * system
 *
 * Middleware to add system settings to local variables.
 */

 module.exports = function(req, res, next) {
 	System.find().limit(1).exec(function(err, system) {
 		if (err) {
 			res.send(500);
 			return;
 		}

 		res.locals.system = system[0];
 		sails.system = system[0];

 		next();
 	});
 }