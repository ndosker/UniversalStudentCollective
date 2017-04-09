var mongoose = require('mongoose');
var Prov = mongoose.model('Provider');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.providersListByDistance = function (req, res) {
   sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.providersCreate = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.providersReadOne = function (req, res) {
    if (req.params && req.params.providerid) {
        Prov
            .findById(req.params.providerid)
            .exec(function(err, provider) {
                if (!provider) {
                 sendJsonResponse(res, 404, {
                     "message": "No provider found with that id"
                 });
                 return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, provider);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No providerid in request"
        });
    }
};

module.exports.providersUpdateOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.providersDeleteOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

