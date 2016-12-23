var SessionModel = require('../models/Session'),
	UserModel = require('../models/User'),
	PersonModel = require('../models/Person'),
	validator = require('./validators/Session'),
	randToken = require('rand-token');

module.exports = {
	
	create: function(req, res) {

		SessionModel
		.forge({userId: req.userId})
		.fetch({withRelated: ['user', 'user.profile', 'user.person.state']})
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
					.fetch({withRelated: ['user', 'user.profile', 'user.person.state']})
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
		.where({userId: req.userData.userId})
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
		.fetch({withRelated: ['user.profile', 'user.person']})
		.then(function(model) {
			if(model) {
				model = model.toJSON();
				model.stateId = model.user.person.stateId;
				delete model.user.password;
				delete model.user.person;
				//console.log(model);
				req.userData = model;
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

	isCoordinator: function(req, res, next) {

		UserModel
		.forge({id: req.userId})
		.fetch({withRelated: 'profile'})
		.then(function(model) {
			model = model.toJSON();
			if(model.profile.profile == 'coordinador')
				next();
			else {
				res.sendStatus(403);
				return;
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	isAnalyst: function(req, res, next) {

		UserModel
		.forge({id: req.userId})
		.fetch({withRelated: 'profile'})
		.then(function(model) {
			model = model.toJSON();
			if(model.profile.profile == 'analista')
				next();
			else {
				res.sendStatus(403);
				return;
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	isVisitor: function(req, res, next) {

		UserModel
		.forge({id: req.userId})
		.fetch({withRelated: 'profile'})
		.then(function(model) {
			model = model.toJSON();
			if(model.profile.profile == 'visitador')
				next();
			else {
				res.sendStatus(403);
				return;
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	validUser: function(req, res, next) {

		/*req.check(validator.validUser);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send({errors: errors});
			return;
		}

		var bodyFields = [
			'identityCard', 'password'
		];*/

		UserModel
		.forge({userName: req.body.userName.toUpperCase()})
		.fetch()
		.then(function(model) {
			if(model) {
				model.comparePassword(req.body.password, model)
				.then(function(match) {
					/*if(match) {
						req.userId = model.get('id');
						next();
					} else {
						res.sendStatus(404);
					}*/
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

		/*PersonModel
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
							//console.log(match);
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
		});*/

	}

};