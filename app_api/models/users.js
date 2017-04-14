var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var userSchema = new Schema ({
    firstName: { 
        type: String, 
        required: true
        max:100},
    middleName: {
        type: String
        max:100},
    lastName: {
        type: String, 
        required: true
        max:100},
    email: {
        type: String, 
        required: true},
    passwordHash: {
        type: String},
    passwordSalt: {
        type: String}
});

module.exports = mongoose.model('Users', userSchema)