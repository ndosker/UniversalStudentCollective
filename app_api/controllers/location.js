var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


var buildLocationsList = function(req, res, results, stats) {
  var locations = [];
  results.forEach(function(doc) {
    locations.push({
      streetNum: doc.obj.streetNum,
      streetName: doc.obj.streetName,
      city: doc.obj.city,
      state: doc.obj.state,
      zipCode: doc.obj.zipCode,
      _id: doc.obj._id
    });
  });
  return locations;
};

module.exports.locationsCreate = function (req, res) {
    Loc.create({
      streetNum: req.body.streetNum,
      streetName: req.body.streetName,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    }, function(err, location) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, location);
        }
    });
};


//Read and return a single location
module.exports.locationsReadOne = function (req, res) {
    if (req.params && req.params.locationid) {  //check for locationid in the request parameter
        Loc
            .findById(req.params.locationid)
            .exec(function(err, locations) {
                if (!locations) {                //if mongoose doesn't return a provider, send 404 message and exit function using return
                 sendJsonResponse(res, 404, {
                     "message": "No location found with that id"
                 });
                 return;
                } else if (err) {               //if Mongoose returns an error send that error as 404 message and exit using return
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, locations);
            });
    } else {                                    //if request parameters didn't include locationid parameter, send 404 response.
        sendJsonResponse(res, 404, {
            "message": "No locationid in request"
        });
    }
};

module.exports.locationsUpdateOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.locationsDeleteOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

