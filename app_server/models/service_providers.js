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
