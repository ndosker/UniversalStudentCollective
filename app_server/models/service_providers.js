var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

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
        min: 0,
        max: 5},
    attributes: {
        type: String, 
        required: true},
    distance: {
        type: String, 
        required: true}
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