var knex = require('../../config/db/builder-knex');

module.exports = {

	getBy: function(whereFields, next) {

		knex('affiliated').where(whereFields).returning('*')
		.then(function(budgets) {
			next(null, affiliated);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};