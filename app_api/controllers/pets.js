var mongoose = require('mongoose');
var Pet = mongoose.model('Pet');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.petsListByDistance = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};


module.exports.petsCreate = function (req, res) {
    Pet.create({
        provider: req.body.provider,
       // serviceType: req.body.serviceTypes.split(","),
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
};