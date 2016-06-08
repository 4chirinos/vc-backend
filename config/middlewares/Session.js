var models = require('../../app/models');

module.exports = {

	validUser: function(req, res, next) {
		
		var body = req.body;

		if(typeof(body.email == 'string') && typeof(body.password == 'string')) {
			models.User.findOne({email: body.email}, function(err, user) {
				if(err) res.status(500).send('Internal error');
				if(user) {
					models.User.comparePassword(body.password, user.password, function(err, match) {
						if(err) res.status(500).send('Internal error');
						if(match) {
							req.userId = user.id;
							next();
						} else {
							res.status(404).send('User not found');
						}
					});
				}
			});
		} else {
			res.status(400).send('Incorrect data types');
		}

	}

};