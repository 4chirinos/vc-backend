var validator = require('./validators/Request'),
	RequestModel = require('../models/Request'),
	UserModel = require('../models/User'),
	FormModel = require('../models/Form'),
	_ = require('lodash');


module.exports = {

	getById: function(req, res) {

		var errors = req.check(validator.getById);

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		RequestModel
		.forge({id: req.params.id})
		.fetch({
			withRelated: ['status', 
				{'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}}, 
				'analyst.person', 'coordinator.person', 
				'visitor.person',
				'guaranteeLetter.budget.affiliated', 'guaranteeLetter.budget.item', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
			]
		})
		.then(function(model) {
			
			if(!model) {
				res.sendStatus(404);
				return;
			}

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

	},

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
				'guaranteeLetter.budget.affiliated', 'guaranteeLetter.budget.item', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
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
				if(req.query.statusId) {
					if(model.profile.profile == 'analista') {
						qb.where({analystId: model.id, statusId: req.query.statusId});
					} else if(model.profile.profile == 'coordinador') {
						if(req.query.statusId != 2)
							qb.where({coordinatorId: model.id, statusId: req.query.statusId});
						else
							qb.where({statusId: req.query.statusId});
					} else {
						qb.where({visitorId: model.id, statusId: req.query.statusId});
					}
				} else {
					if(model.profile.profile == 'analista') {
						qb.where({analystId: model.id});
					} else if(model.profile.profile == 'coordinador') {
						qb.where({coordinatorId: model.id}).orWhere({coordinatorId: null});
					} else {
						qb.where({visitorId: model.id});
					}
				}
			})
			.fetchPage({
				page: page,
				pageSize: pageSize,
				withRelated: ['status', 
					{'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
					'analyst.person', 'coordinator.person', 'visitor.person',
					'guaranteeLetter.budget.affiliated', 'guaranteeLetter.budget.item', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
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

			if(model && (model.get('statusId') == 2 || model.get('statusId') == 3 || model.get('statusId') == 4 || model.get('statusId') == 5)) {
				model = model.toJSON();
				model.created = true;
				res.send(model);
			} else { // begin else

				FormModel
				.forge()
				.save()
				.then(function(model) {

					RequestModel
					.forge({guaranteeLetterId: req.body.guaranteeLetterId, analystId: req.userData.userId, statusId: 2, formId: model.get('id')})
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
						})
					})
					.catch(function(err) {
						console.log(err);
						res.sendStatus(500);
					});
				})
				.catch(function(err) {
					console.log(500);
					res.sendStatus(500);
				});

			} // end else

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