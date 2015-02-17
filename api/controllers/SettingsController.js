/**
 * SettingsController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	index: function(req, res) {
		var data = {};

		data.title = 'Settings';
		data.section = 'profile';

		res.view('settings/index', data);
	},

	admin: function(req, res) {
		var data = {}
			, section = req.params['section']
			, userId = req.param('userId')
			, partial = req.param('partial');

		data.title = 'Settings';
		data.section = section;

		partial = (partial == 'true');

		if (userId) {
			User.findOne({ id: userId }).exec(function(err, user) {
				if (err) {
					return res.send(500);
				}

				data.editUser = user;
				output(data);
			});
		} else {
			output(data);
		}

		function output(data) {
			if (partial) {
				res.render('settings/sections', data);
			} else {
				res.view('settings/index', data);
			}
		}
	},

	updateSystem: function(req, res) {
		var domain = req.param('domain')
			, scriptTimeout = req.param('timeout');

		if (domain) {
			res.locals.system.settings.domain = domain;
		}

		if (scriptTimeout) {
			res.locals.system.settings.scriptTimeout = parseInt(scriptTimeout);
		}

		sails.system.save(function(err) {
			if (err) {
				return res.json({
					message: 'Failed to save system settings.'
				}, 500);
			}

			res.json({
				message: 'Successfully saved system settings.'
			}, 200);
		});
	}

};
