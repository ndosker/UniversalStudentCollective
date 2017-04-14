var mongoose = require('mongoose');
var Prov = mongoose.model('Provider');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* POST a new review, need providerid */
/* /api/providers/:providerid/reviews */
module.exports.reviewsCreate = function(req, res) {
    console.log("accessing reviewsCreate POST method")
     var providerid = req.params.providerid;
     if (providerid) {
         Prov
            .findById(providerid)
            .select('reviews')
            .exec(
                function(err, provider) {
                    if (err){
                        sendJsonResponse(res, 400, err);
                    } else {
                        doAddReview(req, res, provider);
                    }
                }
        );
     } else {
         sendJsonResponse(res, 404, {
             "message": "Not found, providerid required"
         });
     }
};

var doAddReview = function(req, res, provider) {
  if (!provider) {
    sendJsonResponse(res, 404, "providerid not found");
  } else {
    console.log("providerid found")
    provider.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    provider.save(function(err, provider) {
      var thisReview;
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        updateAverageRating(provider._id);
        thisReview = provider.reviews[provider.reviews.length - 1];
        sendJsonResponse(res, 201, thisReview);
      }
    });
  }
};

var updateAverageRating = function(providerid) {
  console.log("Update rating average for", providerid);
  Prov
    .findById(providerid)
    .select('reviews')
    .exec(
      function(err, provider) {
        if (!err) {
          doSetAverageRating(provider);
        }
      });
};

var doSetAverageRating = function(provider) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (provider.reviews && provider.reviews.length > 0) {
    reviewCount = provider.reviews.length;
    ratingTotal = 0;
    for (i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + provider.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    provider.rating = ratingAverage;
    provider.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};

/* GET a review, need providerid and reviewid */
/* /api/providers/:providerid/reviews/:reviewid */
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
     
/*PUT method on a review, need providerid and reviewid 
 /api/providers/:providerid/reviews/:reviewid */
module.exports.reviewsUpdateOne = function (req, res) {
    console.log("accessing reviewsUpdateOne function PUT method")
     if (!req.params.providerid || !req.params.reviewid) {
         sendJsonResponse(res, 404, {
             "message": "Not found, providerid and reviewid are both required"
         });
         return;
     }
     Prov
        .findById(req.params.providerid) //find parent document
        .select('reviews')
        .exec(
            function(err, provider) {
                var thisReview;
                if (!provider) {
                    sendJsonResponse(res, 404, {
                        "message": "providerid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                if(provider.reviews && provider.reviews.length > 0) {
                    thisReview = provider.reviews.id(req.params.reviewid); //find subdocument
                    if (!thisReview){
                        sendJsonResponse(res, 404, {
                            "message": "reviewid not found"
                        });
                    } else {
                        console.log("found subdocument" + req.params.reviewid)
                        thisReview.author = req.body.author;
                        thisReview.rating = req.body.rating;
                        thisReview.reviewText = req.body.reviewText;
                        provider.save(function (err, provider){
                            if (err) {
                                sendJsonResponse(res, 404, {
                                    "message": "provider.save error"
                                });
                            } else {
                                updateAverageRating(provider._id);
                                sendJsonResponse(res, 200, {
                                    "message": "saved to db" + thisReview
                                    });
                            }
                        });
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No review to update"
                    });
                }
            }
        );
};

module.exports.reviewsDeleteOne = function (req, res) {
     sendJsonResponse(res, 200, {"status" : "success"});
};