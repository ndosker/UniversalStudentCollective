//Require mongoos
var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://localhost/UniversalStudentCollective';
mongoose.connect(dbURI);

//Monitor for successful connection through Mongoose
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

//Check for connection error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

//Check for disconnection event
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});