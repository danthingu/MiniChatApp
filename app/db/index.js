'use strict'
var config = require('../config');
var Mongoose = require('mongoose').connect(config.dbURI);

// Log an error if the connection fails
Mongoose.connection.on('error', error => {
	console.log("MongoDB Error: ", error);
});

// Create a Schema that defines the structure to storing user data

var chatUser = new Mongoose.Schema({
	profileId : String,
	fullName : String,
	profilePic: String
});

// Turn the schema into a usable model
let userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
	Mongoose,
	userModel
}