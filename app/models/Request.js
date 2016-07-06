var knex = require('../../config/db/builder-knex');

module.exports = {

	insert: function(fields, next) {

		knex('request').insert(fields).returning('*')
		.then(function(requests) {
			next(null, requests)
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getBy: function(whereFields, next) {

		knex('request').where(whereFields).select('*')
		.then(function(requests) {
			next(null, requests);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getAll: function(next) {

		knex.select('*').from('request')
		.then(function(requests) {
			next(null, requests);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};