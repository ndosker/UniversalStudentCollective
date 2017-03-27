var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var reviewSchema = new Schema ({
    author: String,
    rating: {type: Number, "default": 0, min: 0, max: 5},
    reviewText: String,
    createdOn: {type: Date, "default": Date.now}
});

var providerSchema = new Schema ({
    name: {
        type: String, 
        required: true},
    address: {
        type: String, 
        required: true},
    rating: {
        type: Number,
        required: true,
        "default": 0,
        min: 0,
        max: 5},
    attributes: {
        type: String, 
        required: true},
    coords: {
        type: [Number], 
        index: '2dsphere'},
    reviews: [reviewSchema]
});

var loginSchema = new Schema ({
    username: {
        type: String, 
        required: true},
    password: {
        type: String, 
        required: true}
});

var userSchema = new Schema ({
    firstName: { 
        type: String, 
        required: true},
    lastName: {
        type: String, 
        required: true},
    email: {
        type: String, 
        required: true},
    password: {
        type: String, 
        required: true}
});