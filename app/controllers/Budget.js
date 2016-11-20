var BudgetModel = require('../models/Budget');
var RequestModel = require('../models/Request');
var GuaranteeLetterModel = require('../models/GuaranteeLetter');
var validator = require('./validators/Budget');

var jsreport = require('jsreport');
var ejs = require('ejs');

var fs = require('fs');

module.exports = {

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		BudgetModel
		.forge({id: req.params.id})
		.fetch({withRelated: [{'item': function(qb) {qb.orderBy('concept')}}, 'affiliated', 'guaranteeLetter']})
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

		if(req.query.requestId) {

			RequestModel
			.forge({id: req.query.requestId})
			.fetch({withRelated: ['guaranteeLetter']})
			.then(function(model) {
				if(!model) {
					res.sendStatus(404);
					return;
				}
				model = model.toJSON();
				BudgetModel
				.forge({id: model.guaranteeLetter.budgetId})
				.fetch({withRelated: [{'item': function(qb) {qb.orderBy('concept')}}, 'affiliated', 'guaranteeLetter', 'item.historical']})
				.then(function(model) {

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
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});

		} else {
			res.sendStatus(400);
		}

	},

	getDocumentById: function(req, res) {

		var errors = req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		BudgetModel
		.forge({id: req.params.id})
		.fetch({withRelated: [{'item': function(qb) {qb.orderBy('concept')}}, 'affiliated', 'guaranteeLetter']})
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			var data = model.toJSON();;
			data.lastConcept = '';

			var dd = data.startDate.getDate(),
				mm = data.startDate.getMonth() + 1,
				yyyy = data.startDate.getFullYear();

			if(dd < 10) {
			    dd = '0' + dd;
			} 

			if(mm < 10) {
			    mm = '0' + mm;
			} 

			data.startDate = dd + '/' + mm + '/' + yyyy;

			var compiled = ejs.compile(fs.readFileSync(__dirname + '/documents/budget.ejs', 'utf8'));

			var html = compiled({data: data});

			jsreport.render(html).then(function(out) {

				res.writeHead(200, {
		            'Content-Type': 'application/pdf',
		            'Access-Control-Allow-Origin': '*',
		            'Content-Disposition': 'attachment; filename=presupuesto.' + data.code
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