var express = require('express');
var router = express.Router();
var ctrlPets = require('../controllers/pets');
var ctrlProviders = require('../controllers/providers');
var ctrlUsers = require('../controllers/users')
var ctrlReviews = require('../controllers/reviews');

var ctrlLocations = require('../controllers/location');

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

//users
router.post('/users', ctrlUsers.userCreate);
router.get('/users/:userid', ctrlUsers.usersReadOne);
router.put('/users/:userid', ctrlUsers.usersUpdateOne);
router.delete('/users/:userid', ctrlUsers.usersDeleteOne);

//reviews
router.post('/providers/:providerid/reviews', ctrlReviews.reviewsCreate);
router.get('/providers/:providerid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/providers/:providerid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/providers/:providerid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);


//locations
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);


module.exports = router;