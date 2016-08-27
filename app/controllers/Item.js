var ItemModel = require('../models/Item'),
	RequestModel = require('../models/Request'),
	HistoricalItemModel = require('../models/historicalItem'),
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

			var aux = model.toJSON();

			HistoricalItemModel
			.forge({
				itemId: aux.id, description: aux.description,
				concept: aux.concept, quantity: aux.quantity, cost: aux.cost
			})
			.save()
			.then(function(model1) {

				model.save(fields)
				.then(function(model) {

					ItemModel
					.forge({id: model.get('id')})
					.fetch({withRelated: ['historical']})
					.then(function(model) {

						model = model.toJSON();

						var fields = {};

						if(req.userData.user.profile.profile == 'analista') {
							fields.analystId = req.userData.userId;
						} else if(req.userData.user.profile.profile == 'coordinador') {
							fields.coordinatorId = req.userData.userId;
						} else {
							fields.visitorId = req.userData.userId;
						}

						RequestModel.count(fields, function(err, count) {
							if(err) {
								res.sendStatus(500);
								return;
							}
							model.statusGroups = count;
							res.send(model);
						});

					})
					.catch(function(err) {
						console.log(err);
						res.sendStatus(500);
					});

				})
				.catch(function(err) {
					console.log(err);
					res.sendStatus(500);
				});
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