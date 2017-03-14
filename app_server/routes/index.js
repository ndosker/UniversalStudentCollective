var express = require('express');
var router = express.Router();
// var ctrlMain = require('../controllers/main'); //3.4
var ctrlServices = require('../controllers/services');
// var ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlServices.login);
router.get('/main', ctrlServices.main);

//get pets
router.get('/pets', ctrlServices.pets); 

//get rides
router.get('/rides', ctrlServices.rides);

//get goods
router.get('/goods', ctrlServices.goods);

//get providers
router.get('/providers', ctrlServices.providers);

/* GET home page. */
// var homepageController = function (req, res) {
// 	res.render('index', {title: 'Express'});
// }
// router.get('/', homepageController);
// router.get('/', ctrlMain.index);
 
module.exports = router;
