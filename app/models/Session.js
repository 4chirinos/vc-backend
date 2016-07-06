var knex = require('../../config/db/builder-knex');

module.exports = {

	insert: function(fields, next) {

		knex('session').insert(fields).returning('*')
		.then(function(sessions) {
			next(null, sessions);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getBy: function(whereFields, next) {

		knex('session').where(whereFields).select('*')
		.then(function(sessions) {
			next(null, sessions);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

};