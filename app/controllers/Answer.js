var models = require('../models'),
	_ = require('lodash'),
	validator = require('./validators/Answer');

module.exports = {

	create: function(req, res) {

		req.check(validator.create);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var admittedFields = [
				'formId', 'questionId', 'answer'
			];

			var fields = _.pick(req.body, admittedFields);

			models.Answer.insert(fields, function(err, answers) {
				if(err)
					res.sendStatus(500);
				else
					res.send(answers[0]);
			});

		}

	},

	update: function(req, res) {

		req.check(validator.update);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var admittedFields = [
				'answer'
			];

			var fields = _.pick(req.body, admittedFields);

			var whereFields = {
				id: req.params.id
			};

			models.Answer.update(whereFields, fields, function(err, answers) {
				if(err)
					res.sendStatus(500);
				else
					res.send(answers[0]);
			});

		}


	}

};