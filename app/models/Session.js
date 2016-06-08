var knex = require('../../config/db/builder-knex');

module.exports = {

	save: function(session, next) {

		knex('session').insert(session)
		.then(function(session) {
			next(null, session);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};