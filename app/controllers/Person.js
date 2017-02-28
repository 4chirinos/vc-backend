var PersonModel = require('../models/Person'),
	PersonPhoneModel = require('../models/personPhoneNumber');

var bookshelf = require('../../config/db/builder-knex');

module.exports = {

	getAll: function(req, res) {

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		PersonModel
		.query(function(qb) {
			if(req.query.identityCard) {
				qb.where({'identityCard': req.query.identityCard});
			}
			if(req.query.firstName) {
				qb.where({'firstName': req.query.firstName});
			}
			if(req.query.lastName) {
				qb.where({'lastName': req.query.lastName});
			}
			if(req.query.profileId) {
				qb.where({'profileId': req.query.profileId});
			} else {
				qb.where('profileId', 'in', [1, 2, 3]);
			}
			if(req.query.stateId) {
				qb.where({'stateId': req.query.stateId});
			}
		})
		.fetchPage({
			page: page,
			pageSize: pageSize,
			withRelated: ['profile', 'state']
		})
		.then(function(collection) {

			var response = {};
			response.persons = collection;
			response.pageCount = collection.pagination.pageCount;

			res.send(response);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getById: function(req, res) {

		PersonModel
		.forge({id: req.params.id})
		.fetch({withRelated: [
				'profile', 'state', 'phones',
				{'user': function(qb) {
			    		qb.column('id', 'personId', 'profileId', 'available', 'userName');
			  		}
			  	},
			  	'user.profile'
		  	]
		})
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

		PersonModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			var fields = {
				id: req.body.id,
				identityCard: req.body.identityCard,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				birthDate: req.body.birthDate,
				address: req.body.address,
				gender: req.body.gender,
				stateId: req.body.stateId
			};

			model.save(fields)
			.then(function(model) {

				PersonPhoneModel
				.query(function(qb) {
					qb.where('personId', req.params.id).del();
				})
				.fetch()
				.then(function(model) {

					var newPhones = [], aux = req.body.newPhones.split("/"), r = [];

					for(var i = 0; i < aux.length; i++) {
						r.push({
							personId: req.body.id,
							phoneNumber: aux[i].trim()
						});
					}

					bookshelf.knex.batchInsert('personPhoneNumber', r)
					.returning('*')
					.then(function(fields) {
						
						PersonModel
						.forge({id: req.params.id})
						.fetch({withRelated: [
								'profile', 'state', 'phones',
								{'user': function(qb) {
							    		qb.column('id', 'personId', 'profileId', 'available', 'userName');
							  		}
							  	},
							  	'user.profile'
						  	]
						})
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

	}

};