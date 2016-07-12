"use strict";

var dbConfig = require('../config/dbConfig.json');
var mongoose = require('mongoose');

mongoose.connect('mongodb://'+dbConfig.hostname+':'+dbConfig.port+'/'+dbConfig.database);
var Schema = mongoose.Schema	
var userCredential = new Schema({

    username:   String,
    password:   String,
	status:		String,
    logintime : String,
    logoutime : String

},  {
    collection:     'userInfo'
})

module.exports = mongoose.model('userInfo', userCredential); 