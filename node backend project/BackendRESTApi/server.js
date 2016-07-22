"use strict";
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = require("./routes/index");
var mongoose = require("mongoose");
var logger = require('morgan');
var serverConfig= require('./config/serverConfig');
var fs = require('fs');

var counter=0;

app.use(logger('common', {
    stream: fs.createWriteStream('./log/access.log', {
        flags: 'a'
    })
}));
app.set('port', serverConfig.port);
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    "extended": false
}));

app.use('/calendarId', router);
app.listen(app.get('port'));

console.log("Application running on " + app.get('port'));
