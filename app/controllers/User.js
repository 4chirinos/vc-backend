var _ = require('lodash'),
	UserModel = require('../models/User'),
	validator = require('./validators/User'),
	RequestModel = require('../models/Request'),
	PersonModel = require('../models/Person'),
	transporter = require('../../config/mailer/sender'),
	_ = require('lodash');

var notifyAccountCreation = function(model) {

	//console.log(model);

	var date = new Date(model.startDate);

	date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

	var html = '<b><h2>Estimado(a) ' + model.firstName + ' ' + model.lastName + ',</h2>' +
		'<h2>se ha creado una cuenta para usted en el Sistema Gestor de Visitas Clínicas. ' + 'A continuación la información de la misma:</b></h2><br>' +
		'<h3>Nombre de Usuario: ' + model.user.userName + '<br>' +
		'Contraseña: ' + model.user.password + '<br><br><br>' +
		'Para acceder a la cuenta ingrese al <a href="http://localhost:9000">Gestor de Visitas Clínicas</a></h3>';


	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: '"Gestor de Visitas Clínicas" <foo@blurdybloop.com>', // sender address 
		to: 'correouniversal2mil15@gmail.com', // list of receivers 
		subject: 'Creación de cuenta en el Sistema Gestor de Visitas Clínicas', // Subject line 
		text: 'Hello world 🐴', // plaintext body 
		html: html // html body 
	};

	// send mail with defined transport object 
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
		    console.log(error);
		}
		//console.log('Message sent: ' + info.response);
	});

};

module.exports = {

	create: function(req, res) {

		/*req.check(validator.create);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		var bodyFields = [
			'personId', 'password', 'profileId'
		];

		var fields = _.pick(req.body, bodyFields);*/

		PersonModel
		.forge({id: req.body.personId})
		.fetch()
		.then(function(model) {
			
			if(!model) {
				res.sendStatus(404);
				return;
			}

			var fields = {}, password, userName;

			password = Math.random() + "";
			password = password.replace(/\./, '');

			userName = Math.random() + "";
			userName = userName.replace(/\./, '');

			fields.userName = userName;
			fields.password = password;
			fields.personId = req.body.personId;
			fields.profileId = req.body.profileId;

			UserModel
			.forge(fields)
			.save()
			.then(function(model) {
				
				PersonModel
				.forge({id: req.body.personId})
				.fetch({withRelated: [
				'profile', 'state',
						{'user': function(qb) {
					    		qb.column('id', 'personId', 'profileId', 'available', 'userName');
					  		}
					  	},
					  	'user.profile'
				  	]
				})
				.then(function(model) {
					model = model.toJSON();
					res.send(model);

					model.user.password = password;
					notifyAccountCreation(model);
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

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		UserModel
		.forge({id: req.params.id})
		.fetch({withRelated: ['person']})
		.then(function(model) {
			if(model) {
				res.send(model.toJSON());
			} else {
				res.sendStatus(404);
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getAll: function(req, res) {

		var profile = [];

		if(!Array.isArray(req.query.profile)) {
			profile.push(req.query.profile);
		} else {
			profile = req.query.profile;
		}

		var profiles = ['7', '8', '9'];

		if(req.query.profile) {
			profiles = _.intersection(['7', '8', '9'], profile);
		}

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		UserModel
		.forge()
		.query(function(qb) {
			qb.whereIn('profileId', profiles);
		})
		.fetchPage({
			page: page,
			pageSize: pageSize,
			columns: ['id', 'personId', 'profileId', 'available'],
			withRelated: ['person', 'profile', {'visitor': function(qb) { // esto es lo que me cuenta cuantas visitas asignadas tiene ese usuario (visitador)
					qb.where({statusId: 3});
				}}
			]
		})
		.then(function(collection) {
			//console.log(collection.toJSON());
			var response = {};
			response.pageCount = collection.pagination.pageCount;
			//response.users = collection.toJSON();
			var aux = collection.toJSON();
			response.users = [];

			for(var i = 0; i < aux.length; i++) {
				if(aux[i].person.stateId == req.userData.stateId) {
					var user = aux[i];
					user.assignments = user.visitor.length; // cantidad de visitas que tiene asignadas el usuario (visitador)
					response.users.push(user);
					//response.users[i].assignments = response.users[i].visitor.length;
				}
			}

			var fields = {};

			fields.stateId = req.userData.stateId;
			fields.id = req.userData.userId;

			if(req.userData.user.profile.profile == 'analista') {
				fields.role = 'analyst';
			} else if(req.userData.user.profile.profile == 'coordinador') {
				fields.role = 'coordinator';
			} else {
				fields.role = 'visitor';
			}

			RequestModel.count(fields, function(err, count) {
				if(err) {
					res.sendStatus(500);
					return;
				}
				response.statusGroups = count;
				res.send(response);
			});

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
		
	},

	update: function(req, res) {

		req.check(validator.update);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		var bodyFields = [
			'password', 'available', 'profileId'
		];

		var fields = _.pick(req.body, bodyFields);

		UserModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {
			if(!model) {
				res.sendStatus(404);
				return;
			}
			model.save(fields)
			.then(function(model) {
				res.send(model.toJSON());
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

	},

	partialUpdate: function(req, res) {

		/*req.check(validator.partialUpdate);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}*/

		var bodyFields = [
			'password', 'available', 'profileId', 'userName'
		];

		var fields = _.pick(req.body, bodyFields);

		if(fields.userName) fields.userName = fields.userName.toUpperCase();

		UserModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {
			
			if(!model) {
				res.sendStatus(404);
				return;
			}

			if(req.body.newPassword) {
				model.comparePassword(req.body.oldPassword, model)
				.then(function(match) {

					if(match || !match) {
						model.set('password', req.body.newPassword);

						model.save(fields)
						.then(function(model) {
							model = model.toJSON();
							PersonModel
							.forge({id: model.personId})
							.fetch({withRelated: [
									'profile', 'state',
									{'user': function(qb) {
								    		qb.column('id', 'personId', 'profileId', 'available', 'userName');
								  		}
								  	},
								  	'user.profile'
							  	]
							})
							.then(function(model) {
								res.send(model.toJSON());
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

					} else {
						res.sendStatus(403);
						return;
					}

				})
				.catch(function(err) {
					console.log(err);
					res.sendStatus(500);
					return;
				});

			} else {

				model.save(fields)
				.then(function(model) {
					model = model.toJSON();
					PersonModel
					.forge({id: model.personId})
					.fetch({withRelated: [
							'profile', 'state',
							{'user': function(qb) {
						    		qb.column('id', 'personId', 'profileId', 'available', 'userName');
						  		}
						  	},
						  	'user.profile'
					  	]
					})
					.then(function(model) {
						res.send(model.toJSON());
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

			/*model.save(fields)
			.then(function(model) {
				model = model.toJSON();
				PersonModel
				.forge({id: model.personId})
				.fetch({withRelated: [
						'profile', 'state',
						{'user': function(qb) {
					    		qb.column('id', 'personId', 'profileId', 'available', 'userName');
					  		}
					  	},
					  	'user.profile'
				  	]
				})
				.then(function(model) {
					res.send(model.toJSON());
				})
				.catch(function(err) {
					console.log(err);
					res.sendStatus(500);
				});
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});*/
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	verifyUsername: function(req, res) {

		UserModel
		.forge()
		.query(function(qb) {
			if(req.query.userName) {
				qb.where('userName', req.query.userName.toUpperCase());
			}
		})
		.fetch()
		.then(function(model) {
			if(!model) {
				res.send('0');
			} else {
				res.send('1');
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
	
	}

};