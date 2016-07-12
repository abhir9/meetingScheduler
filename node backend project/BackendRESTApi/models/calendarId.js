"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var CalenderSchema = new Schema({
    "calendarId": String,
    "startTime": String,
    "duration": String,
    "startDate": String,
    "subject": String,
    "meetingId": String,
    "status": String,
    "creationTime": Date,
    "users": Array

});
module.exports = CalenderSchema;
