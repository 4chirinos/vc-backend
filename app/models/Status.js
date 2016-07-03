var knex = require('../../config/db/builder-knex');


module.exports = {

	getByType: function(whereFields, next) {

		knex('statusType').where(whereFields).returning('*')
		.then(function(types) {
			knex('status').where({typeId: types[0].id}).returning('*')
			.then(function(status) {
				next(null, status);
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

		knex('status').where(whereFields).returning('*')
		.then(function(status) {
			next(null, status);
		}).catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};