var models = require('../models'),
	validator = require('./validators/Request'),
	async = require('async'),
	_ = require('lodash');


module.exports = {

	getAll: function(req, res) {

		models.Request.getAll(function(err, requests) {
			if(err)
				res.sendStatus(500);
			else
				res.send(requests);
		});

	},

	getMyRequest: function(req, res) {

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

	}

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