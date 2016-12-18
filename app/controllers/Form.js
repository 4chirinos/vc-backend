var FormModel = require('../models/Form');
var RequestModel = require('../models/Request');
var validator = require('./validators/Form');
var GuaranteeLetterModel = require('../models/GuaranteeLetter');

var jsreport = require('jsreport');
var ejs = require('ejs');

var fs = require('fs');

module.exports = {

	getAll: function(req, res) {

		if(req.query.requestId) {

			RequestModel
			.forge({id: req.query.requestId})
			.fetch({
				withRelated: ['form']
			})
			.then(function(model) {
				if(!model) {
					res.sendStatus(404);
					return;
				}
				model = model.toJSON();
				res.send(model.form);
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});

		} else {
			res.sendStatus(400);
		}

	},

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		FormModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			res.send(model);

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
			'form.question', 'guaranteeLetter.beneficiary', 'guaranteeLetter.beneficiary',
			'guaranteeLetter.budget.affiliated.state'
		]})
		.then(function(model) {
			
			if(!model) {
				res.sendStatus(404);
				return;
			}

			var data = model.toJSON();

			var today = new Date();

			var birthDate = data.guaranteeLetter.beneficiary.birthDate;

            var age = today.getFullYear() - birthDate.getFullYear();

            var aux1 = today.getMonth() + 1 - birthDate.getMonth(),
            	aux2 = today.getDay() - birthDate.getDay();

            if(aux1 > 0 || (aux1 == 0 && aux2 >= 0)) age++;

            data.guaranteeLetter.beneficiary.age = age;

			var compiled = ejs.compile(fs.readFileSync(__dirname + '/documents/survey.ejs', 'utf8'));

			var html = compiled({data: data});

			jsreport.render(html).then(function(out) {

				res.writeHead(200, {
		            'Content-Type': 'application/pdf',
		            'Access-Control-Allow-Origin': '*',
		            'Content-Disposition': 'attachment; filename=Encuesta'
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

		/*FormModel
		.forge({id: req.params.id})
		.fetch({withRelated: ['question']})
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			var data = model.toJSON();

			var compiled = ejs.compile(fs.readFileSync(__dirname + '/documents/survey.ejs', 'utf8'));

			var html = compiled({data: data});

			jsreport.render(html).then(function(out) {

				res.writeHead(200, {
		            'Content-Type': 'application/pdf',
		            'Access-Control-Allow-Origin': '*',
		            'Content-Disposition': 'attachment; filename=encuesta'
		        });

				out.stream.pipe(res);

			}).catch(function(e) {    
			    res.sendStatus(500);
			});

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});*/

	}
};