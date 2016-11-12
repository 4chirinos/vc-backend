var _ = require('lodash'),
	UserModel = require('../models/User'),
	validator = require('./validators/User'),
	RequestModel = require('../models/Request'),
	_ = require('lodash');

module.exports = {

	create: function(req, res) {

		req.check(validator.create);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		var bodyFields = [
			'personId', 'password', 'profileId'
		];

		var fields = _.pick(req.body, bodyFields);

		UserModel
		.forge(fields)
		.save()
		.then(function(model) {
			if(model) {
				res.send(model.toJSON());
			} else {
				res.sendStatus(404);
			}
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

		UserModel
		.forge({id: req.params.id})
		.fetch({withRelated: ['person']})
		.then(function(model) {
			if(model) {
				res.send(model.toJSON());
			} else {
				res.sendStatus(404);
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getAll: function(req, res) {

		var profile = [];

		if(!Array.isArray(req.query.profile)) {
			profile.push(req.query.profile);
		} else {
			profile = req.query.profile;
		}

		var profiles = ['7', '8', '9'];

		if(req.query.profile) {
			profiles = _.intersection(['7', '8', '9'], profile);
		}

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		UserModel
		.forge()
		.query(function(qb) {
			qb.whereIn('profileId', profiles);
		})
		.fetchPage({
			page: page,
			pageSize: pageSize,
			columns: ['id', 'personId', 'profileId', 'available'],
			withRelated: ['person', 'profile', {'visitor': function(qb) { // esto es lo que me cuenta cuantas visitas asignadas tiene ese usuario (visitador)
					qb.where({statusId: 3});
				}}
			]
		})
		.then(function(collection) {
			//console.log(collection.toJSON());
			var response = {};
			response.pageCount = collection.pagination.pageCount;
			//response.users = collection.toJSON();
			var aux = collection.toJSON();
			response.users = [];

			for(var i = 0; i < aux.length; i++) {
				if(aux[i].person.stateId == req.userData.stateId) {
					var user = aux[i];
					user.assignments = user.visitor.length; // cantidad de visitas que tiene asignadas el usuario (visitador)
					response.users.push(user);
					//response.users[i].assignments = response.users[i].visitor.length;
				}
			}

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
				response.statusGroups = count;
				res.send(response);
			});

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
		
	},

	update: function(req, res) {

		req.check(validator.update);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		var bodyFields = [
			'password', 'available', 'profileId'
		];

		var fields = _.pick(req.body, bodyFields);

		UserModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {
			if(!model) {
				res.sendStatus(404);
				return;
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

		var bodyFields = [
			'password', 'available', 'profileId'
		];

		var fields = _.pick(req.body, bodyFields);

		UserModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {
			if(!model) {
				res.sendStatus(404);
				return;
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
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	}

};