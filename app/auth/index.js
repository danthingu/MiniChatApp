'use strict';
var passport = require('passport');
var config = require('../config');
var h = require('../helpers');
var FacebookStrategy = require('passport-facebook').Strategy;
// strategy: authentication mechanism such as fb, twitter
module.exports = function() {
	passport.serializeUser((user, done) => { // serializeUser invoke when authentication is done
		done(null, user.id); // session is created, and user id got stored in session
	});

	passport.deserializeUser((id, done) => {
		// Find the user using the _id
		h.findById(id)
			.then(user => done(null, user));
	});
	// Find a user in local db using profile.id
	// If the user is found, return the user data using the done()
	//If the user is not found, create one in the local db and return
	let authProcessor = (accessToken, refreshToken, profile, done) => {
		h.findOne(profile.id)
		 .then(result => {
		 	if(result) {
		 		done(null, result);
		 	} else {
		 		// Create a new user and return
		 		h.createNewUser(profile)
		 		.then(newChatUser => done(null, newChatUser))
		 		.catch(error => console.log('Error when creating a new user'));
		 	}
		 });
	}
	passport.use(new FacebookStrategy(config.fb, authProcessor));
}