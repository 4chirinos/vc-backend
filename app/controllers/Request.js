var models = require('../models'),
	validator = require('./validators/Request'),
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