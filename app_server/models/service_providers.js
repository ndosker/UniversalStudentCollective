var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var reviewSchema = new Schema ({
    author: String,
    rating: {type: Number, "default": 0, min: 0, max: 5},
    reviewText: String,
    createdOn: {type: Date, "default": Date.now}
});

//Schema for Find function (by Nell)
var findSchema = new Schema ({
    title: {
        type: String,
        required: true},

    category: {
        type: String,
        required: true},

    location: {
        type: String,
        required: true},

    date: {
        type: String,
        required: false},
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

mongoose.model('Provider', providerSchema);

// //model for our schema to use
// mongoose.model('Profile', profileSchema);

// //grab the things we need
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var db = mongoose.connection;

// //This information will be stored when the user creates an account
// //Name//String//Input
// //Last Name//String//Input
// //E-mail//String//Input
// //Password//String//Input
// //College Name//String//Input
// //City//String//Input
// //Diet Restrictions//String//Enum
// //Allergies//Boolean//Yes/No//Nested Attribute w/input String
// ??//Pets//Dog+Number/Cat+Number/Other w/Input field + Number
// //Ride Share Driver? Boolean//Yes/No

// var profileSchema = new Schema ({
//     firstName: { 
//         type: String, 
//         required: true
//         max:100},
//     lastName: {
//         type: String, 
//         required: true
//         max:100},
//     email: {
//         type: String, 
//         required: true},
//     password: {
//         type: String, 
//         required: true},
//     collegeName: {
//         type: String,
//         required: true
//  max: 100},
//     currentCity: {
//         type: String,
//         required: true},
//     dietRestrictions: {
//         type: String,
// 	 enum: [‘Vegan’, ‘Vegetarian’, ‘Gluten-Free’, 
// 	 ‘Paleo’, ‘Organic’, ‘Locally Grown’, ‘Other’],
//         required: true},
//     allergies: {
// 	active: Boolean, 
// 	type: String},
//     pets: {
// 	count: Number,
// 	type: [String]},
//     rides: {
// 	driver: Boolean, 
// 	type: String},
// });


// mongoose.model('Login', loginSchema);

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var db = mongoose.connection;

// var loginSchema = new Schema ({
//     username: {
//         type: String, 
//         required: true
//         unique: true
//         max:100},
//     password: {
//         type: String, 
//         required: true}
// });


// mongoose.model('User', userSchema);

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var db = mongoose.connection;

// var userSchema = new Schema ({
//     firstName: { 
//         type: String, 
//         required: true
//         max:100},
//     middleName: {
//         type: String
//         max:100},
//     lastName: {
//         type: String, 
//         required: true
//         max:100},
//     email: {
//         type: String, 
//         required: true},
//     passwordHash: {
//         type: String},
//     passwordSalt: {
//         type: String}
// });


// mongoose.model('Location', locationSchema);

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var db = mongoose.connection;

// var locationSchema = new Schema ({
//     streetNum: { 
//         type: [Number], 
//         required: true},
//     streetName: {
//         type: String,
//         required: true},
//     city: {
//         type: String, 
//         required: true},
//     state: {
//         type: String, 
//         required: true},
//     zipCode: {
//         type: [Number], 
//         required: true}
// });


// mongoose.model('Search', searchSchema);

// //modules
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var textSearch = require('mongoose-text-search');

// var searchSchema = new Schema ({
//     name: { 
//         type: [String]},
//     tags: {
//         type: [String]},
//     created: {
//         type: Date},
// });

// //give schema text search capabilities
// searchSchema.plugin(textSearch);


