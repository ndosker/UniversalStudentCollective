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
       //serviceTypes: req.body.serviceTypes.split(","),
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
     //if (!req.params.petid) {
          //sendJsonResponse(res, 404, {
               //"message": "Not found, petid is required"
          //});
          //return;
     //}
     //Pet
          //.findByID(req.params.petid)
          //.select('')
          //.exec(
               //function(err, pet){
                    //if(!pet){
                         //sendJsonResponse(res, 404, {
                              //"message": "Pet with that petid not found"
                         //});
                         //return;
                    //} else if (err){
                         //sendJsonResponse(res, 404, err);
                         //return;
                    //}
                    //pet.school = req.body.school;
                    //pet.address = req.body.address;
                    //pet.sizeSmall = req.body.sizeSmall;
                    //pet.sizeMedium = req.body.sizeMedium;
                    //pet.sizeLarge = req.body.sizeLarge;
                    //pet.sizeGiant = req.body.sizeLarge;
                    //pet.sun = req.body.sun;
                    //pet.mon = req.body.mon;
                    //pet.tue = req.body.tue;
                    //pet.wed = req.body.wed;
                    //pet.thu = req.body.thu;
                    //pet.fri = req.body.fri;
                    //pet.sat = req.body.sat;
                    //pet.haveCar = req.body.haveCar;
                    //pet.save(function(err, pet) {
                         //if (err) {
                              //sendJsonResponse(res, 404, err);
                         //} else {
                              //sendJsonResponse(res, 200, pet);
                         //}
                    //})
          //})
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.petsDeleteOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};