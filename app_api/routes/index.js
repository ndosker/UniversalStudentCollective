var express = require('express');
var router = express.Router();
var ctrlPets = require('../controllers/pets');
var ctrlProviders = require('../controllers/providers');

//pets
router.get('/pets', ctrlPets.petsListByDistance);
router.post('/pets', ctrlPets.petsCreate);
router.get('/pets/:petid', ctrlPets.petsReadOne);
router.put('/pets/:petid', ctrlPets.petsUpdateOne);
router.delete('/pets/:petid', ctrlPets.petsDeleteOne);

//providers
router.get('/providers', ctrlProviders.providersListByDistance);
router.post('/providers', ctrlProviders.providersCreate);
router.get('/providers/:providerid', ctrlProviders.providersReadOne);
router.put('/providers/:providerid', ctrlProviders.providersUpdateOne);
router.delete('/providers/:providerid', ctrlProviders.providersDeleteOne);

module.exports = router;