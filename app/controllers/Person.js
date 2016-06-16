var models = require('../models'),
	_ = require('lodash');


module.exports = {

	create: function(req, res) {

		var admittedFields = [
			'identityCard', 'firstName', 'lastName', 'email'
		];

		var fields = _.pick(req.body, admittedFields);

		fields = _.mapValues(fields, _.method('toLowerCase'));

		models.Person.insert(fields, function(err, person) {
			if(err) res.sendStatus(500);
			res.send(person);
		});

	},

	getById: function(req, res) {

		var whereFields = {
			id: req.params.id
		};

		models.Person.getByFields(whereFields, function(err, person) {
			if(err) res.sendStatus(500);
			res.send(person);
		});

	},

	getAll: function(req, res) {

		models.Person.getAll(function(err, people) {
			if(err) res.sendStatus(500);
			res.send(people);
		});

	},

	update: function(req, res) {

		var admittedFields = [
			'identityCard', 'firstName', 'lastName', 'email'
		];

		var fields = _.pick(req.body, admittedFields);

		fields = _.mapValues(fields, _.method('toLowerCase'));

		var whereFields = {
			id: req.params.id
		};

		models.Person.update(fields, whereFields, function(err, person) {
			if(err) res.sendStatus(500);
			res.send(person);
		});

	},

	partialUpdate: function(req, res) {

		var admittedFields = [
			'identityCard', 'firstName', 'lastName', 'email'
		];
		
		var fields = _.pick(req.body, admittedFields);

		fields = _.mapValues(fields, _.method('toLowerCase'));
		
		var whereFields = {
			id: req.params.id
		};

		models.Person.partialUpdate(fields, whereFields, function(err, person) {
			if(err) res.sendStatus(500);
			res.send(person);
		});

	}

};