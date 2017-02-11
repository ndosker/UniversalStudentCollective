/* GET 'home' page */
module.exports.login = function(req, res) {
	res.render('index', {title: 'Login info'});
};

/* GET 'Location info' page */
module.exports.main = function(req, res) {
	res.render('main', {title: 'Main'});
};