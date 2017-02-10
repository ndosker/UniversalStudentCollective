var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main'); //3.4

/* GET home page. */
// var homepageController = function (req, res) {
// 	res.render('index', {title: 'Express'});
// }
// router.get('/', homepageController);
router.get('/', ctrlMain.index);
 
module.exports = router;
