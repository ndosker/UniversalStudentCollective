var mongoose = require('mongoose');
var Pet = mongoose.model('Pet');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var theEarth = (function(){
    var earthRadius = 3959; //Define fixed value for earth's radius in miles (km is 6371)
    
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

module.exports.petsListByDistance = function (req, res) {
   var lng = parseFloat(req.query.lng);  //get coordinates from query string and convert from strings to numbers
   var lat = parseFloat(req.query.lat);
   var maxDistance = parseFloat(req.query.maxDistance);
   var point = {                        //create geoJSON point
       type: "Point",
       coordinates: [lng, lat]
   };
   var geoOptions = {                       //options object incluing max distance set to maxDistance in miles and result list limited to 10
       spherical: true,
       maxDistance: theEarth.getRadsFromDistance(20),
       num: 10
   };
    if (!lng || !lat || !maxDistance) {
    console.log('locationsListByDistance missing params');
    sendJsonResponse(res, 404, {
      "message": "lng, lat and maxDistance query parameters are all required"
    });
    return;
  }
  Pet.geoNear(point, geoOptions, function(err, results, stats) {
    var pets;
    console.log('Geo Results', results);
    console.log('Geo stats', stats);
    if (err) {
      console.log('geoNear error:', err);
      sendJsonResponse(res, 404, err);
    } else {
      pets = buildPetsList(req, res, results, stats);
      sendJsonResponse(res, 200, pets);
    }
  });
};


var buildPetsList = function(req, res, results, stats) {
  var pets = [];
  results.forEach(function(doc) {
    pets.push({
      distance: theEarth.getDistanceFromRads(doc.dis),
      school: doc.obj.school,
      address: doc.obj.address,
      haveCar: doc.obj.haveCar,
      provider: doc.obj.provider,
      _id: doc.obj._id
    });
  });
  return pets;
};



module.exports.petsReadOne = function (req, res) {
     if (req.params && req.params.petid) {
          Pet
               .findById(req.params.petid)
               .exec(function(err, pet) {
                    if (!pet) {
                         sendJsonResponse(res, 404, {
                              "message": "No pet found with that id"
                         });
                         return;
                    } else if (err) {
                         sendJsonResponse(res, 404, err);
                         return;
                    }
                    sendJsonResponse(res, 200, pet);
               });
     } else {
          sendJsonResponse(res, 404, {
               "message": "No petid in request"
          });
     }
};
     
module.exports.petsUpdateOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.petsDeleteOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};


module.exports.petsCreate = function (req, res) {
    Pet.create({
       provider: req.body.provider,
       //serviceType: req.body.serviceType.split(","),
       school: req.body.school,
       address: req.body.address,
       sizeSmall: req.body.sizeSmall,
       sizeMedium: req.body.sizeMedium,
       sizeGiant: req.body.sizeGiant,
       sun: req.body.sun,
       mon: req.body.mon,
       tue: req.body.tue,
       wed: req.body.wed,
       thur: req.body.thur,
       fri: req.body.fri,
       sat: req.body.sat,
       haveCar: req.body.haveCar
    }, function(err, provider) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, provider);
        }
    });
};