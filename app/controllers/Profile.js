var models = require('../models'),
	_ = require('lodash'),
	validator = require('./validators/Profile');

module.exports = {

	getByType: function(req, res) {

		req.check(validator.getByTypeId);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var whereFields = {
				type: req.params.type.toLowerCase()
			};

			models.Profile.getByType(whereFields, function(err, profiles) {

				if(err)
					res.sendStatus(500);
				else
					res.send(profiles);

			});

		}

	}

};