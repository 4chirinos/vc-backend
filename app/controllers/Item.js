var models = require('../models'),
	_ = require('lodash'),
	validator = require('./validators/Item');

module.exports = {

	partialUpdate: function(req, res) {

		req.check(validator.partialUpdate);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var admittedFields = [
				'description', 'quantity', 'cost'
			];

			var fields = _.pick(req.body, admittedFields);

			fields = _.mapValues(fields, stringToLowerCase);

			var whereFields = {
				id: req.params.id
			};

			models.Item.update(whereFields, fields, function(err, items) {

				if(err)
					res.sendStatus(500);
				else
					res.send(items[0]);

			});

		}

	}

};

var stringToLowerCase = function(key) {
	if(_.isString(key)) 
		return key.toLowerCase();
	return key;
};