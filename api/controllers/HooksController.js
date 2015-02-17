/**
 * HooksController
 *
 * @description :: Server-side logic for managing hooks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	edit: function(req, res) {
		var data = {}
			, id = req.params['id'];

		Hook.findOne({ id: id }).populate('owner').exec(function(err, hook) {
			if (err) {
				res.send(500);
				return;
			}

			data.title = 'Editing ' + hook.name;
			data.userIsOwner = (hook.owner.id == req.user.id);
			data.hook = hook;

			res.view('hooks/index', data);
		});
	},

	sections: function(req, res) {
		var data = {}
			, section = req.params['section']
			, id = req.params['id'];

		Hook.findOne({ id: id }).populate('owner').exec(function(err, hook) {
			if (err) {
				res.send(500);
				return;
			}

			data.title = 'Editing ' + hook.name;
			data.userIsOwner = (hook.owner.id == req.user.id);
			data.hook = hook;
			data.section = section;

			res.render('hooks/sections', data);
		});
	},

	update: function(req, res) {
		var id = req.params['id']
			, updateData = {};

		if (req.param('name')) updateData.name = req.param('name');
		if (req.param('slug')) updateData.slug = req.param('slug');
		updateData.hidden = req.param('hidden') ? true : false;

		Hook.update({ id: id }, updateData).exec(function(err, hook) {
			if (err) {
				return res.json({
					message: 'Failed to save hook',
				}, 500);
			}

			return res.json({
				message: 'Hook saved successfully',
				data: hook
			}, 200);
		});
	},

	updateScript: function(req, res) {
		var id = req.params['id']
			, script = req.param('script')
			, updateData = {};

		Hook.update({ id: id }, { script: script }).exec(function(err, hook) {
			if (err) {
				return res.json({
					message: 'Failed to save hook',
				}, 500);
			}

			return res.json({
				message: 'Hook saved successfully',
			}, 200);
		});
	},

	create: function(req, res) {
		var hookData = {};

		if (!req.body.name) {
			res.send(500);
			return;
		}

		hookData.name = req.body.name;

		if (req.body.slug) hookData.slug = req.body.slug;
		if (req.body.script) hookData.script = req.body.script;
		if (req.body.hidden) hookData.hidden = req.body.hidden;
		if (req.body.hidden) hookData.hidden = req.body.hidden;

		if (req.body.owner) {
			hookData.owner = req.body.owner;
		}
		// Owner should be the currently logged in user if not explicity set
		else {
			hookData.owner = req.user.id;
		}

		Hook.create(hookData).exec(function(err, hook) {
			if (err) {
				logger.error(err);
				res.send(500);
				return;
			}

			res.redirect('/hook/' + hook.id + '/');
		});
	},

	delete: function(req, res) {
		var id = req.params['id'];

		Hook.findOne({ id: id }).exec(function(err, hook) {
			if (err) {
				logger.error(err);
				return res.json({
					message: 'Failed to delete hook.'
				}, 500);
			}

			if (!hook) {
				return res.json({
					message: 'Could not find hook.'
				}, 404);
			}

			Hook.destroy({ id: id }).exec(function(err) {
				if (err) {
					logger.error(err);
					return res.json({
						message: 'Failed to delete hook.'
					}, 500);
				}

				res.json({
					message: 'Hook deleted successfully.'
				}, 200);
			});
		});
	}

};
