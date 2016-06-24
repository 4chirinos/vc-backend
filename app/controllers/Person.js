var models = require('../models'),
	_ = require('lodash');


module.exports = {

	getAll: function(req, res) {

		models.Person.getAll(function(err, people) {
			if(err)
				res.sendStatus(500);
			else
				res.send(people);
		});

	},

	create: function(req, res) {

		var admittedFields = [
			'identityCard', 'firstName', 'lastName', 'email', 'profileId'
		];

		var fields = _.pick(req.body, admittedFields);

		fields = _.mapValues(fields, _.method('toLowerCase'));

		models.Person.insert(fields, function(err, people) {
			if(err) res.sendStatus(500);
			res.send(people[0]);
		});

	},

	getById: function(req, res) {

		var whereFields = {
			id: req.params.id
		};

		models.Person.getBy(whereFields, function(err, people) {
			if(err) res.sendStatus(500);
			res.send(people[0]);
		});

	},

	update: function(req, res) {

		var admittedFields = [
			'identityCard', 'firstName', 'lastName', 'email', 'profileId'
		];

		var fields = _.pick(req.body, admittedFields);

		fields = _.mapValues(fields, _.method('toLowerCase'));

		var whereFields = {
			id: req.params.id
		};

		models.Person.update(fields, whereFields, function(err, people) {
			if(err) res.sendStatus(500);
			res.send(people[0]);
		});

	},

	partialUpdate: function(req, res) {

		var admittedFields = [
			'identityCard', 'firstName', 'lastName', 'email', 'profileId'
		];
		
		var fields = _.pick(req.body, admittedFields);

		fields = _.mapValues(fields, _.method('toLowerCase'));
		
		var whereFields = {
			id: req.params.id
		};

		models.Person.update(fields, whereFields, function(err, people) {
			if(err) res.sendStatus(500);
			res.send(people[0]);
		});

	}

};