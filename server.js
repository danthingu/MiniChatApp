'use strict';
var express = require('express');
var app = express();
var passport = require('passport');
//requiring routes
var chatCat = require('./app');


var port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public")); // fix the image of fb and twitter missing
app.set('view engine', 'ejs');

app.use(chatCat.session);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', chatCat.router);

app.listen(port, function() {
	console.log("server is running");
});