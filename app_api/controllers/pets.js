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
     sendJsonResponse(res, 200, {"status" : "success"});
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