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
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.providersUpdateOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.providersDeleteOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

