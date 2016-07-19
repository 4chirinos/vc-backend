var BudgetModel = require('../models/Budget');

var jsreport = require('jsreport');
var ejs = require('ejs');
var fs = require('fs');

module.exports = {

	getAll: function(req, res) {

		BudgetModel
		.forge()
		.fetchAll({withRelated: [{'item': function(qb) {qb.orderBy('concept')}}, 'affiliated', 'guaranteeLetter']})
		.then(function(collection) {

			var data = collection.toJSON()[1];
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

				/*res.writeHead(200, {
		            'Content-Type': 'application/pdf',
		            'Access-Control-Allow-Origin': '*',
		            'Content-Disposition': 'attachment; filename=out.pdf'
		        });*/

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