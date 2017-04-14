// var User = require('../model/user');

// exports.create(req, res, next) {
//     var newUser = new User (req.body);
//     newUser.save(function (err) {
//         if(err)
//             return next(err);
//         res.json({
//             messsage: 'User created'
//         });
//     });
// }

// exports.listAll(req, res, next) {
//     User.find({}, function(err, users){
//         if(err)
//             return next(err);
//         res.json(users)
//     });
// }

// exports.getById(req, res, next) {
//     User.findById(req.params.id, function(err, user) {
//         if(err)
//             return next(err);
//         res.json(user)
//     });
// }

var mongoose = require('mongoose');
var User = mongoose.model('Users');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


var buildUserList = function(req, res, results, stats) {
  var users = [];
  results.forEach(function(doc) {
    users.push({
      firstName: doc.obj.firstName,
      middleName: doc.obj.middleName,
      lastName: doc.obj.lastName,
      email: doc.obj.email,
      passwordHash: doc.obj.passwordHash,
      passwordSalt: doc.obj.passwordSalt,
      _id: doc.obj._id
    });
  });
  return users;
};

module.exports.userCreate = function (req, res) {
    User.create({
        firstName: req.body.firstName,
        middleName: req.doc.middleName,
        lastName: req.doc.lastName,
        email: req.doc.email,
        passwordHash: req.doc.passwordHash,
        passwordSalt: req.doc.passwordSalt,
        function(err, users) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, users);
        }
    });
};


//Read and return a single user
module.exports.usersReadOne = function (req, res) {
    if (req.params && req.params.userid) {  //check for userid in the request parameter
        Prov
            .findById(req.params.userid)
            .exec(function(err, user) {
                if (!user) {                //if mongoose doesn't return a user, send 404 message and exit function using return
                 sendJsonResponse(res, 404, {
                     "message": "No user found with that id"
                 });
                 return;
                } else if (err) {               //if Mongoose returns an error send that error as 404 message and exit using return
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, user);
            });
    } else {                                    //if request parameters didn't include userid parameter, send 404 response.
        sendJsonResponse(res, 404, {
            "message": "No userid in request"
        });
    }
};

module.exports.usersUpdateOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.usersDeleteOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

