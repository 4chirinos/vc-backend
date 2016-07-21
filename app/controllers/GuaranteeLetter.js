var GuaranteeLetterModel = require('../models/GuaranteeLetter'),
	_ = require('lodash'),
	validator = require('./validators/GuaranteeLetter');

module.exports = {

	getAll: function(req, res) {

		GuaranteeLetterModel
		.forge()
		.query(function(qb) {
			if(req.query.code) {
				qb.where({code: req.query.code});
			}
		})
		.fetchAll({
			withRelated: ['status', 'budget.affiliated', 'request']
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
			withRelated: ['status', 'budget.affiliated', 'request']
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