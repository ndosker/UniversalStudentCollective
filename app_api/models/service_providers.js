var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;



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
    address: String,
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5},
    attributes: String, 
    coords: {
        type: [Number], 
        index: '2dsphere',
        required: true
    },
    reviews: [reviewSchema]
});

mongoose.model('Provider', providerSchema);

//ServiceTypeSchema
//var serviceTypeSchema = new Schema ({
    //serviceType: String
//});

//Pet Services Schema
var petSchema = new Schema ({
    provider: {
        type: Boolean,
        required: true},

   // serviceTypes: [serviceTypeSchema],
    serviceTypes: String,
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
    haveCar: Boolean,
    coords: {
        type: [Number], 
        index: '2dsphere',
        required: false
    }
});

mongoose.model('Pet', petSchema);

//areaSchema
var areaSchema = new Schema ({
    oneMile: Boolean,
    threeMile: Boolean,
    fiveMile: Boolean,
    any: Boolean
});

//Ride Schema
var rideSchema = new Schema ({
    provider: {type: Boolean, required: true},
    currentLocation: {type: String, required: true},
    destination: String,
    area: areaSchema
    
});

mongoose.model('Ride', rideSchema);

//Events Schema
var eventSchema = new Schema ({
    provider: String, 
    eventTitle: String,
    location: String,
    date: String,
    venue: String,
    details: String
});

mongoose.model('Events', eventSchema); 

//Diet Schema
var dietSchema = new Schema ({
    vegan: {type: Boolean, required: true, "default": false},
    vegetarian: {type: Boolean, required: true, "default": false},
    glutenFree: {type: Boolean, required: true, "default": false},
    paleo: {type: Boolean, required: true, "default": false},
    organic: {type: Boolean, required: true, "default": false},
    local: {type: Boolean, required: true, "default": false},
    other: {type: Boolean, required: true, "default": false}
});

var mealLocalSchema = new Schema ({
    school: {type: Boolean, required: true, "default": false},
    neighborhood: {type: Boolean, required: true, "default": false},
    city: {type: Boolean, required: true, "default": false},
    region: {type: Boolean, required: true, "default": false},
    state: {type: Boolean, required: true, "default": false},
    country: {type: Boolean, required: true, "default": false},
    world: {type: Boolean, required: true, "default": false}
});

//Meals Schema
var mealSchema = new Schema ({
    provider: {type: Boolean, required: true},
    title: String,
    currentLocation: String,
    meal: String,
    eventData: {type: String, required: true},
    sitDown: Boolean,
    cost: String,
    dollarSigns: {type: Number, "default": 0, min: 0, max: 3},
    allergies: Boolean,
    allergyType: String,
    dietPreference: dietSchema,
    mealLocal: mealLocalSchema,
    description: String
});

//Goods Schema
var goodsSchema = new Schema ({
    provider: {type: Boolean, required: true},
    good: {type: String, required: true},
    location: {type: String, reqired: true},
    date: String
});

//User Schema
// var usersSchema = new Schema ({
//     firstName: { 
//         type: String, 
//         required: true},
//     middleName: {
//         type: String},
//     lastName: {
//         type: String, 
//         required: true},
//     email: {
//         type: String, 
//         required: true},
//     passwordHash: {
//         type: String},
//     passwordSalt: {
//         type: String}
// });

// mongoose.model('Users', userSchema);


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


