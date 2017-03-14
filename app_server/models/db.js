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
    console.log('Mongoose done got disconnected');
});

//gracefulShutdown accepts a message and callback function
var gracefulShutdown = function (msg, callback) {
    //close mongoose connection, pass through an anonymous function to run when closed
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);  // output message and callback when Mongoose connection is closed
        callback();
    
    });
};

//Listen for SIGUSR2, which is what nodemon uses
process.once('SIGUSR2', function () {
    //Send message to gracefulShutdown and callback to kill process, emitting SIGUSR2 again
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

//Listen for SIGINT emitted on app termination
process.on('SIGINT', function () {
    //Send message to gracefulShutdown and callback to exit Node process
    gracefulShutdown('app termination... you killed it.', function () {
        process.exit(0);
    });
});

//Listen for SIGTERM emitted when Heroku shuts down process
process.on('SIGTERM', function () {
    //Send message to gracefulShutdown and callabck to exit Node process
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});


    
    