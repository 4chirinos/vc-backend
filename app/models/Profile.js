var knex = require('../../config/db/builder-knex');


module.exports = {

	getByType: function(whereFields, next) {

		knex('profileType').where(whereFields).select('*')
		.then(function(types) {
			knex('profile').where({typeId: types[0].id}).select('*')
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

	},

	getBy: function(whereFields, next) {

		knex('profile').where(whereFields).select('*')
		.then(function(profiles) {
			next(null, profiles);
		}).catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};