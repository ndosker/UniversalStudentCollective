var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var theEarth = (function(){
    var earthRadius = 6371; //Define fixed value for earth's radius in km (miles is 3959)
    
    var getDistanceFromRads = function(rads) {  //radians to distance
        return parseFloat(rads * earthRadius);
    };
    
    var getRadsFromDistance = function(distance) { //distance to radians
        return parseFloat(distance / earthRadius);
    };
    
    return {
        getDistanceFromRads : getDistanceFromRads,  //expose functions
        getRadsFromDistance : getRadsFromDistance
    };
}) ();

//Convert km from earthRadius to miles and vice versa
var meterConversion = (function() {
    var miToKm = function(distance) {
        return parseFloat(distance / 1000);
    };
    var kmToMi = function(distance) {
        return parseFloat(distance * 1000);
    };
    return {
        miToKm : miToKm,
        kmToMi : kmToMi
    };
})();

module.exports.users = function (req, res) {
    
}

module.exports.usersList = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var maxDistance = parseFloat(req.query.maxDistance);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        maxDistance: meterConversion.kmToMi(maxDistance),
        num: 10
    };
    if ((!lng && lng!==0) || (!lat && lat!==0) || ! maxDistance) {
        console.log('usersList missing params');
        sendJsonResponse(res, 404, {
            "message": "lng, lat, and maxDistance query parameters are required"
        });
        return;
    }
    User.geoNear(point, geoOptions, function(err, results, stats) {
        var users;
        console.log('Geo Results', results);
        console.log('Geo stats', stats);
        if(err) {
            console.log('geoNear error: ', err);
            sendJsonResponse(res, 404, err);
        } else {
            users = buildUsersList(req, res, results, stats);
            sendJsonResponse(res, 200, users);
        }
    })
}

var buildUsersList = function(req, res, results, stats) {
    var users = [];
    results.forEach(function(doc) {
        users.push({
            distance: meterConversion.miToKm(doc.dis),
            firstName: doc.obj.firstName,
            lastName: doc.obj.lastName,
            school: doc.obj.school,
            address: doc.obj.address,
            provider: doc.obj.provider,
            _id: doc.obj._id
        });
    });
    return users;
}

module.exports.usersReadOne = function(req, res) {
    var userid = req.params.userid;
    if (req.params && userid) {
        User
            .findById(req.params.userid)
            .exec(function(err, user) {
                if(!user) {
                   sendJsonResponse(res, 404, {
                       "message:": "No user found."
                   });
                   return;
                }
                else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
            });
    } else {
        sendJsonResponse(res, 404, {
            "message" : "No userid in request"
        })
    }
    
}

module.exports.usersCreate = function(req, res) {
    console.log(req.body);
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        college: req.body.college,
        address: req.body.address,
        dogNum: req.body.dogNum,
        catNum: req.body.catNum,
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
    }, function(err, user) {
        if(err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, user);
        }
    });
}

module.exports.usersUpdateOne = function(req, res) {
    if(!req.params.userid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, userid is required"
        });
        return;
    }
    User
        .findById(req.params.userid)
        .select('')
        .exec(
            function(err, user){
                if(!user){
                    sendJsonResponse(res, 404, {
                        "message": "User not found"
                    });
                    return;
                } else if(err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.college = req.body.college;
                user.address = req.body.address;
                user.dogNum = req.body.dogNum;
                user.catNum = req.body.catNum;
                user.otherPet = req.body.otherPet;
                user.otherNum = req.body.otherNum;
                user.save(function(err, user) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, user);
                    }
                })
            }
            )
}

module.exports.usersDeleteOne = function(req, res) {
    var userid = req.params.userid;
    if (userid) {
        User
            .findByIdAndRemove(userid)
            .exec (
                function (err, location){
                    if(err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, userid);
                });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No userid"
        });
    }
    sendJsonResponse(res, 200, {"status": "success"});
}