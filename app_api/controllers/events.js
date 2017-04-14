var mongoose = require('mongoose');
var Even = mongoose.model('Events');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.eventsListByDistance = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

//POST method on events, requires are in eventSchema
module.exports.eventsCreate = function (req, res) {
    Even.create({
        provider: req.body.provider,
        eventTitle: req.body.eventTitle,
        locate: req.body.location,
        date: req.body.date.split(" "),
        details: req.body.details,
        venue: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    }, function(err, provider) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, provider);
        }
    });
};

module.exports.evensReadOne = function (req, res) {
     if (req.params && req.params.eventsid) {//event id
          Even
               .findById(req.params.eventsid)
               .exec(function(err, events) {
                    if (!events) {
                         sendJsonResponse(res, 404, {
                              "message": "No event found with that id"
                         });
                         return;
                    } else if (err) {
                         sendJsonResponse(res, 404, err);
                         return;
                    }
                    sendJsonResponse(res, 200, events);
               });
     } else {
          sendJsonResponse(res, 404, {
               "message": "No eventid in request"
          });
     }
};
     
module.exports.eventsUpdateOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.eventsDeleteOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};



