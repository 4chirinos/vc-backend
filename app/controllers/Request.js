var validator = require('./validators/Request'),
	RequestModel = require('../models/Request'),
	UserModel = require('../models/User'),
	FormModel = require('../models/Form'),
	AnswerModel = require('../models/Answer'),
	BudgetImageModel = require('../models/budgetImage'),
	CommentModel = require('../models/Comment'),
	FormImageModel = require('../models/formImage'),
	RequestFormModel = require('../models/requestForm'),
	transporter = require('../../config/mailer/sender'),
	_ = require('lodash');

var bookshelf = require('../../config/db/builder-knex');

var fs = require('fs');

var multer  = require('multer');

var getExtension = function(filename) {
	var a = filename.split(".");
	if(a.length === 1 || (a[0] === "" && a.length === 2) ) {
	    return "";
	}
	return a.pop();  
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
  	var date = new Date();

  	var hora = date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
  	var fecha = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

  	req.budget_index++;
  	var name =  'Fecha ' + fecha + /*'_Hora ' + hora +*/ '_Presupuesto ' + req.budget_index;
  	name += '.' + getExtension(file.originalname);

  	BudgetImageModel
  	.forge({requestId: req.params.id, path: name})
  	.save()
  	.then(function(model) {
  		
  		if(!req.paths) {
  			req.paths = [model.toJSON()];
	  	} else {
	  		req.paths.push(model.toJSON());
	  	}

	  	cb(null, name);

  	})
  	.catch(function(err) {
  		console.log(err);
  		res.sendStatus(500);
  	});

  }
});

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
  	var date = new Date();

  	var hora = date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
  	var fecha = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

  	req.form_index++;
  	var name =  'Fecha ' + fecha + /*'_Hora ' + hora +*/ '_Encuesta ' + req.form_index;
  	name += '.' + getExtension(file.originalname);

  	FormImageModel
  	.forge({requestId: req.params.id, path: name})
  	.save()
  	.then(function(model) {
  		
  		if(!req.paths) {
  			req.paths = [model.toJSON()];
	  	} else {
	  		req.paths.push(model.toJSON());
	  	}

	  	cb(null, name);

  	})
  	.catch(function(err) {
  		console.log(err);
  		res.sendStatus(500);
  	});

  }
});

var notifyRequestCreated = function(model) {

	//console.log(model);

	var date = new Date(model.startDate);

	date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

	var html = '<b><h2>Estimado(a) ' + model.analyst.person.firstName + ' ' + model.analyst.person.lastName + ',</h2>' +
		'<h2>se ha solicitado una visita clínica en su nombre. ' + 'A continuación la información de la misma:</b></h2><br>' +
		'<h3>Código de solicitud: ' + model.id + '<br>' +
		'Fecha de solicitud: ' + date + '<br>' +
		'Código de carta aval asociado a la visita solicitada: ' + model.guaranteeLetter.id + '<br>' +
		'Código de póliza asociado a la carta aval: ' + model.guaranteeLetter.policyId + '<br>' +
		'Nombre del beneficiario: ' + model.guaranteeLetter.beneficiary.firstName + ' ' + model.guaranteeLetter.beneficiary.lastName + '<br>' +
		'Cédula del beneficiario: ' + model.guaranteeLetter.beneficiary.identityCard + '<br><br><br>' +
		'Para más información acceder al  <a href="http://localhost:9000">Gestor de Visitas Clínicas</a></h3>';


	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: '"Gestor de Visitas Clínicas" <foo@blurdybloop.com>', // sender address 
		to: 'correouniversal2mil15@gmail.com', // list of receivers 
		subject: 'Ha generado una nueva solicitud de visita clínica', // Subject line 
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

var notifyRequestCoordinated = function(model) {
	//console.log(model);

	var date = new Date(model.startDate);

	date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

	var html = '<b><h2>Estimado(a) ' + model.coordinator.person.firstName + ' ' + model.coordinator.person.lastName + ',</h2>' +
		'<h2>se ha asignado una visita clínica en su nombre. ' + 'A continuación la información de la misma:</b></h2><br>' +
		'<h3>Código de solicitud: ' + model.id + '<br>' +
		'Fecha de solicitud: ' + date + '<br>' +
		'Código de carta aval asociado a la visita solicitada: ' + model.guaranteeLetter.id + '<br>' +
		'Código de póliza asociado a la carta aval: ' + model.guaranteeLetter.policyId + '<br>' +
		'Nombre del beneficiario: ' + model.guaranteeLetter.beneficiary.firstName + ' ' + model.guaranteeLetter.beneficiary.lastName + '<br>' +
		'Cédula del beneficiario: ' + model.guaranteeLetter.beneficiary.identityCard + '<br><br><br>' +
		'Para más información acceder al  <a href="http://localhost:9000">Gestor de Visitas Clínicas</a></h3>';


	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: '"Gestor de Visitas Clínicas" <foo@blurdybloop.com>', // sender address 
		to: 'correouniversal2mil15@gmail.com', // list of receivers 
		subject: 'Ha asignado una solicitud de visita clínica', // Subject line 
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

var notifyRequestAssigned = function(model) {

	var date = new Date(model.startDate);

	date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

	var html = '<b><h2>Estimado(a) ' + model.visitor.person.firstName + ' ' + model.visitor.person.lastName + ',</h2>' +
		'<h2>se le ha asignado una visita clínica. ' + 'A continuación la información de la misma:</b></h2><br>' +
		'<h3>Código de solicitud: ' + model.id + '<br>' +
		'Fecha de solicitud: ' + date + '<br>' +
		'Código de carta aval asociado a la visita solicitada: ' + model.guaranteeLetter.id + '<br>' +
		'Código de póliza asociado a la carta aval: ' + model.guaranteeLetter.policyId + '<br>' +
		'Nombre del beneficiario: ' + model.guaranteeLetter.beneficiary.firstName + ' ' + model.guaranteeLetter.beneficiary.lastName + '<br>' +
		'Cédula del beneficiario: ' + model.guaranteeLetter.beneficiary.identityCard + '<br><br><br>' +
		'Para más información acceder al  <a href="http://localhost:9000">Gestor de Visitas Clínicas</a></h3>';


	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: '"Gestor de Visitas Clínicas" <foo@blurdybloop.com>', // sender address 
		to: 'correouniversal2mil15@gmail.com', // list of receivers 
		subject: 'Se le ha asignado una solicitud de visita clínica', // Subject line 
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

var notifyRequestRejected = function(model) {

	var date = new Date(model.startDate);

	date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

	var html = '<b><h2>Estimado(a) ' + model.coordinator.person.firstName + ' ' + model.coordinator.person.lastName + ',</h2>' +
		'<h2>ha solicitado la revisión de una visita clínica. ' + 'A continuación la información de la misma:</b></h2><br>' +
		'<h3>Código de solicitud: ' + model.id + '<br>' +
		'Fecha de solicitud: ' + date + '<br>' +
		'Código de carta aval asociado a la visita solicitada: ' + model.guaranteeLetter.id + '<br>' +
		'Código de póliza asociado a la carta aval: ' + model.guaranteeLetter.policyId + '<br>' +
		'Nombre del beneficiario: ' + model.guaranteeLetter.beneficiary.firstName + ' ' + model.guaranteeLetter.beneficiary.lastName + '<br>' +
		'Cédula del beneficiario: ' + model.guaranteeLetter.beneficiary.identityCard + '<br><br><br>' +
		'Para más información acceder al  <a href="http://localhost:9000">Gestor de Visitas Clínicas</a></h3>';


	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: '"Gestor de Visitas Clínicas" <foo@blurdybloop.com>', // sender address 
		to: 'correouniversal2mil15@gmail.com', // list of receivers 
		subject: 'Ha solicitado la revisión de una visita clínica', // Subject line 
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

var notifyRequestRejected2 = function(model) {

	var date = new Date(model.startDate);

	date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

	var html = '<b><h2>Estimado(a) ' + model.visitor.person.firstName + ' ' + model.visitor.person.lastName + ',</h2>' +
		'<h2>se le ha solicitado la revisión de una visita clínica. ' + 'A continuación la información de la misma:</b></h2><br>' +
		'<h3>Código de solicitud: ' + model.id + '<br>' +
		'Fecha de solicitud: ' + date + '<br>' +
		'Código de carta aval asociado a la visita solicitada: ' + model.guaranteeLetter.id + '<br>' +
		'Código de póliza asociado a la carta aval: ' + model.guaranteeLetter.policyId + '<br>' +
		'Nombre del beneficiario: ' + model.guaranteeLetter.beneficiary.firstName + ' ' + model.guaranteeLetter.beneficiary.lastName + '<br>' +
		'Cédula del beneficiario: ' + model.guaranteeLetter.beneficiary.identityCard + '<br><br><br>' +
		'Para más información acceder al  <a href="http://localhost:9000">Gestor de Visitas Clínicas</a></h3>';


	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: '"Gestor de Visitas Clínicas" <foo@blurdybloop.com>', // sender address 
		to: 'correouniversal2mil15@gmail.com', // list of receivers 
		subject: 'Se le ha solicitado la revisión de una visita clínica', // Subject line 
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

var notifyRequestCompleted = function(model) {

	var date = new Date(model.startDate);

	date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

	var html = '<b><h2>Estimado(a) ' + model.visitor.person.firstName + ' ' + model.visitor.person.lastName + ',</h2>' +
		'<h2>ha completado una solicitud de una visita clínica. ' + 'A continuación la información de la misma:</b></h2><br>' +
		'<h3>Código de solicitud: ' + model.id + '<br>' +
		'Fecha de solicitud: ' + date + '<br>' +
		'Código de carta aval asociado a la visita solicitada: ' + model.guaranteeLetter.id + '<br>' +
		'Código de póliza asociado a la carta aval: ' + model.guaranteeLetter.policyId + '<br>' +
		'Nombre del beneficiario: ' + model.guaranteeLetter.beneficiary.firstName + ' ' + model.guaranteeLetter.beneficiary.lastName + '<br>' +
		'Cédula del beneficiario: ' + model.guaranteeLetter.beneficiary.identityCard + '<br><br><br>' +
		'Para más información acceder al  <a href="http://localhost:9000">Gestor de Visitas Clínicas</a></h3>';


	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: '"Gestor de Visitas Clínicas" <foo@blurdybloop.com>', // sender address 
		to: 'correouniversal2mil15@gmail.com', // list of receivers 
		subject: 'Ha completado una solicitud de visita clínica', // Subject line 
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

var notifyRequestCompleted2 = function(model) {

	var date = new Date(model.startDate);

	date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

	var html = '<b><h2>Estimado(a) ' + model.coordinator.person.firstName + ' ' + model.coordinator.person.lastName + ',</h2>' +
		'<h2>se ha completado una solicitud de visita clínica. ' + 'A continuación la información de la misma:</b></h2><br>' +
		'<h3>Código de solicitud: ' + model.id + '<br>' +
		'Fecha de solicitud: ' + date + '<br>' +
		'Código de carta aval asociado a la visita solicitada: ' + model.guaranteeLetter.id + '<br>' +
		'Código de póliza asociado a la carta aval: ' + model.guaranteeLetter.policyId + '<br>' +
		'Nombre del beneficiario: ' + model.guaranteeLetter.beneficiary.firstName + ' ' + model.guaranteeLetter.beneficiary.lastName + '<br>' +
		'Cédula del beneficiario: ' + model.guaranteeLetter.beneficiary.identityCard + '<br><br><br>' +
		'Para más información acceder al  <a href="http://localhost:9000">Gestor de Visitas Clínicas</a></h3>';


	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: '"Gestor de Visitas Clínicas" <foo@blurdybloop.com>', // sender address 
		to: 'correouniversal2mil15@gmail.com', // list of receivers 
		subject: 'Se ha completado una solicitud de visita clínica', // Subject line 
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

var notifyRequestAuthorized = function(model) {

	var date = new Date(model.startDate);

	date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

	var html = '<b><h2>Estimado(a) ' + model.coordinator.person.firstName + ' ' + model.coordinator.person.lastName + ',</h2>' +
		'<h2>ha autorizado la completitud de una visita clínica. ' + 'A continuación la información de la misma:</b></h2><br>' +
		'<h3>Código de solicitud: ' + model.id + '<br>' +
		'Fecha de solicitud: ' + date + '<br>' +
		'Código de carta aval asociado a la visita solicitada: ' + model.guaranteeLetter.id + '<br>' +
		'Código de póliza asociado a la carta aval: ' + model.guaranteeLetter.policyId + '<br>' +
		'Nombre del beneficiario: ' + model.guaranteeLetter.beneficiary.firstName + ' ' + model.guaranteeLetter.beneficiary.lastName + '<br>' +
		'Cédula del beneficiario: ' + model.guaranteeLetter.beneficiary.identityCard + '<br><br><br>' +
		'Para más información acceder al  <a href="http://localhost:9000">Gestor de Visitas Clínicas</a></h3>';


	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: '"Gestor de Visitas Clínicas" <foo@blurdybloop.com>', // sender address 
		to: 'correouniversal2mil15@gmail.com', // list of receivers 
		subject: 'Ha autorizado la completitud de una visita clínica', // Subject line 
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

var notifyRequestAuthorized2 = function(model) {

	var date = new Date(model.startDate);

	date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

	var html = '<b><h2>Estimado(a) ' + model.analyst.person.firstName + ' ' + model.analyst.person.lastName + ',</h2>' +
		'<h2>se ha completado una visita clínica. ' + 'A continuación la información de la misma:</b></h2><br>' +
		'<h3>Código de solicitud: ' + model.id + '<br>' +
		'Fecha de solicitud: ' + date + '<br>' +
		'Código de carta aval asociado a la visita solicitada: ' + model.guaranteeLetter.id + '<br>' +
		'Código de póliza asociado a la carta aval: ' + model.guaranteeLetter.policyId + '<br>' +
		'Nombre del beneficiario: ' + model.guaranteeLetter.beneficiary.firstName + ' ' + model.guaranteeLetter.beneficiary.lastName + '<br>' +
		'Cédula del beneficiario: ' + model.guaranteeLetter.beneficiary.identityCard + '<br><br><br>' +
		'Para más información acceder al  <a href="http://localhost:9000">Gestor de Visitas Clínicas</a></h3>';


	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: '"Gestor de Visitas Clínicas" <foo@blurdybloop.com>', // sender address 
		to: 'correouniversal2mil15@gmail.com', // list of receivers 
		subject: 'Se ha completado una visita clínica', // Subject line 
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

	getById: function(req, res) {

		var errors = req.check(validator.getById);

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		RequestModel
		.forge({id: req.params.id})
		.fetch({
			withRelated: ['status', 
				{'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}}, 
				'analyst.person', 'coordinator.person', 'guaranteeLetter.budget.affiliated.phones',
				'visitor.person', 'budgetImage', 'formImage', 'form.question', 'guaranteeLetter.state',
				'guaranteeLetter.budget.affiliated.state', 'guaranteeLetter.budget.item', 'guaranteeLetter.beneficiary.phones', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
			]
		})
		.then(function(model) {
			
			if(!model) {
				res.sendStatus(404);
				return;
			}

			model = model.toJSON();

			/*var fields = {};

			if(req.userData.user.profile.profile == 'analista') {
				fields.analystId = req.userData.userId;
			} else if(req.userData.user.profile.profile == 'coordinador') {
				fields.coordinatorId = req.userData.userId;
			} else {
				fields.visitorId = req.userData.userId;
			}*/

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
				model.statusGroups = count;
				res.send(model);
			});

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getAll: function(req, res) {

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		RequestModel
		.fetchPage({
			page: page,
			pageSize: pageSize,
			withRelated: ['status',
				'comments.commenter.profile', 'comments.commenter.person',
				'visitor.person', 'formImage', 'budgetImage', 'form.question',
				'guaranteeLetter.budget.affiliated', 'guaranteeLetter.budget.item',
				'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder',
				'guaranteeLetter.policy.owner', 'guaranteeLetter.budget.currentBudget.item'
			]
		})
		.then(function(collection) {
			res.send(collection.toJSON());
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getAllByMe: function(req, res) {

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		UserModel
		.forge({id: req.userData.userId})
		.fetch({withRelated: ['profile']})
		.then(function(model) {

			model = model.toJSON();

			RequestModel
			.query(function(qb) {

				if(model.profile.profile == 'coordinador') {

					if(req.query.statusId) {
						if(req.query.statusId != '2') {
							qb.where({coordinatorId: model.id, statusId: req.query.statusId});
						} else { // es igual a 2
							qb.innerJoin('status', 'request.statusId', 'status.id');
							qb.innerJoin('guaranteeLetter', 'guaranteeLetter.id', 'request.guaranteeLetterId');
							qb.innerJoin('budget', 'budget.id', 'guaranteeLetter.budgetId');
							qb.innerJoin('affiliated', 'affiliated.id', 'budget.affiliatedId');
							qb.where('affiliated.stateId', req.userData.stateId);
							qb.where('status.id', req.query.statusId);
							qb.where('request.coordinatorId', null);
						}
					} else {
						qb.innerJoin('status', 'request.statusId', 'status.id');
						qb.innerJoin('guaranteeLetter', 'guaranteeLetter.id', 'request.guaranteeLetterId');
						qb.innerJoin('budget', 'budget.id', 'guaranteeLetter.budgetId');
						qb.innerJoin('affiliated', 'affiliated.id', 'budget.affiliatedId');
						qb.where('affiliated.stateId', req.userData.stateId);
						qb.where('request.coordinatorId', model.id).orWhere('request.coordinatorId', null).andWhere('affiliated.stateId', req.userData.stateId);
					}
					
				} else {

					if(model.profile.profile == 'analista') {
						qb.where({analystId: model.id});
					}

					if(model.profile.profile == 'visitador') {
						qb.where({visitorId: model.id});
					}

					if(req.query.statusId) {
						qb.where({statusId: req.query.statusId});
					}

				}

				if(req.query.requestId) {
					qb.where({'request.id': req.query.requestId});
				}

				if(req.query.guaranteeLetterId) {
					qb.where({'request.guaranteeLetterId': req.query.guaranteeLetterId});
				}

				if(req.query.sd1) {
					qb.whereRaw('??::date >= ?', ['request.startDate', req.query.sd1]);
				}

				if(req.query.sd2) {
					qb.whereRaw('??::date <= ?', ['request.startDate', req.query.sd2]);
				}

				qb.orderBy('request.startDate', 'DESC');

			})
			.fetchPage({
				page: page,
				pageSize: pageSize,
				withRelated: ['status', 
					{'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
					'analyst.person', 'coordinator.person', 'visitor.person', 'formImage', 'formImage', 'form.question', 'guaranteeLetter.state',
					'guaranteeLetter.budget.affiliated.state', 'guaranteeLetter.budget.item', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
				]
			})
			.then(function(collection) {
				var response = {}, role = '', collection_aux = [];
				response.pageCount = collection.pagination.pageCount;
				response.requests = collection.toJSON();

				var fields = {};

				fields.stateId = req.userData.stateId;
				fields.id = req.userData.userId;

				if(req.userData.user.profile.profile == 'analista') {
					fields.role = 'analyst';
				} else if(req.userData.user.profile.profile == 'coordinador') {
					fields.role = 'coordinator';
					//console.log(req.userData.stateId);
					for(var i = 0; i < response.requests.length; i++) {
						if((response.requests[i].coordinatorId == req.userData.userId) || (response.requests[i].coordinatorId == null && response.requests[i].guaranteeLetter.budget.affiliated.stateId == req.userData.stateId)) {
							collection_aux.push(response.requests[i]);
						}
					}
					response.requests = collection_aux;
				} else {
					fields.role = 'visitor';
				}

				RequestModel.count(fields, function(err, count) {
					if(err) {
						console.log(err);
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
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	create: function(req, res) {

		req.check(validator.create);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		RequestModel
		.forge({guaranteeLetterId: req.body.guaranteeLetterId})
		.fetch({withRelated: ['status', 
			{'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
				'analyst.person', 'coordinator.person', 'visitor.person', 'budgetImage', 'formImage', 'form.question', 'guaranteeLetter.state',
				'guaranteeLetter.budget.affiliated.state', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
			]
		})
		.then(function(model) {

			if(model && (model.get('statusId') == 2 || model.get('statusId') == 3 || model.get('statusId') == 4 || model.get('statusId') == 5)) {
				model = model.toJSON();
				model.created = true;
				res.send(model);
			} else { // begin else

				/*FormModel
				.forge()
				.save()
				.then(function(model) {*/

					RequestModel
					.forge({
						guaranteeLetterId: req.body.guaranteeLetterId,
						analystId: req.userData.userId,
						endDate: req.body.endDate,
						statusId: 2,
						formId: 1
					})
					.save()
					.then(function(model) {
						RequestModel
						.forge({id: model.get('id')})
						.fetch({withRelated: ['status', 
								{'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
								'analyst.person', 'coordinator.person', 'visitor.person', 'formImage', 'budgetImage', 'form.question', 'guaranteeLetter.state',
								'guaranteeLetter.budget.affiliated.state', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
							]
						})
						.then(function(model) {
							model = model.toJSON();

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
								model.statusGroups = count;
								res.send(model);
							});

							if(req.body.comment) {
								CommentModel
								.forge({requestId: model.id, commenterId: req.userData.userId, comment: req.body.comment})
								.save()
								.then(function(model) {
									//console.log(model.toJSON());
								})
								.catch(function(err) {
									console.log(err);
								});
							}

							notifyRequestCreated(model);

						})
						.catch(function(err) {
							console.log(err);
							res.sendStatus(500);
						})
					})
					.catch(function(err) {
						console.log(err);
						res.sendStatus(500);
					});
				/*})
				.catch(function(err) {
					console.log(500);
					res.sendStatus(500);
				});*/

			} // end else

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
	},

	getForm: function(req, res) {

		var page = req.query.page || 1,
			pageSize = 1;

		if(req.query.lastPage) {
			var requestFormModel = new RequestFormModel();
			requestFormModel.countRequestId(req.params.id, function(err, count) {

				if(err) {
					console.log(err);
					res.sendStatus(500);
					return;
				}

				if(count[0].count > 0) {
					RequestFormModel
					.query(function(qb) {
						qb.where('requestId', req.params.id);
					})
					.fetchPage({
						page: count[0].count,
						pageSize: pageSize
					})
					.then(function(collection) {

						var aux = collection.toJSON();

						RequestModel
						.forge({id: req.params.id})
						.fetch({withRelated: [{'answer': function(qb) {
							qb.orderBy('id');
							qb.where('requestFormId', aux[0].id);
						}}, 'form.question']})
						.then(function(model) {

							if(!model) {
								res.sendStatus(404);
								return
							}

							model = model.toJSON();

							var answer = model.answer;

							delete model.answer;

							for(var i = 0; i < answer.length; i++) {
								model.form.question[i].answer = answer[i];
							}

							var response = {};

							response.information = model;
							response.pageCount = collection.pagination.pageCount;
							response.submitDate = aux[0].date;

							res.send(response);

						})
						.catch(function(err) {
							console.log(err);
							if(err) {
								res.sendStatus(500);
								return;
							}
						});

						/*var response = {};

						response.requestForm = collection.toJSON();
						response.pageCount = collection.pagination.pageCount;

						res.send(response);*/
					})
					.catch(function(err) {
						console.log(err);
						res.sendStatus(500);
					});
				} else {

					RequestModel
					.forge({id: req.params.id})
					.fetch({withRelated: [{'answer': function(qb) {
						qb.orderBy('id');
					}}, 'form.question']})
					.then(function(model) {

						if(!model) {
							res.sendStatus(404);
							return
						}

						model = model.toJSON();

						var answer = model.answer;

						delete model.answer;

						for(var i = 0; i < answer.length; i++) {
							model.form.question[i].answer = answer[i];
						}

						var response = {};

						response.information = model;
						response.pageCount = 1;
						//response.submitDate = aux[0].date;

						res.send(response);

					})
					.catch(function(err) {
						console.log(err);
						if(err) {
							res.sendStatus(500);
							return;
						}
					});

				}

			});
		} else {

			RequestFormModel
			.query(function(qb) {
				qb.where('requestId', req.params.id);
			})
			.fetchPage({
				page: page,
				pageSize: pageSize
			})
			.then(function(collection) {

				var aux = collection.toJSON();

				RequestModel
				.forge({id: req.params.id})
				.fetch({withRelated: [{'answer': function(qb) {
					qb.orderBy('id');
					qb.where('requestFormId', aux[0].id);
				}}, 'form.question']})
				.then(function(model) {

					if(!model) {
						res.sendStatus(404);
						return;
					}

					model = model.toJSON();

					var answer = model.answer;

					delete model.answer;

					for(var i = 0; i < answer.length; i++) {
						model.form.question[i].answer = answer[i];
					}

					var response = {};

					response.information = model;
					response.pageCount = collection.pagination.pageCount;
					response.submitDate = aux[0].date;

					res.send(response);

				})
				.catch(function(err) {
					console.log(err);
					if(err) {
						res.sendStatus(500);
						return;
					}
				});

			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});

		}

		/*RequestModel
		.forge({id: req.params.id})
		.fetch({withRelated: [{'answer': function(qb) {
			qb.orderBy('id');
		}}, 'form.question']})
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return
			}

			model = model.toJSON();

			var answer = model.answer;

			delete model.answer;

			for(var i = 0; i < answer.length; i++) {
				model.form.question[i].answer = answer[i];
			}

			res.send(model);

		})
		.catch(function(err) {
			console.log(err);
			if(err) {
				res.sendStatus(500);
				return;
			}
		});*/

	},

	partialUpdate: function(req, res) {

		req.check(validator.partialUpdate);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		var bodyFields = [
			'statusId', 'visitorId', 'endDate'
		];

		var fields = _.pick(req.body, bodyFields);
		
		if(req.userData.user.profile.profile == 'coordinador') {
			fields.coordinatorId = req.userData.userId;
		}

		RequestModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {
			
			if(!model) {
				res.sendStatus(404);
				return;
			}

			if(req.userData.user.profile.profile == 'coordinador' && model.get('statusId') == 3 && fields.statusId && fields.statusId == 3) {
						
				RequestModel
				.forge({id: req.params.id})
				.fetch({
					withRelated: ['status', {'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
					'analyst.person', 'coordinator.person', 'visitor.person', 'formImage', 'budgetImage', 'form.question', 'guaranteeLetter.state',
					'guaranteeLetter.budget.affiliated.state', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
				]
				})
				.then(function(model) {
					model = model.toJSON();
					model.created = true;

					/*var fields = {};

					if(req.userData.user.profile.profile == 'analista') {
						fields.analystId = req.userData.userId;
					} else if(req.userData.user.profile.profile == 'coordinador') {
						fields.coordinatorId = req.userData.userId;
					} else {
						fields.visitorId = req.userData.userId;
					}*/

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
						model.statusGroups = count;
						res.send(model);
					});

				})
				.catch(function(err) {
					res.sendStatus(500);
				});

			} else {
				model.save(fields)
				.then(function(model) {
					RequestModel
					.forge({id: req.params.id})
					.fetch({
						withRelated: ['status', {'analyst': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
						'analyst.person', 'coordinator.person', 'visitor.person', 'formImage', 'budgetImage', 'form.question', 'guaranteeLetter.state',
						'guaranteeLetter.budget.affiliated.state', 'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder', 'guaranteeLetter.policy.owner'
					]
					})
					.then(function(model) {
						model = model.toJSON();

						var fields = {};

						if(req.userData.user.profile.profile == 'analista') {
							fields.analystId = req.userData.userId;
						} else if(req.userData.user.profile.profile == 'coordinador') {
							fields.coordinatorId = req.userData.userId;

							if(model.statusId == '3') {
								// correo al coordinador notificándole la asignación a tal persona
								notifyRequestCoordinated(model);
								notifyRequestAssigned(model);
							}

							if(model.statusId == '5') {
								// correo al coordinador notificándole el envío a revisión de la solicitud
								notifyRequestRejected(model);
								notifyRequestRejected2(model);
							}

							if(model.statusId == '6') {
								// correo al coordinador notificándole que hizo autorización de la solicitud
								notifyRequestAuthorized(model);
								notifyRequestAuthorized2(model);
							}

							// depende del statusId, se manda un correo notificando la asignación
							// el envío a revisión o la autorización
						} else {
							fields.visitorId = req.userData.userId;
							
							if(model.statusId == '4') {
								// correo indicando que ya atendió la visita
								notifyRequestCompleted(model);
								notifyRequestCompleted2(model);
							}
							
						}

						fields = {};

						//var fields = {};

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
							model.statusGroups = count;
							res.send(model);
						});

					})
					.catch(function(err) {
						console.log(err);
						res.sendStatus(500);
					})
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

	returnImageLoaded: function(req, res) {

		res.send({path: req.paths});

	},

	loadImage1: function() {

		var upload = multer({
			storage: storage,
			limits: {
				fileSize: 2099734
			} 
		});

		return upload.array('file');

	},

	loadImage2: function() {

		var upload = multer({
			storage: storage2,
			limits: {
				fileSize: 2099734
			} 
		});

		return upload.array('file');

	},

	deleteBudget: function(req, res, next) {

		BudgetImageModel
		.query(function(qb) {
			qb.where('requestId', req.params.id).del();
		})
		.fetch()
		.then(function(model) {
			req.budget_index = 0;
			next();
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	deleteForm: function(req, res, next) {

		FormImageModel
		.query(function(qb) {
			qb.where('requestId', req.params.id).del();
		})
		.fetch()
		.then(function(model) {
			req.form_index = 0;
			next();
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getComments: function(req, res) {

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		CommentModel
		.query(function(qb) {
			qb.where({'requestId': req.params.id});
			qb.orderBy('id', 'asc');
		})
		.fetchAll({
			withRelated: [
				{'commenter': function(qb) {qb.column('id', 'personId', 'profileId', 'available')}},
				'commenter.profile', 'commenter.person.profile'
			]
		})
		.then(function(collection) {
			var response = {};
			//response.pageCount = collection.pagination.pageCount;
			response.comment = collection.toJSON();
			res.send(response);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	postAnswer: function(req, res) {

		RequestFormModel
		.forge({requestId: req.params.id})
		.save()
		.then(function(model) {
			model = model.toJSON();

			var data = req.body.data;

			for(var i = 0; i < data.length; i++) {
				data[i].requestFormId = model.id;
			}

			bookshelf.knex.batchInsert('answer', data)
			.returning('*')
			.then(function(fields) {
				console.log(fields);
				//res.send(fields);

				var page = req.query.page || 1,
					pageSize = 1;

				var requestFormModel = new RequestFormModel();
				requestFormModel.countRequestId(req.params.id, function(err, count) {

					if(err) {
						console.log(err);
						res.sendStatus(500);
						return;
					}

					RequestFormModel
					.query(function(qb) {
						qb.where('requestId', req.params.id);
					})
					.fetchPage({
						page: count[0].count,
						pageSize: pageSize
					})
					.then(function(collection) {

						var aux = collection.toJSON();

						RequestModel
						.forge({id: req.params.id})
						.fetch({withRelated: [{'answer': function(qb) {
							qb.orderBy('id');
							qb.where('requestFormId', aux[0].id);
						}}, 'form.question']})
						.then(function(model) {

							if(!model) {
								res.sendStatus(404);
								return
							}

							model = model.toJSON();

							var answer = model.answer;

							delete model.answer;

							for(var i = 0; i < answer.length; i++) {
								model.form.question[i].answer = answer[i];
							}

							var response = {};

							response.information = model;
							response.pageCount = collection.pagination.pageCount;
							response.submitDate = aux[0].date;

							res.send(response);

						})
						.catch(function(err) {
							console.log(err);
							if(err) {
								res.sendStatus(500);
								return;
							}
						});

						/*var response = {};

						response.requestForm = collection.toJSON();
						response.pageCount = collection.pagination.pageCount;

						res.send(response);*/
					})
					.catch(function(err) {
						console.log(err);
						res.sendStatus(500);
					});

				});

			})
			.catch(function(err) {
				console.log(err);
				res.send(err);
			});
			
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});


		/*AnswerModel
		.query(function(qb) {
			qb.where({requestId: req.params.id}).del();
		})
		.fetchAll()
		.then(function(result) {
			
			bookshelf.knex.batchInsert('answer', req.body.data)
			.returning('*')
			.then(function(fields) {
				//console.log(fields);
				res.send(fields);
			})
			.catch(function(err) {
				console.log(err);
				res.send(err);
			});

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});*/

	}

};