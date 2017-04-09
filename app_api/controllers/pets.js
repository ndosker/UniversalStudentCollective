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
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.petsUpdateOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.petsDeleteOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};