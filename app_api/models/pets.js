mongoose.model('Pets', petSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;


//Pet Services Schema
var petSchema = new Schema ({
    provider: {
        type: Boolean,
        required: true},
    serviceTypes: [serviceTypeSchema],
    school: String,
    address: String,
    sizeSmall: Boolean,
    sizeMedium: Boolean,
    sizeLarge: Boolean,
    sizeGiant: Boolean,
    sun: Boolean,
    mon: Boolean,
    tue: Boolean,
    wed: Boolean,
    thur: Boolean,
    fri: Boolean,
    sat: Boolean,
    haveCar: Boolean
});

//ServiceTypeSchema
var serviceTypeSchema = new Schema ({
    serviceType: String
});


