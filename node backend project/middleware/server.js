"use strict";

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var dbConfig = require('./config/dbConfig.json');
var serverConfig = require('./config/serverConfig.json');
var routes = require('./routes/index')(passport);
var logger = require('morgan');
var app = express();
var fs = require('fs');
var counter=0;


app.use(logger('common', {
    stream: fs.createWriteStream('./log/access.log', {
        flags: 'a'
    })
}));
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser("abcdefg"));
app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}));
app.set('view engine', serverConfig.view_engine);
app.set('views', __dirname + '/views');
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) 
{
	console.log('-------------------------------------Total Requests--'+counter++);
    next(); 
});
var routes = require('./routes/index')(passport);
app.use('/', routes, function(req, res, next) {
    next();
});



app.listen(serverConfig.port, function() {
    console.log("Application is running on port " + serverConfig.port);
});