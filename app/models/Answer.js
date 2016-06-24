var knex = require('../../config/db/builder-knex');

module.exports = {

	insert: function(fields, next) {

		knex('answer').insert(fields).returning('*')
		.then(function(answers) {
			next(null, answers)
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getBy: function(whereFields, next) {

		knex('answer').where(whereFields).returning('*')
		.then(function(answers) {
			next(null, answers);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	update: function(fields, whereFields, next) {

		knex('answer').where(whereFields).update(fields).returning('*')
		.then(function(answers) {
			next(null, answers);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};