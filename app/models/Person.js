var knex = require('../../config/db/builder-knex');

module.exports = {

	insert: function(fields, next) {

		knex('person').insert(fields).returning('*')
		.then(function(people) {
			next(null, people)
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getBy: function(whereFields, next) {

		knex('person').where(whereFields).returning('*')
		.then(function(people) {
			next(null, people);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getAll: function(next) {

		knex.select('*').from('person')
		.then(function(people) {
			next(null, people);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	update: function(whereFields, fields, next) {

		knex('person').where(whereFields).update(fields).returning('*')
		.then(function(people) {
			next(null, people);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};