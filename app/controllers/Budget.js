var BudgetModel = require('../models/Budget');
var ItemModel = require('../models/Item');
var currentBudgetModel = require('../models/currentBudget');
var currentItemModel = require('../models/currentItem');
var RequestModel = require('../models/Request');
var GuaranteeLetterModel = require('../models/GuaranteeLetter');
var validator = require('./validators/Budget');

var jsreport = require('jsreport');
var ejs = require('ejs');

var fs = require('fs');

var bookshelf = require('../../config/db/builder-knex');

module.exports = {

	create: function(req, res) {

		var budget = req.body;

		if(budget.id == -1) {
			currentBudgetModel
			.forge({budgetId: budget.parentBudgetId})
			.save()
			.then(function(model) {
				model = model.toJSON();

				for(var i = 0; i < budget.items.length; i++) {
					budget.items[i].currentBudgetId = model.id;
				}
					
				bookshelf.knex.batchInsert('currentItem', budget.items)
				.returning('*')
				.then(function(fields) {
					//console.log(fields);

					currentBudgetModel
					.forge({id: model.id})
					.fetch({withRelated: {'item': function(qb) {qb.orderBy('id')}}})
					.then(function(model) {
						model = model.toJSON();
						res.send(model);
					})
					.catch(function(err) {
						console.log(err);
						res.sendStatus(err);
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
		} else {
			currentItemModel
			.query(function(qb) {
				qb.where({currentBudgetId: budget.id}).del();
			})
			.fetchAll()
			.then(function(result) {

				for(var i = 0; i < budget.items.length; i++) {
					budget.items[i].currentBudgetId = budget.id;
				}

				bookshelf.knex.batchInsert('currentItem', budget.items)
				.returning('*')
				.then(function(fields) {
					//console.log(fields);
					currentBudgetModel
					.forge({id: budget.id})
					.fetch({withRelated: {'item': function(qb) {qb.orderBy('id')}}})
					.then(function(model) {
						model = model.toJSON();
						res.send(model);
					})
					.catch(function(err) {
						console.log(err);
						res.sendStatus(err);
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
		}
		
	},

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		BudgetModel
		.forge({id: req.params.id})
		.fetch({withRelated: [{'item': function(qb) {qb.orderBy('concept')}}, 'affiliated.state', 'guaranteeLetter.beneficiary']})
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
				.fetch({withRelated: [{'item': function(qb) {qb.orderBy('concept', 'ASC')}}, 'affiliated', 'guaranteeLetter', 'item.historical',
					{'currentBudget.item': function(qb) {
						qb.orderBy('concept', 'ASC');
					}}	
				]})
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
		.fetch({withRelated: [{'item': function(qb) {qb.orderBy('concept')}}, 'affiliated.state', 'guaranteeLetter.beneficiary']})
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			var data = model.toJSON(), totalCost = 0;

			//res.send(data); return;

			for(var i = 0; i < data.item.length; i++) {
				var aux = data.item[i].cost;
				totalCost += aux;
				aux = aux.toFixed(2);
				aux = parseFloat(aux);
				aux = aux.toLocaleString('de-DE');
				data.item[i].cost = aux;
			}

			totalCost = totalCost.toFixed(2);
			totalCost = parseFloat(totalCost);
			totalCost = totalCost.toLocaleString('de-DE');

			data.totalCost = totalCost;

			data.lastConcept = '';

			var today = new Date();

			var birthDate = data.guaranteeLetter.beneficiary.birthDate;

            var age = today.getFullYear() - birthDate.getFullYear();

            var aux1 = today.getMonth() + 1 - birthDate.getMonth(),
            	aux2 = today.getDay() - birthDate.getDay();

            if(aux1 > 0 || (aux1 == 0 && aux2 >= 0)) age++;

            data.guaranteeLetter.beneficiary.age = age;

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
		            'Content-Disposition': 'attachment; filename=Presupuesto_' + data.code
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