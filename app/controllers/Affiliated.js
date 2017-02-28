var AffiliatedModel = require('../models/Affiliated'),
	AffiliatedPhoneModel = require('../models/affiliatedPhoneNumber'),
	_ = require('lodash');

var bookshelf = require('../../config/db/builder-knex');

module.exports = {

	getAll: function(req, res) {

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		AffiliatedModel
		.fetchPage({
			page: page,
			pageSize: pageSize,
			withRelated: ['phones', 'state']
		})
		.then(function(collection) {

			var response = {};

			response.affiliateds = collection.toJSON();
			response.pageCount = collection.pagination.pageCount;

			res.send(response);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getById: function(req, res) {

		AffiliatedModel
		.forge({id: req.params.id})
		.fetch({withRelated: ['phones', 'state']})
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			model = model.toJSON();

			res.send(model);

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
	},

	partialUpdate: function(req, res) {

		AffiliatedModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			var fields = {
				name: req.body.name.toUpperCase(),
				rif: req.body.rif.toUpperCase(),
				address: req.body.address.toUpperCase(),
				stateId: req.body.stateId
			};

			model.save(fields)
			.then(function(model) {
				model = model.toJSON();

				AffiliatedPhoneModel
				.query(function(qb) {
					qb.where('affiliatedId', req.params.id).del();
				})
				.fetch()
				.then(function(model) {
					
					var newPhones = [], aux = req.body.phones.split("/"), r = [];

					for(var i = 0; i < aux.length; i++) {
						r.push({
							affiliatedId: req.body.id,
							phoneNumber: aux[i].trim()
						});
					}

					bookshelf.knex.batchInsert('affiliatedPhoneNumber', r)
					.returning('*')
					.then(function(fields) {
						
						AffiliatedModel
						.forge({id: req.params.id})
						.fetch({withRelated: ['phones', 'state']})
						.then(function(model) {
							model = model.toJSON();
							res.send(model);
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
	}

};