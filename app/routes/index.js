'use strict';
var h = require('../helpers');

module.exports = () => {
	let routes = {
		'get': {
			'/': function(req, res) {
				res.render('login');
			},
			'/rooms': function(req, res) {
				res.render('rooms');
			},
			'/chat': function(req, res) {
				res.render('chatroom');
			}
		},
		'post': {

		},
		'NA': function(req, res) {
			res.status(404).sendFile(process.cwd() + '/views/404.htm');
		}
	}
	return h.route(routes);
}