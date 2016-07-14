var PersonModel = require('../models/Person');


module.exports = {

	getAll: function(req, res) {

		PersonModel
		.forge()
		.fetchAll({withRelated: ['profile']})
		.then(function(collection) {
			res.send(collection);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	}

	/*create: function(req, res) {

		var admittedFields = [
			'identityCard', 'firstName', 'lastName', 'email', 'profileId'
		];

		var fields = _.pick(req.body, admittedFields);

		fields = _.mapValues(fields, _.method('toLowerCase'));

		models.Person.insert(fields, function(err, people) {
			if(err)
				res.sendStatus(500);
			else
				res.send(people[0]);
		});

	},

	getById: function(req, res) {

		var whereFields = {
			id: req.params.id
		};

		models.Person.getBy(whereFields, function(err, people) {
			if(err)
				res.sendStatus(500);
			else
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

		models.Person.update(whereFields, fields, function(err, people) {
			if(err)
				res.sendStatus(500);
			else
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

		models.Person.update(whereFields, fields, function(err, people) {
			if(err)
				res.sendStatus(500);
			else
				res.send(people[0]);
		});

	}*/

};