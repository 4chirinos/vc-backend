var validator = require('./validators/Profile'),
	models = require('../../app/models');

module.exports = {

	beforeGetAllByProfile: function(req, res, next) {

		req.check(validator.getAllByProfileValidation);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		next();

	},

	beforeAddOrDeleteProfile: function(req, res, next) {

		req.check(validator.addOrDeleteProfileValidation);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		next();

	}

};