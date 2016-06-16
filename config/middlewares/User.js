var validator = require('./validators/User'),
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

	beforeGetById: function(req, res, next) {

		req.check(validator.getByIdValidation);

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