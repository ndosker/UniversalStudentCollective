mongoose.model('Location', locationSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var locationSchema = new Schema ({
    streetNum: { 
        type: [Number], 
        required: true},
    streetName: {
        type: String,
        required: true},
    city: {
        type: String, 
        required: true},
    state: {
        type: String, 
        required: true},
    zipCode: {
        type: [Number], 
        required: true}
});