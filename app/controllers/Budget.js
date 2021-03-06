var BudgetModel = require('../models/Budget');
var ItemModel = require('../models/Item');
var currentBudgetModel = require('../models/currentBudget');
var currentItemModel = require('../models/currentItem');
var RequestModel = require('../models/Request');
var GuaranteeLetterModel = require('../models/GuaranteeLetter');
var validator = require('./validators/Budget');
var async = require("async");

var jsreport = require('jsreport');
var ejs = require('ejs');

var fs = require('fs');

var bookshelf = require('../../config/db/builder-knex');

module.exports = {

	getAll2: function(req, res) {

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		BudgetModel
		.query(function(qb) {
			
			qb.where({'endVersion': null});
			qb.innerJoin('guaranteeLetter', 'guaranteeLetter.budgetId', 'budget.id');
			qb.innerJoin('person', 'person.id', 'guaranteeLetter.beneficiaryId');

			if(req.query.code) {
				qb.where({'budget.id': req.query.code});
			}

			if(req.query.firstName) {
				qb.where({'person.firstName': req.query.firstName.toUpperCase()});
			}

			if(req.query.lastName) {
				qb.where({'person.lastName': req.query.lastName.toUpperCase()});
			}

			if(req.query.identityCard) {
				qb.where({'person.identityCard': req.query.identityCard.toUpperCase()});
			}

		})
		.fetchPage({
			page: page,
			pageSize: pageSize,
			withRelated: ['affiliated.state', 'guaranteeLetter.beneficiary']
		})
		.then(function(collection) {

			var response = {};
			response.budgets = collection.toJSON();
			response.pageCount = collection.pagination.pageCount;

			res.send(response);

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	create: function(req, res) {
		
		BudgetModel
		.forge({
			id: req.body.items[0].budgetId,
			version: req.body.items[0].version - 1
		})
		.fetch()
		.then(function(model) {
			
			if(!model) {
				res.sendStatus(404);
				return;
			}
			
			//model = model.toJSON();
			var aux = model.toJSON();
			//model.endVersion = new Date();
			model.set({endVersion: new Date()});

			new BudgetModel().where({
				id: req.body.items[0].budgetId,
				version: req.body.items[0].version - 1
			})
			.save(model.toJSON(), {method: 'update'})
			.then(function(model) {

				aux.version++;
				delete aux.endVersion;
				aux.startVersion = new Date();

				bookshelf.knex.from('budget')
				.returning('*')
				.insert(aux)
				.then(function(model) {

					model = model[0];

					bookshelf.knex.batchInsert('item', req.body.items)
					.returning('*')
					.then(function(fields) {

						BudgetModel
						.forge({id: model.id, version: aux.version})
						.fetch({withRelated: {'item': function(qb) {
							qb.where({'version': model.version});
							qb.orderBy('concept', 'ASC')}}
						})
						.then(function(model) {
							model = model.toJSON();
							console.log(model);
							res.send(model);
						})
						.catch(function(err) {
							console.log(err);
							res.sendStatus(500);
						});

					}).catch(function(err) {
						console.log(err);
						res.send(500);
					});

				})
				.catch(function(err) {
					console.log(err);
					res.sendStatus(500);
				});

			})
			.catch(function(err) {
				console.log("NOJODA");
				console.log(err);
				res.sendStatus(500);
			});
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});


		/*bookshelf.knex.batchInsert('item', budget.items)
		.returning('*')
		.then(function(fields) {
			//console.log(fields);

			BudgetModel
			.forge({id: model.id})
			.fetch({withRelated: {'item': function(qb) {qb.orderBy('concept', 'ASC')}}})
			.then(function(model) {
				model = model.toJSON();
				res.send(model);
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(err);
			});

		}).catch(function(err) {
			console.log(err);
			res.send(err);
		});*/
		
	},

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		BudgetModel
		.forge({id: req.params.id, version: 1})
		.fetch({withRelated: [{'item': function(qb) {qb.orderBy('concept'); qb.where({version: 1});}}, 'affiliated.state', 'affiliated.phones', 'guaranteeLetter.beneficiary.state', 'guaranteeLetter.beneficiary.phones']})
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

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

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getAll: function(req, res) {

		//console.log(req.query.requestId);

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
				.forge({id: model.guaranteeLetter.budgetId, version: 1})
				.fetch({withRelated: [{'item': function(qb) {qb.orderBy('concept', 'ASC')}}, 'affiliated', 'guaranteeLetter'/*,
					{'currentBudget.item': function(qb) {
						qb.orderBy('concept', 'ASC');
					}}*/	
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

	getCurrentBudget: function(req, res) {

		var page = req.query.page || 1,
			pageSize = 1;

		page = parseInt(page);

		RequestModel
		.forge({id: req.params.requestId})
		.fetch({withRelated: ['guaranteeLetter']})
		.then(function(model) {
			if(!model) {
				res.sendStatus(404);
				return;
			}
			
			model = model.toJSON();

			BudgetModel.count(model.guaranteeLetter.budgetId, function(err, count) {

				count[0].count = parseInt(count[0].count);

				if(err) {
					console.log(err);
					res.sendStatus(500);
					return;
				}

				if(req.query.lastPage) {
					page = count[0].count;
				}

				if(!req.query.firstPage && count[0].count == 0) {
					page = 1;
				}

				if(!req.query.firstPage && count[0].count != 0) {
					page++;
				}

				BudgetModel
				.query(function(qb) {
					qb.where('id', model.guaranteeLetter.budgetId);
					if(!req.query.firstPage && count[0].count != 0) {
						//qb.whereNot('version', 1);
						qb.whereRaw('version = ?', [page]);
					}
					//qb.where('version', page);
				})
				.fetchPage({
					page: 1,
					pageSize: pageSize,
					withRelated: [{'item': function(qb) {
						qb.where('version', page);
						qb.orderBy('concept', 'ASC')
					}}]
				})
				.then(function(collection) {

					var response = {};

					response.budgets = collection.toJSON();
					response.pageCount = parseInt(count[0].count);

					res.send(response);
				})
				.catch(function(err) {
					console.log(err);
					res.sendStatus(500);
				});

			});

			/*if(req.query.lastPage) {

				BudgetModel.count(model.guaranteeLetter.budgetId, function(err, count) {

					if(err) {
						console.log(err);
						res.sendStatus(500);
						return;
					}

					BudgetModel
					.query(function(qb) {
						qb.where('id', model.guaranteeLetter.budgetId);
						//qb.where('version', count[0].count);
					})
					.fetchPage({
						page: count[0].count,
						pageSize: 1,
						withRelated: [{'item': function(qb) {
							qb.where('version', count[0].count);
							qb.orderBy('concept', 'ASC')
						}}]
					})
					.then(function(collection) {

						var response = {};

						response.budgets = collection.toJSON();
						response.pageCount = collection.pagination.pageCount + 1;

						res.send(response);
					})
					.catch(function(err) {
						console.log(err);
						res.sendStatus(500);
					});

				});

			} else {

				console.log('epa: ' + model.guaranteeLetter.budgetId);
				console.log(req.query.page);

				BudgetModel
				.query(function(qb) {
					qb.where('affiliatedId', model.guaranteeLetter.budgetId);
					//qb.where('version', page);
				})
				.fetchPage({
					page: page,
					pageSize: pageSize,
					withRelated: [{'item': function(qb) {
						qb.where('version', page);
						qb.orderBy('concept', 'ASC')
					}}]
				})
				.then(function(collection) {

					var response = {};

					response.budgets = collection.toJSON();
					response.pageCount = collection.pagination.pageCount + 1;

					console.log('paginas: ' + collection.pagination.pageCount);

					res.send(response);
				})
				.catch(function(err) {
					console.log(err);
					res.sendStatus(500);
				});

			}*/
		
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	updateBudget: function(req, res) {

		var items = req.body.items;

		async.forEach(items, function(item, callback) {

			ItemModel
			.forge({id: item.id})
			.fetch()
			.then(function(model) {
				if(!model) {
					res.sendStatus(404);
					return;
				}
				model.save(item)
				.then(function(model) {
					callback();
				})
				.catch(function(err) {
					callback(err);
				});
			})
			.catch(function(err) {
				callback(err);
			});

	    }, function(err) {

	        if (err) {
	        	console.log(err);
	        	res.sendStatus(500);
	        	return;
	        }

	        BudgetModel
			.forge({id: items[0].budgetId, version: 1})
			.fetch({withRelated: {'item': function(qb) {
				qb.where({'version': 1});
				qb.orderBy('concept', 'ASC')}}
			})
			.then(function(model) {
				model = model.toJSON();
				res.send(model);
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(err);
			});
	      
	    });

	},

	getDocumentById: function(req, res) {

		var errors = req.check(validator.getById);

		var errors = req.validationErrors();

		var version = req.params.version || 1;

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		BudgetModel
		.forge({id: req.params.id, version: version})
		.fetch({withRelated: [
			{
				'item': function(qb) {
					qb.where('version', version);
					qb.orderBy('concept');
				}
			},
				'affiliated.state', 'guaranteeLetter.beneficiary'
			]
		})
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			var data = model.toJSON(), totalCost = 0, totalQuantity = 0;

			//res.send(data); return;

			for(var i = 0; i < data.item.length; i++) {
				var aux = data.item[i].cost, quantity = data.item[i].quantity;
				totalCost += aux * quantity;
				totalQuantity += data.item[i].quantity;
				aux = aux.toFixed(2);
				aux = parseFloat(aux);
				aux = aux.toLocaleString('de-DE');
				data.item[i].cost = aux;
			}

			totalCost = totalCost.toFixed(2);
			totalCost = parseFloat(totalCost);
			totalCost = totalCost.toLocaleString('de-DE');

			totalQuantity = totalQuantity.toLocaleString('de-DE');

			data.totalCost = totalCost;
			data.totalQuantity = totalQuantity;

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

			//var compiled = ejs.compile(fs.readFileSync(__dirname + '/documents/budget.ejs', 'utf8'));

			var compiled;

			if(req.params.last != "false") {
				compiled = ejs.compile(fs.readFileSync(__dirname + '/documents/asLastBudget.ejs', 'utf8'));
			} else {
				compiled = ejs.compile(fs.readFileSync(__dirname + '/documents/budget.ejs', 'utf8'));
			}

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