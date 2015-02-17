/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var validator = require('validator');

module.exports = {

	create: function(req, res) {
		var email = req.param('email')
			, password = req.param('password')
			, firstName = req.param('firstName')
			, lastName = req.param('lastName')
			, admin = req.param('admin') != undefined ? true : false;

		if (!email) {
			req.flash('error', 'Error.Passport.Email.Missing');
			return next(new Error('No email was entered.'));
		}

		if (!password) {
			req.flash('error', 'Error.Passport.Password.Missing');
			return next(new Error('No password was entered.'));
		}

		User.create({
			firstName: firstName,
			lastName: lastName,
			admin: admin,
			email: email
		}, function (err, user) {
			if (err) {
				if (err.code === 'E_VALIDATION') {
					if (err.invalidAttributes.email) {
						req.flash('error', 'Error.Passport.Email.Exists');
					} else {
						req.flash('error', 'Error.Passport.User.Exists');
					}
				}

				return next(err);
			}

			Passport.create({
				protocol : 'local'
				, password : password
				, user     : user.id
			}, function (err, passport) {
				if (err) {
					console.log(err)
					if (err.code === 'E_VALIDATION') {
						req.flash('error', 'Error.Passport.Password.Invalid');
					}
				}

				res.redirect('settings/users');
			});
		});
	},

	update: function(req, res) {
		var updateData = {}
			, id = req.params['id']
			, email = req.param('email')
			, password = req.param('password')
			, confirm = req.param('confirmPassword')
			, firstName = req.param('firstName')
			, lastName = req.param('lastName')
			, admin = req.param('admin');

		updateData = {
			email: email,
			firstName: firstName,
			lastName: lastName
		}

		if (admin) {
			updateData.admin = (admin == 'true');
		}

		// Form validation
		if (password && (confirm != password)) {
			res.json({
				errors: {
					field: 'confirmPassword',
					message: 'Confirm password must match password.'
				},
				message: 'Failed to save user'
			}, 400);
		}

		User.update({ id: id }, updateData).exec(function(err, user) {
			if (err) {
				return res.json({
					message: 'Failed to save user',
				}, 500);
			}

			// Update password if provided
			if (password) {
				Passport.update({ user: id }, { password: password }).exec(function(err) {
					if (err) {
						return res.json({
							message: 'Failed to save user',
						}, 500);
					}

					res.json({
						message: 'User Saved Sucessfully',
						data: user
					}, 200);
				});
			} else {
				res.json({
					message: 'User Saved Sucessfully',
					data: user
				}, 200);
			}
		});
	},

	delete: function(req, res) {
		var id = req.params['id'];

		// Before deleting the user, all their hooks need to
		// be reassigned to the logged-in user.
		Hook.find({ owner: id }).exec(function(err, hooks) {
			if (err) {
				return res.send(500);
			}

			try {
				for (var i = 0; i < hooks.length; i++) {
					hooks[i].owner = req.user.id
					hooks[i].save();
				}

				// Delete the user
				User.destroy({ id: id }).exec(function(err) {
					if (err) {
						return res.send(500);
					}

					res.redirect('/settings/users');
				});

			} catch (e) {
				logger.error(e);
				return res.send(500);
			}
		});
	}
	
};

