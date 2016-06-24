var knex = require('../../config/db/builder-knex');

module.exports = {

	getBy: function(whereFields, next) {

		knex('budget').where(whereFields).returning('*')
		.then(function(budgets) {
			next(null, budgets);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};