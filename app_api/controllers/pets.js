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
       maxDistance: theEarth.getRadsFromDistance(maxDistance),
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
     if (!req.params.petid) {
          sendJsonResponse(res, 404, {
               "message": "Not found, petid is required"
          });
          return;
     }
     Pet
          .findById(req.params.petid)
          .select('')
          .exec(
               function(err, pet){
                    if(!pet){
                         sendJsonResponse(res, 404, {
                              "message": "Pet with that petid not found"
                         });
                         return;
                    } else if (err){
                         sendJsonResponse(res, 404, err);
                         return;
                    }
                    pet.school = req.body.school;
                    pet.address = req.body.address;
                    pet.sizeSmall = req.body.sizeSmall;
                    pet.sizeMedium = req.body.sizeMedium;
                    pet.sizeLarge = req.body.sizeLarge;
                    pet.sizeGiant = req.body.sizeLarge;
                    pet.sun = req.body.sun;
                    pet.mon = req.body.mon;
                    pet.tue = req.body.tue;
                    pet.wed = req.body.wed;
                    pet.thu = req.body.thu;
                    pet.fri = req.body.fri;
                    pet.sat = req.body.sat;
                    pet.haveCar = req.body.haveCar;
                    pet.save(function(err, pet) {
                         if (err) {
                              sendJsonResponse(res, 404, err);
                         } else {
                              sendJsonResponse(res, 200, pet);
                         }
                    })
          })
};

module.exports.petsDeleteOne = function (req, res) {
     var petid = req.params.petid;
     if (petid) {
         Pet
            .findByIdAndRemove(petid)
            .exec (
                function (err, location) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, petid);
                });
     } else {
         sendJsonResponse(res, 404, {
             "message": "No petid"
         });
     }
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
       sizeLarge: req.body.sizeLarge,
       sizeGiant: req.body.sizeGiant,
       sun: req.body.sun,
       mon: req.body.mon,
       tue: req.body.tue,
       wed: req.body.wed,
       thur: req.body.thur,
       fri: req.body.fri,
       sat: req.body.sat,
       haveCar: req.body.haveCar,
       coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
    }, function(err, provider) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, provider);
        }
    });
};