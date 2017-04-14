var express = require('express');
var router = express.Router();
var ctrlPets = require('../controllers/pets');
var ctrlProviders = require('../controllers/providers');
var ctrlReviews = require('../controllers/reviews');
var ctrlEvents = require('../controllers/events');

//pets
router.get('/pets', ctrlPets.petsListByDistance);
router.post('/pets', ctrlPets.petsCreate);
router.get('/pets/:petid', ctrlPets.petsReadOne);
router.put('/pets/:petid', ctrlPets.petsUpdateOne);
router.delete('/pets/:petid', ctrlPets.petsDeleteOne);


//events
router.get('/events', ctrlEvents.eventsListByDistance);
router.post('/events', ctrlEvents.eventsCreate);
router.get('/events/:eventid', ctrlEvents.eventsReadOne);
router.put('/events/:eventid', ctrlEvents.eventsUpdateOne);
router.delete('/events/:eventid', ctrlEvents.eventsDeleteOne);


//providers
router.get('/providers', ctrlProviders.providersListByDistance);
router.post('/providers', ctrlProviders.providersCreate);
router.get('/providers/:providerid', ctrlProviders.providersReadOne);
router.put('/providers/:providerid', ctrlProviders.providersUpdateOne);
router.delete('/providers/:providerid', ctrlProviders.providersDeleteOne);

//reviews
router.post('/providers/:providerid/reviews', ctrlReviews.reviewsCreate);
router.get('/providers/:providerid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/providers/:providerid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/providers/:providerid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);




module.exports = router;