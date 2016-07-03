var knex = require('../../config/db/builder-knex');

module.exports = {

	insert: function(question, next) {

		knex('question').insert(question).returning('*')
		.then(function(questions) {
			next(null, questions)
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getBy: function(whereFields, next) {

		knex('question').where(whereFields).returning('*')
		.then(function(questions) {
			next(null, questions);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getAll: function(next) {

		knex.select('*').from('question')
		.then(function(questions) {
			next(null, questions);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	update: function(whereFields, fields, next) {

		knex('question').where(whereFields).update(fields).returning('*')
		.then(function(questions) {
			next(null, questions);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};