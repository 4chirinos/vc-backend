var GuaranteeLetterModel = require('../models/GuaranteeLetter'),
	_ = require('lodash'),
	RequestModel = require('../models/Request'),
	validator = require('./validators/GuaranteeLetter');

var bookshelf = require('../../config/db/builder-knex');

var jsreport = require('jsreport');
var ejs = require('ejs');

var fs = require('fs');


module.exports = {

	getAll: function(req, res) {

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		GuaranteeLetterModel
		.query(function(qb) {

			if(req.query.guaranteeId) {
				qb.where({'id': req.query.guaranteeId});
			}
			if(req.query.policyId) {
				qb.where({'policyId': req.query.policyId});
			}
			if(req.query.firstName) {
				var subquery2 = bookshelf.knex.select('id').from('person').where({firstName: req.query.firstName});
				var subquery1 = bookshelf.knex.select('id').from('guaranteeLetter').where('beneficiaryId', 'in', subquery2);
				qb.where('id', 'in', subquery1);
			}
			if(req.query.lastName) {
				var subquery2 = bookshelf.knex.select('id').from('person').where({lastName: req.query.lastName});
				var subquery1 = bookshelf.knex.select('id').from('guaranteeLetter').where('beneficiaryId', 'in', subquery2);
				qb.where('id', 'in', subquery1);
			}
			if(req.query.BidentityCard) {
				var subquery2 = bookshelf.knex.select('id').from('person').where({identityCard: req.query.BidentityCard});
				var subquery1 = bookshelf.knex.select('id').from('guaranteeLetter').where('beneficiaryId', 'in', subquery2);
				qb.where('id', 'in', subquery1);
			}
			if(req.query.statusId) {
				qb.where({'statusId': req.query.statusId});
			}
			qb.where({'stateId': req.userData.stateId}); // esto es lo que me filtra las cartas avales según la localización geográfica
						// del analista
		})
		.fetchPage({
			page: page,
			pageSize: pageSize,
			withRelated: ['status', 'state', 'beneficiary', 'budget.affiliated.state', 'request.status', 'policy.holder', 'policy.owner']
		})
		.then(function(collection) {

			var response = {};
			response.guaranteeLetter = collection;
			response.pageCount = collection.pagination.pageCount;

			/*var fields = {};

			if(req.userData.user.profile.profile == 'analista') {
				fields.analystId = req.userData.userId;
			} else if(req.userData.user.profile.profile == 'coordinador') {
				fields.coordinatorId = req.userData.userId;
			} else {
				fields.visitorId = req.userData.userId;
			}**/

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

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		GuaranteeLetterModel
		.forge({id: req.params.id})
		.fetch({
			withRelated: ['status', 'state', 'beneficiary', 'budget.affiliated.state', 'request.status', 'policy.holder', 'policy.owner']
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

	getDocumentById: function(req, res) {

		RequestModel
		.forge({id: req.params.id})
		.fetch({withRelated: [
			'guaranteeLetter.state',
			'guaranteeLetter.beneficiary', 'guaranteeLetter.policy.holder',
			'guaranteeLetter.policy.owner', 'guaranteeLetter.budget.affiliated.state'
		]})
		.then(function(model) {
			
			if(!model) {
				res.sendStatus(404);
				return;
			}

			var data = model.toJSON();

			//res.send(data); return;

			var endDate = data.guaranteeLetter.policy.endDate

			endDate = endDate.getDate() + "-" + endDate.getMonth() + 1 + "-" + endDate.getFullYear();

            data.guaranteeLetter.policy.endDate = endDate;

            endDate = data.guaranteeLetter.startDate;

            endDate = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();

            data.guaranteeLetter.startDate = endDate;

			var compiled = ejs.compile(fs.readFileSync(__dirname + '/documents/guaranteeLetter.ejs', 'utf8'));

			var html = compiled({data: data});

			jsreport.render(html).then(function(out) {

				res.writeHead(200, {
		            'Content-Type': 'application/pdf',
		            'Access-Control-Allow-Origin': '*',
		            'Content-Disposition': 'attachment; filename=cartaAval_' + data.guaranteeLetter.id
		        });

				out.stream.pipe(res);

			}).catch(function(e) {    
			    res.sendStatus(500);
			});

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	}

};