var SessionModel = require('../models/Session'),
	UserModel = require('../models/User'),
	PersonModel = require('../models/Person'),
	validator = require('./validators/Session'),
	randToken = require('rand-token');

module.exports = {
	
	create: function(req, res) {

		SessionModel
		.forge()
		.fetch({withRelated: ['user', 'user.profile', 'user.person']})
		.then(function(model) {
			if(model) {
				model = model.toJSON();
				delete model.user.password;
				res.send(model);
			} else {
				SessionModel
				.forge({
					userId: req.userId, token: req.userId.toString() + randToken.generate(64)
				})
				.save()
				.then(function(model) {
					SessionModel
					.forge({id: model.get('id')})
					.fetch({withRelated: ['user', 'user.profile', 'user.person']})
					.then(function(model) {
						model = model.toJSON();
						delete model.user.password;
						res.send(model);
					})
					.catch(function(err) {
						console.log(err);
						res.sendStatus(500);
					});
				})
				.catch(function(err) {
					console.log(err);
					res.sendStatus(500);
				});
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	delete: function(req, res) {

		SessionModel
		.where({userId: req.userId})
		.destroy()
		.then(function() {
			res.sendStatus(200);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	validSession: function(req, res, next) {

		req.checkHeaders('token', 'Header requerido').notEmpty();

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		SessionModel
		.forge({token: req.headers.token})
		.fetch()
		.then(function(model) {
			if(model) {
				req.userId = model.get('userId');
				next();
			} else {
				res.sendStatus(403);
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	validUser: function(req, res, next) {

		req.check(validator.validUser);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send({errors: errors});
			return;
		}

		var bodyFields = [
			'identityCard', 'password'
		];

		PersonModel
		.forge({identityCard: req.body.identityCard})
		.fetch({withRelated: ['user']})
		.then(function(model) {
			if(model) {
				UserModel
				.forge({personId: model.get('id')})
				.fetch()
				.then(function(model) {
					if(model) {
						model.comparePassword(req.body.password, model)
						.then(function(match) {
							req.userId = model.get('id');
							next();
						})
						.catch(function(err) {
							console.log(err);
							res.sendStatus(500);
						});
					} else {
						res.sendStatus(404);
					}
				})
				.catch(function(err) {
					console.log(err);
					res.sendStatus(500);
				});
			} else {
				res.sendStatus(404);
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	}

};