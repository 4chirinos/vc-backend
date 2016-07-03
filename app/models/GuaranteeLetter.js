var knex = require('../../config/db/builder-knex');

module.exports = {

	getBy: function(whereFields, next) {

		knex('guaranteeLetter').where(whereFields).returning('*')
		.then(function(letters) {
			next(null, letters);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};