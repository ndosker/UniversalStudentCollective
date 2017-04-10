var mongoose = require('mongoose');
var Prov = mongoose.model('Provider');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsCreate = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsReadOne = function (req, res) { 
    console.log("Pulling up single review");
     if (req.params && req.params.providerid && req.params.reviewid) { //look for providerid and reviewid parameters in the request.
          Prov
               .findById(req.params.providerid)
               .select('name reviews')          //add Mongoose select method to model query, we want name of provider and reviews
               .exec(
                   function(err, provider) {
                       console.log(provider);
                    var response, pulledReview;
                    if (!provider) {
                         sendJsonResponse(res, 404, {
                              "message": "No provider found with that id"
                         });
                         return;
                    } else if (err) {
                         sendJsonResponse(res, 404, err);
                         return;
                    }
                    if (provider.reviews && provider.reviews.length > 0) { //check that returned provider has reviews
                        pulledReview = provider.reviews.id(req.params.reviewid); //use Mongoose subdocument .id method to search for matching ID
                        if (!pulledReview) {                                     // if review isn't found
                            sendJsonResponse(res, 404, {
                                "message": "no review found with that id..."
                            });
                        } else {                                         //if review is found, build response object returning review and provider name and ID
                            response = {
                                provider : {
                                    name : provider.name,
                                    id : req.params.providerid
                                },
                                review : pulledReview
                            };
                            sendJsonResponse(res, 200, response);
                        }
                    } else {                                            //if no reviews are found
                        sendJsonResponse(res, 404, {
                            "message": "No reviews found"
                        });
                    }
                    
               });
     } else {
          sendJsonResponse(res, 404, {
               "message": "Not found, providerid and reviewid are required"
          });
     }
};
     
module.exports.reviewsUpdateOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsDeleteOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};