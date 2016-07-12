"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var CounterSchema = new Schema({
    "totalCancled": Number,
    "totalScheduled": Number,
    "totalDeleted": Number,
	"totalTransantion": Number
});
module.exports = CounterSchema;
