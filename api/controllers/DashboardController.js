/**
 * DashboardController
 *
 * @description :: Server-side logic for the dashboard
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	index: function(req, res) {

		var data = {};

		data.title = 'Dashboard';

		res.view('homepage', data);
	}

};
