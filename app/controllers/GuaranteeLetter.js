var GuaranteeLetterModel = require('../models/GuaranteeLetter'),
	_ = require('lodash'),
	validator = require('./validators/GuaranteeLetter');

module.exports = {

	getAll: function(req, res) {

		GuaranteeLetterModel
		.forge()
		.fetchAll({
			withRelated: ['status', 'budget']
		})
		.then(function(collection) {
			res.send(collection.toJSON());
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		GuaranteeLetterModel
		.forge({id: req.params.id})
		.fetch({
			withRelated: ['status', 'budget']
		})
		.then(function(model) {
			if(model)
				res.send(model.toJSON());
			else
				res.sendStatus(404);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	}

};