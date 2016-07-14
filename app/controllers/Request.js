var validator = require('./validators/Request'),
	RequestModel = require('../models/Request'),
	UserModel = require('../models/User'),
	_ = require('lodash');


module.exports = {

	getAll: function(req, res) {

		RequestModel
		.forge()
		.fetchAll({
			withRelated: ['analyst.person', 'coordinator.person', 'visitor.person']
		})
		.then(function(collection) {

			collection = collection.toJSON();

			for(var i = 0; i < collection.length; i++) {
				delete collection[0].analyst.password;
				delete collection[0].visitor.password;
				delete collection[0].coordinator.password;
			}

			res.send(collection);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getAllByMe: function(req, res) {

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
			.fetchAll({withRelated: ['analyst.person', 'coordinator.person', 'visitor.person']})
			.then(function(collection) {
				res.send(collection.toJSON());
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

	/*getMyRequest: function(req, res) {

		var result = [];

		models.User.getBy({id: req.userId}, function(err, users) {

			if(err) {
				res.sendStatus(500);
				return;
			}

			models.Profile.getBy({id: users[0].profileId}, function(err, profiles) {

				if(err) {
					res.sendStatus(500);
					return;
				}

				models.Request.getBy({[field[profiles[0].profile]]: users[0].id}, function(err, requests) {

					if(err) {
						res.sendStatus(500);
						return;
					}

					async.forEach(requests, function(request, callback) {

						models.Status.getBy({id: request.statusId}, function(err, status) {

							if(err) callback(err);

							request.status = status[0].status;

							result.push(request);
							callback();

						});

					}, function(err) {

						if(err) {
							res.sendStatus(500);
							return;
						}

						res.send(result);

					});

				});

			});

		});

	},

	create: function(req, res) {

		req.check(validator.create);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		var admittedFields = [
			'guaranteeLetterId', 'analystId'
		];

		var fields = _.pick(req.body, admittedFields);

		fields = _.mapValues(fields, stringToLowerCase);


		models.Status.getTypeBy({type: 'carta aval'}, function(err, types) {

			if(err) {
				res.sendStatus(500);
				return;
			}

			models.Status.getBy({typeId: types[0].id, status: 'activada'}, function(err, status) {

				if(err) {
					res.sendStatus(500);
					return;
				}

				fields.statusId = status[0].id;

				models.Request.insert(fields, function(err, requests) {
					if(err)
						res.sendStatus(500);
					else
						res.send(requests[0]);
				});

			});

		});

	}*/

};

var stringToLowerCase = function(key) {
	if(_.isString(key)) 
		return key.toLowerCase();
	return key;
};

var field = {
	analista: 'analystId',
	coordinador: 'coordinatorId',
	visitador: 'visitorId'
};

/*
models.Profile.getBy({id: users[0].profileId}, function(err, profiles) {

				if(err) {
					res.sendStatus(500);
					return;
				}

				var whereFields = {
					[field[profiles[0].profile]]: users[0].id
				};

				models.Request.getBy(whereFields, function(err, requests) {

					res.send(requests);

				})

			});

*/