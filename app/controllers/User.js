var models = require('../models'),
	_ = require('lodash'),
	bcrypt = require('bcrypt-nodejs');

module.exports = {

	create: function(req, res) {

		var admittedFields = [
			'personId', 'password'
		];

		var password = req.body.password;
		password = bcrypt.hashSync(password);

		var fields = _.pick(req.body, admittedFields);

		fields = _.mapValues(fields, stringToLowerCase);

		fields.password = password;

		models.User.insert(fields, function(err, user) {
			if(err) res.sendStatus(500);
			res.send(user);
		});

	},

	getById: function(req, res) {

		var whereFields = {
			id: req.params.id
		};

		models.User.getById(whereFields, function(err, user) {
			if(err) res.sendStatus(500);
			res.send(user);
		});

	},

	getAll: function(req, res) {

		models.User.getAll(function(err, users) {
			if(err) res.sendStatus(500);
			res.send(users);
		});

	},

	update: function(req, res) {

		var admittedFields = [
			'password', 'available'
		];

		var password = req.body.password;
		password = bcrypt.hashSync(password);

		var fields = _.pick(req.body, admittedFields);

		fields = _.mapValues(fields, stringToLowerCase);

		fields.password = password;

		var whereFields = {
			id: req.params.id
		};

		models.User.update(fields, whereFields, function(err, user) {
			if(err) res.sendStatus(500);
			res.send(user);
		});

	},

	partialUpdate: function(req, res) {

		var admittedFields = [
			'password', 'available'
		];
		
		if(req.body.password) {

			var password = req.body.password;
			password = bcrypt.hashSync(password);

			var fields = _.pick(req.body, admittedFields);

			fields = _.mapValues(fields, stringToLowerCase);

			fields.password = password;

		} else {

			var fields = _.pick(req.body, admittedFields);

			fields = _.mapValues(fields, stringToLowerCase);

		}
		
		var whereFields = {
			id: req.params.id
		};

		models.User.partialUpdate(fields, whereFields, function(err, user) {
			if(err) res.sendStatus(500);
			res.send(user);
		});

	}

};

var stringToLowerCase = function(key) {
	if(_.isString(key)) 
		return key.toLowerCase();
	return key;
};