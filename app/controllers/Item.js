var ItemModel = require('../models/Item'),
	_ = require('lodash'),
	validator = require('./validators/Item');

module.exports = {

	getAll: function(req, res) {

		ItemModel
		.forge()
		.fetchAll()
		.then(function(collection) {
			res.send(collection.toJSON());
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	partialUpdate: function(req, res) {

		req.check(validator.partialUpdate);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		var fields = _.pick(req.body, ['description', 'concept', 'cost', 'quantity']);

		ItemModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {
			if(!model) {
				res.sendStatus(404);
				return
			}
			model.save(fields)
			.then(function(model) {
				res.send(model.toJSON());
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});
		})
		.catch(function() {
			console.log(err);
			res.sendStatus(500);
		})

	}

};