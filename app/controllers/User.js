var models = require('../models'),
	_ = require('lodash'),
	bcrypt = require('bcrypt-nodejs'),
	validator = require('./validators/User');

module.exports = {

	create: function(req, res) {

		req.check(validator.create);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var admittedFields = [
				'personId', 'password', 'profileId'
			];

			var password = req.body.password;
			password = bcrypt.hashSync(password); // hacer asíncrono

			var fields = _.pick(req.body, admittedFields);

			fields = _.mapValues(fields, stringToLowerCase);

			fields.password = password;

			models.User.insert(fields, function(err, users) {
				if(err)
					res.sendStatus(500);
				else
					res.send(users[0]);
			});

		}

	},

	getMe: function(req, res) {

		models.User.getBy({id: req.userId}, function(err, users) {

			if(err) {
				res.sendStatus(500);
				return;
			}

			models.Person.getBy({id: users[0].personId}, function(err, people) {

				if(err) {
					res.sendStatus(500);
					return;
				}

				models.Profile.getBy({id: users[0].profileId}, function(err, profiles) {

					if(err) {
						res.sendStatus(500);
						return;
					}

					var data = {
						firstName: people[0].firstName,
						lastName: people[0].lastName,
						identityCard: people[0].identityCard,
						email: people[0].email,
						userProfile: profiles[0].profile
					};

					res.send(data);

				});

			});

		});

	},

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var whereFields = {
				id: req.params.id
			};

			models.User.getBy(whereFields, function(err, users) {
				if(err)
					res.sendStatus(500);
				else
					res.send(users[0]);
			});

		}

	},

	getAll: function(req, res) {

		models.User.getAll(function(err, users) {
			if(err)
				res.sendStatus(500);
			else
				res.send(users);
		});

	},

	update: function(req, res) {

		req.check(validator.update);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var admittedFields = [
				'password', 'available', 'profileId'
			];

			var password = req.body.password;
			password = bcrypt.hashSync(password);

			var fields = _.pick(req.body, admittedFields);

			fields = _.mapValues(fields, stringToLowerCase);

			fields.password = password;

			var whereFields = {
				id: req.params.id
			};

			models.User.update(whereFields, fields, function(err, users) {
				if(err)
					res.sendStatus(500);
				else
					res.send(users[0]);
			});

		}

	},

	partialUpdate: function(req, res) {

		req.check(validator.partialUpdate);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var admittedFields = [
				'password', 'available', 'profileId'
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

			models.User.update(whereFields, fields, function(err, users) {
				if(err)
					res.sendStatus(500);
				else
					res.send(users[0]);
			});

		}

	},

	comparePassword: function(candidatePassword, password, next) {

		bcrypt.compare(candidatePassword, password, function(err, match) {
			if(err) next(err);
			else next(null, match);
		});

	}


};

var stringToLowerCase = function(key) {
	if(_.isString(key)) 
		return key.toLowerCase();
	return key;
};