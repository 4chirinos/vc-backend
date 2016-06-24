var knex = require('../../config/db/builder-knex');

module.exports = {

	getBy: function(whereFields, next) {

		knex('item').where(whereFields).returning('*')
		.then(function(items) {
			next(null, items);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	update: function(fields, whereFields, next) {

		knex('item').where(whereFields).update(fields).returning('*')
		.then(function(items) {
			next(null, items);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};