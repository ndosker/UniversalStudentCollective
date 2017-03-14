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

/* GET Goods page */
module.exports.goods = function(req, res) {
	res.render('goods', {title:'Goods'});
};