var models = require('../models'),
	randToken = require('rand-token');

module.exports = {
	
	create: function(req, res) {

		var token = req.userId.toString() + randToken.generate(64);

		var session = {
			id: req.userId,
			token: token
		};

		models.Session.save(session, function(err, session) {
			if(err) res.status(500).send('Internal error');
			res.send(token);
		});

	}

};