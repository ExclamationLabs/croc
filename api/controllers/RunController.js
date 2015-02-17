/**
 * RunController
 *
 * @description :: Server-side logic for executing hooks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function(req, res) {
		var identifier = req.params['identifier'];
		
		// Find a hook by either id or slug
		Hook.findOne({
			or: [
				{ id: identifier },
				{ slug: identifier }
			]
		}).exec(function(err, hook) {
			if (err) {
				return res.send(500);
			}

			if (!hook) {
				return res.send(404);
			}

			sails.services.execute(hook, req, function(err, resData) {
				if (err) {
					return res.send(500);
				}

				if (resData) {
					if (resData.type) {
						res.type(resData.type);
					}

					if (resData.body) {
						res.send(resData.body);
					} else {
						res.send(200);
					}
				} else {
					res.send(200);
				}
			});
		});
	}

};