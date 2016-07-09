var models = require('../models'),
	_ = require('lodash'),
	validator = require('./validators/Session'),
	randToken = require('rand-token');

module.exports = {
	
	create: function(req, res) {

		models.Session.getBy({'userId': req.userId}, function(err, sessions) {

			if(err) {
				res.sendStatus(500);
				return;
			}

			if(sessions[0]) {

				res.send(sessions[0]);

			} else {

				var token = req.userId.toString() + randToken.generate(64),
					fields = {
						userId: req.userId,
						token: token
					};

				models.Session.insert(fields, function(err, sessions) {

					if(err) {
						res.sendStatus(500);
						return;
					}

					res.send(sessions[0]);

				});

			}

		});

	},

	delete: function(req, res) {

		models.Session.deleteBy({userId: req.userId}, function(err, sessions) {

			if(err) {
				res.sendStatus(500);
				return;
			}

			res.sendStatus(200);

		});

	},

	validSession: function(req, res, next) {

		req.checkHeaders('token', 'Header requerido').notEmpty();
		req.checkHeaders('token', 'Sólo alfanuméricos').isAlphanumeric();

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		models.Session.getBy({token: req.headers.token}, function(err, sessions) {

			if(err) {
				res.sendStatus(500);
				return;
			}

			if(!sessions[0]) {
				res.sendStatus(403);
			} else {
				req.userId = sessions[0].userId;
				next();
			}

		});

	},

	isAnalyst: function(req, res, next) {

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

				if(profiles[0].profile == 'analista') {
					req.userProfile = profiles[0].profile
					next();
				}
				else
					res.sendStatus(403);

			});

		});

	},

	isVisitor: function(req, res, next) {

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

				if(profiles[0].profile == 'visitador') {
					req.userProfile = profiles[0].profile
					next();
				}
				else
					res.sendStatus(403);

			});

		});

	},

	isCoordinator: function(req, res, next) {

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

				if(profiles[0].profile == 'coordinador') {
					req.userProfile = profiles[0].profile
					next();
				}
				else
					res.sendStatus(403);

			});

		});

	},

	validUser: function(req, res, next) {

		req.check(validator.validUser);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send({errors: errors});
			return;
		}

		var admittedFields = [
			'identityCard', 'password'
		];

		var fields = _.pick(req.body, admittedFields);

		models.Person.getBy({'identityCard': fields.identityCard}, function(err, people) {

			if(err) {
				res.sendStatus(500);
				return;
			}

			if(!people[0]) {
				res.sendStatus(404);
				return;
			}

			models.User.getBy2({'personId': people[0].id}, function(err, users) {

				if(!users[0]) {
					res.sendStatus(404);
					return;
				}

				models.User.comparePassword(fields.password, users[0].password, function(err, match) {

					if(err) {
						res.sendStatus(500);
						return;
					}

					if(match) {
						req.userId = users[0].id;
						next();
					} else {
						res.sendStatus(404);
					}

				});
				
			});

		});

	}

};