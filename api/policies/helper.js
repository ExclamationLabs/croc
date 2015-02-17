/**
 * helpers
 *
 * Middleware to add helper methods to local variables
 */

 module.exports = function(req, res, next) {
 	res.locals.helper = {

 		/**
 		 * Escape quotes and newlines for embedding in JavaScript strings */
 		escapeJS: function(str) {
 			if (str == undefined) return;
 			return str.replace(/('|"|\\)/g, "\\$&").replace(/\n/g, "\\n");
 		},

 	};

 	next();
 }