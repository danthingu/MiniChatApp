'use strict';
var router = require('express').Router();
var db = require('../db');
// Iterate through the routes object and mount the routes
let _registerRoutes = (routes, method) => {
	for(let key in routes) {
		

		if (typeof routes[key] == 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
			console.log("this is key 1: " + key);
			console.log("this is routes[key] 1: " + routes[key]);
			_registerRoutes(routes[key], key);
		} else {
			// Register the routes
			if(method === 'get') {
				console.log("this is key 2 : " + key);
				console.log("this is routes[key] 2 : " + routes[key]);
				router.get(key, routes[key]);
			} else if (method === 'post') {
				console.log("this is key 3 : " + key);
				console.log("this is routes[key] 3 : " + routes[key]);
				router.post(key, routes[key]);
			} else {
				console.log("this is key 5 : " + key);
				console.log("this is routes[key] 5 : " + routes[key]);
				router.use(routes[key]);
			}
		}
	}
}

let route = routes => {
	_registerRoutes(routes);
	return router;
};

// Find a single user based on a key
let findOne = profileID => {
	return db.userMode.findOne({
		'profileId' : profileID
	});
}

// Create a new user and returns that instance
let createNewUser = profile => {
	return new Promise((resolve, reject) => {
		let newChatUser = new db.userModel({
			profileId: profile.id,
			fullName : profile.displayName,
			profilePic: profile.photos[0]
		});

		newChatUser.save(error => {
			if(error) {
				console.log('Create New User Error');
				reject(error);
			} else {
				resolve(newChatUser);
			}
		})
	});
}

let findById = id => {
	return new Promise((resolve, reject) => {
		db.userModel.findById(id, (error, user) => {
			if (error) {
				reject(error);
			} else {
				resolve(user);
			}
		});
	});
}

module.exports = {
	route, 
	findOne, 
	createNewUser,
	findById
}
