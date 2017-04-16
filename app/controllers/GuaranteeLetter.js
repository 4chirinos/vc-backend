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
				var subquery2 = bookshelf.knex.select('id').from('person').where({firstName: req.query.firstName.toUpperCase()});
				var subquery1 = bookshelf.knex.select('id').from('guaranteeLetter').where('beneficiaryId', 'in', subquery2);
				qb.where('id', 'in', subquery1);
			}
			if(req.query.lastName) {
				var subquery2 = bookshelf.knex.select('id').from('person').where({lastName: req.query.lastName.toUpperCase()});
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
			withRelated: ['status', 'state', 'beneficiary.phones', 'beneficiary.emails', 'budget.affiliated.state', 'budget.affiliated.phones', 'budget.affiliated.emails', 'request.status', 'policy.holder', 'policy.owner']
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

		GuaranteeLetterModel
		.forge({id: req.params.id})
		.fetch({withRelated: [
			'state',
			'beneficiary', 'policy.holder',
			'policy.owner', {'budget.item': function(qb) {qb.where('version', 1)}},
			'budget.affiliated.state'
		]})
		.then(function(model) {
			
			if(!model) {
				res.sendStatus(404);
				return;
			}

			var data = model.toJSON();

			//res.send(data); return;

			var totalCost = 0, uncoveredCost = 0, coveredCost = 0;

			for(var i = 0; i < data.budget.item.length; i++) {
				totalCost += data.budget.item[i].cost * data.budget.item[i].quantity;
			}

			coveredCost = totalCost * data.coveredPercentage / 100;

			uncoveredCost = totalCost - coveredCost;

			coveredCost = coveredCost.toFixed(2);

			coveredCost = parseFloat(coveredCost);

			coveredCost = coveredCost.toLocaleString('de-DE');

			uncoveredCost = uncoveredCost.toFixed(2);

			uncoveredCost = parseFloat(uncoveredCost);

			uncoveredCost = uncoveredCost.toLocaleString('de-DE');

			totalCost = totalCost.toFixed(2);

			totalCost = parseFloat(totalCost);

			totalCost = totalCost.toLocaleString('de-DE');

			data.coveredCost = coveredCost;
			data.uncoveredCost = uncoveredCost;
			data.totalCost = totalCost;

			var endDate = data.policy.endDate

			endDate = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();

            data.policy.endDate = endDate;

            endDate = data.startDate;

            endDate = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();

            data.startDate = endDate;

            endDate = data.budget.startDate;

            endDate = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();

            data.budget.startDate = endDate;

            data.imageUrl = __dirname + '/../public';

            //console.log(data.imageUrl);

			var compiled = ejs.compile(fs.readFileSync(__dirname + '/documents/guaranteeLetter.ejs', 'utf8'));

			var html = compiled({data: data});

			jsreport.render(html).then(function(out) {

				res.writeHead(200, {
		            'Content-Type': 'application/pdf',
		            'Access-Control-Allow-Origin': '*',
		            'Content-Disposition': 'attachment; filename=CartaAval_' + data.id
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