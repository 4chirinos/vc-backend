var BudgetModel = require('../models/Budget');
var validator = require('./validators/Budget');

var jsreport = require('jsreport');
var ejs = require('ejs');
var fs = require('fs');

module.exports = {

	getById: function(req, res) {

		var errors = req.check(validator.getById);

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

			res.send(model.toJSON());

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getDocumentById: function(req, res) {

		var errors = req.check(validator.getById);

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