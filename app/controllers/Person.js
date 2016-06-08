var models = require('../models'),
	_ = require('lodash');


module.exports = {

	create: function(req, res) {

		var admittedFields = [
			'identityCard', 'firstName', 'lastName', 'email'
		];

		var fields = _.pick(req.body, admittedFields);

		models.Person.insert(fields, function(err, person) {
			if(err) res.status(500).send('Internal error');
			res.send(person);
		});

	},

	getAll: function(req, res) {

		models.Person.getAll(function(err, people) {
			if(err) res.status(500).send('Internal error');
			res.send(people);
		});

	},

	update: function(req, res) {

		var admittedFields = [
			'identityCard', 'firstName', 'lastName', 'email'
		];

		var fields = _.pick(req.body, admittedFields);

		var whereFields = {
			id: req.params.id
		};

		models.Person.update(fields, whereFields, function(err, person) {
			if(err) res.status(500).send('Internal error');
			res.send(person);
		});

	},

	partialUpdate: function(req, res) {

		var admittedFields = [
			'identityCard', 'firstName', 'lastName', 'email'
		];
		
		var fields = _.pick(req.body, admittedFields);
		
		var whereFields = {
			id: req.params.id
		};

		models.Person.partialUpdate(fields, whereFields, function(err, person) {
			if(err) res.status(500).send('Internal error');
			res.send(person);
		});

	}

};