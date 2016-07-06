var knex = require('../../config/db/builder-knex');


module.exports = {

	getByType: function(whereFields, next) {

		knex('statusType').where(whereFields).select('*')
		.then(function(types) {
			knex('status').where({typeId: types[0].id}).select('*')
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

		knex('status').where(whereFields).select('*')
		.then(function(status) {
			next(null, status);
		}).catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getTypeBy: function(whereFields, next) {

		knex('statusType').where(whereFields).select('*')
		.then(function(types) {
			next(null, types);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}


};