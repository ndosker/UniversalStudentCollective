/* GET 'home' page */
module.exports.login = function(req, res) {
	res.render('index', {title: 'Login info'});
};

/* GET 'Location info' page */
module.exports.main = function(req, res) {
	res.render('main', {title: 'Main'});
};

/* GET Pet form page */
module.exports.pets = function(req, res) {
	res.render('pets', {title:'Pet Services'});
};

/* GET Rides form page */
module.exports.rides = function(req, res) {
	res.render('rides', {title:'Rideshare Services'});
};

/* GET Goods page */
module.exports.goods = function(req, res) {
	res.render('goods', {title:'Goods'});
};

/* GET provider list */
module.exports.providers = function(req, res) {
	res.render('provider-list', {title:'Service Providers'});
};