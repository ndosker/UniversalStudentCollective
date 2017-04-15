var mongoose = require('mongoose');
var Prov = mongoose.model('Provider');

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

module.exports.providersListByDistance = function (req, res) {
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
  Prov.geoNear(point, geoOptions, function(err, results, stats) {
    var providers;
    console.log('Geo Results', results);
    console.log('Geo stats', stats);
    if (err) {
      console.log('geoNear error:', err);
      sendJsonResponse(res, 404, err);
    } else {
      providers = buildProviderList(req, res, results, stats);
      sendJsonResponse(res, 200, providers);
    }
  });
};

var buildProviderList = function(req, res, results, stats) {
  var providers = [];
  results.forEach(function(doc) {
    providers.push({
      distance: theEarth.getDistanceFromRads(doc.dis),
      name: doc.obj.name,
      address: doc.obj.address,
      rating: doc.obj.rating,
      facilities: doc.obj.facilities,
      _id: doc.obj._id
    });
  });
  return providers;
};

//POST method on providers, requires are in providerSchema
module.exports.providersCreate = function (req, res) {
    Prov.create({
        name: req.body.name,
        address: req.body.address,
        attributes: req.body.attributes.split(","),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    }, function(err, provider) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, provider);
        }
    });
};


//Read and return a single provider, requires provideid parameter
// /api/provider/:providerid
module.exports.providersReadOne = function (req, res) {
    if (req.params && req.params.providerid) {  //check for providerid in the request parameter
        Prov
            .findById(req.params.providerid)
            .exec(function(err, provider) {
                if (!provider) {                //if mongoose doesn't return a provider, send 404 message and exit function using return
                 sendJsonResponse(res, 404, {
                     "message": "No provider found with that id"
                 });
                 return;
                } else if (err) {               //if Mongoose returns an error send that error as 404 message and exit using return
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, provider);
            });
    } else {                                    //if request parameters didn't include providerid parameter, send 404 response.
        sendJsonResponse(res, 404, {
            "message": "No providerid in request"
        });
    }
};

//PUT method on providers, requires providerid parameter

module.exports.providersUpdateOne = function (req, res) {
     if (!req.params.providerid) {
         sendJsonResponse(res, 404, {
             "message": "Not found, providerid is required"
         });
         return;
     }
    Prov
        .findById(req.params.providerid)
        .select('-reviews -rating')
        .exec(
            function(err, provider) {
                if (!provider) {
                    sendJsonResponse(res, 404, {
                        "message": "Provider with that providerid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                provider.name = req.body.name;
                provider.address = req.body.address;
                provider.attributes = req.body.attributes.split(",");
                provider.coords = [parseFloat(req.body.lng),parseFloat(req.body.lat)];
                provider.save(function(err, provider) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, provider);
                    }
                });
            }
    );
};

module.exports.providersDeleteOne = function (req, res) {
     var providerid = req.params.providerid;
     if (providerid) {
         Prov
            .findByIdAndRemove(providerid)
            .exec (
                function (err, location) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, providerid);
                });
     } else {
         sendJsonResponse(res, 404, {
             "message": "No providerid"
         });
     }
};

