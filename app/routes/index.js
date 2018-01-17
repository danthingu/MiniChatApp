'use strict';
var h = require('../helpers');
var passport = require('passport');

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
			},
			'/getsession': function(req, res) {
				res.send("My favorite color: " + req.session.favColor);
			},
			'/setsession': function(req, res) {
				req.session.favColor = "Gray";
				res.send("Session Set");
			},
			'/auth/facebook': passport.authenticate('facebook'),
			'/auth/facebook/callback': passport.authenticate('facebook', {
				successRedirect: '/rooms',
				failureRedirect:'/'
			})
		},
		'post': {

		},
		'NA': function(req, res) {
			res.status(404).sendFile(process.cwd() + '/views/404.htm');
		}
	}
	return h.route(routes);
}