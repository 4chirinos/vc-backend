var knex = require('../../config/db/builder-knex');


module.exports = {

	getByType: function(whereFields, next) {

		knex('profileType').where(whereFields).returning('*')
		.then(function(types) {
			knex('profile').where({typeId: types[0].id}).returning('*')
			.then(function(profiles) {
				next(null, profiles);
			}).catch(function(err) {
				console.log(err);
				next(err);
			});
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};