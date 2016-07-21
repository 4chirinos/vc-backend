var validator = require('./validators/Request'),
	RequestModel = require('../models/Request'),
	UserModel = require('../models/User'),
	_ = require('lodash');


module.exports = {

	getAll: function(req, res) {

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		RequestModel
		.forge()
		.fetchPage({
			page: page,
			pageSize: pageSize,
			withRelated: ['status', 
				{'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}}, 
				'analyst.person', 'coordinator.person', 
				'visitor.person',
				'guaranteeLetter.budget.affiliated'
			]
		})
		.then(function(collection) {

			var response = {};

			response.pageCount = collection.pagination.pageCount;

			collection = collection.toJSON();

			for(var i = 0; i < collection.length; i++) {
				delete collection[0].analyst.password;
				delete collection[0].visitor.password;
				delete collection[0].coordinator.password;
			}

			response.requests = collection;

			res.send(response);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getAllByMe: function(req, res) {

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		UserModel
		.forge({id: req.userId})
		.fetch({withRelated: ['profile']})
		.then(function(model) {
			var where = {};
			model = model.toJSON();

			if(model.profile.profile == 'analista')
				where.analystId = model.id;
			else if(model.profile.profile == 'coordinador')
				where.coordinatorId = model.id;
			else 
				where.visitorId = model.id;

			RequestModel
			.query('where', where)
			.fetchPage({
				page: page,
				pageSize: pageSize,
				withRelated: ['status', 
					{'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
					'analyst.person', 'coordinator.person', 'visitor.person',
					'guaranteeLetter.budget.affiliated'
				]
			})
			.then(function(collection) {
				var response = {};
				response.pageCount = collection.pagination.pageCount;
				response.requests = collection;
				res.send(response);
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

	create: function(req, res) {

		req.check(validator.create);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		RequestModel
		.forge({guaranteeLetterId: req.body.guaranteeLetterId, analystId: req.body.analystId, statusId: 2})
		.save()
		.then(function(model) {
			res.send(model);
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
			'statusId', 'visitorId', 'endDate'
		];

		var fields = _.pick(req.body, bodyFields);

		RequestModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {
			if(!model) {
				res.sendStatus(404);
				return;
			}
			model.save(fields)
			.then(function(model) {
				RequestModel
				.forge({id: req.params.id})
				.fetch({
					withRelated: ['status', {'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
					'analyst.person', 'coordinator.person', 'visitor.person',
					'guaranteeLetter.budget.affiliated'
				]
				})
				.then(function(model) {
					res.send(model.toJSON());
				})
				.catch(function(err) {
					console.log(err);
					res.sendStatus(500);
				})
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