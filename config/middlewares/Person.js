var validator = require('./validators/Person'),
	models = require('../../app/models');

module.exports = {

	beforeCreate: function(req, res, next) {

		req.check(validator.createValidation);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		next();

	},

	beforeUpdate: function(req, res, next) {

		req.check(validator.updateValidation);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		next();

	},

	beforePartialUpdate: function(req, res, next) {

		req.check(validator.partialUpdateValidation);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		next();
	}

};