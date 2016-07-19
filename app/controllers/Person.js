var PersonModel = require('../models/Person');


module.exports = {

	getAll: function(req, res) {

		PersonModel
		.forge()
		.fetchAll({withRelated: ['profile']})
		.then(function(collection) {
			res.send(collection.toJSON());
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	}

};