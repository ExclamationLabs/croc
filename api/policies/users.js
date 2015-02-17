/**
 * users
 *
 * Middleware to add users to local variables
 */

 module.exports = function(req, res, next) {
 	if (!req.user.admin) {
 		res.locals.users = [];
 		next();
 		return;
 	}

	User.find().exec(function(err, users) {
 		if (err) {
 			res.send(500);
 			return;
 		}

 		res.locals.users = users;
 		next();
 	});
 }