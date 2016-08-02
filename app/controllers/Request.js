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
				'guaranteeLetter.budget.affiliated', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
			]
		})
		.then(function(collection) {
			res.send(collection.toJSON());
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
		.forge({id: req.userData.userId})
		.fetch({withRelated: ['profile']})
		.then(function(model) {

			model = model.toJSON();

			RequestModel
			.query(function(qb) {
				if(model.profile.profile == 'analista') {
					qb.where({analystId: model.id});
				} else if(model.profile.profile == 'coordinador') {
					qb.where({coordinatorId: model.id}).orWhere({coordinatorId: null});
				} else {
					qb.where({visitorId: model.id});
				}
				if(req.query.statusId) {
					qb.where({statusId: req.query.statusId});
				}
			})
			.fetchPage({
				page: page,
				pageSize: pageSize,
				withRelated: ['status', 
					{'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
					'analyst.person', 'coordinator.person', 'visitor.person',
					'guaranteeLetter.budget.affiliated', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
				]
			})
			.then(function(collection) {
				var response = {};
				response.pageCount = collection.pagination.pageCount;
				response.requests = collection;

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
		.forge({guaranteeLetterId: req.body.guaranteeLetterId})
		.fetch({withRelated: ['status', 
			{'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
				'analyst.person', 'coordinator.person', 'visitor.person',
				'guaranteeLetter.budget.affiliated', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
			]
		})
		.then(function(model) {

			if(model) {
				model = model.toJSON();
				model.created = true;
				res.send(model);
			} else {

				RequestModel
				.forge({guaranteeLetterId: req.body.guaranteeLetterId, analystId: req.userData.userId, statusId: 2})
				.save()
				.then(function(model) {
					RequestModel
					.forge({id: model.get('id')})
					.fetch({withRelated: ['status', 
							{'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
							'analyst.person', 'coordinator.person', 'visitor.person',
							'guaranteeLetter.budget.affiliated', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
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

			}

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
		
		if(req.userData.user.profile.profile == 'coordinador') {
			fields.coordinatorId = req.userData.userId;
		}

		RequestModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {
			
			if(!model) {
				res.sendStatus(404);
				return;
			}

			if(req.userData.user.profile.profile == 'coordinador' && model.get('statusId') == 3 && fields.statusId && fields.statusId == 3) {
						
				RequestModel
				.forge({id: req.params.id})
				.fetch({
					withRelated: ['status', {'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
					'analyst.person', 'coordinator.person', 'visitor.person',
					'guaranteeLetter.budget.affiliated', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
				]
				})
				.then(function(model) {
					model = model.toJSON();
					model.created = true;
					res.send(model);
				})
				.catch(function(err) {
					res.sendStatus(500);
				});

			} else {

				model.save(fields)
				.then(function(model) {
					RequestModel
					.forge({id: req.params.id})
					.fetch({
						withRelated: ['status', {'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
						'analyst.person', 'coordinator.person', 'visitor.person',
						'guaranteeLetter.budget.affiliated', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
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

			}

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	}

};