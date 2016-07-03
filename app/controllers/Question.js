var models = require('../models'),
	_ = require('lodash'),
	validator = require('./validators/Question');

module.exports = {

	create: function(req, res) {

		req.check(validator.create);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var admittedFields = [
				'question'
			];

			var fields = _.pick(req.body, admittedFields);

			fields = _.mapValues(fields, _.method('toLowerCase'));

			models.Question.insert(fields, function(err, questions) {
				if(err)
					res.sendStatus(500);
				else
					res.send(questions[0]);
			});

		}

	},

	getAll: function(req, res) {

		var whereFields = {
			available: true
		};

		models.Question.getAll(function(err, questions) {
			if(err)
				res.sendStatus(500);
			else
				res.send(questions);
		});

	},

	update: function(req, res) {

		req.check(validator.update);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var admittedFields = [
				'question', 'available'
			];

			var fields = _.pick(req.body, admittedFields);

			fields = _.mapValues(fields, stringToLowerCase);

			var whereFields = {
				id: req.params.id
			};

			models.Question.update(whereFields, fields, function(err, questions) {
				if(err)
					res.sendStatus(500);
				else
					res.send(questions[0]);
			});

		}

	},

	partialUpdate: function(req, res) {

		req.check(validator.partialUpdate);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var admittedFields = [
				'question', 'available'
			];

			var fields = _.pick(req.body, admittedFields);

			fields = _.mapValues(fields, stringToLowerCase);

			var whereFields = {
				id: req.params.id
			};

			models.Question.update(whereFields, fields, function(err, questions) {
				if(err)
					res.sendStatus(500);
				else
					res.send(questions[0]);
			});

		}

	}

};

var stringToLowerCase = function(key) {
	if(_.isString(key)) 
		return key.toLowerCase();
	return key;
};