var knex = require('../../config/db/builder-knex');
var bcrypt = require('bcrypt-nodejs');

module.exports = {

	insert: function(fields, next) {

		knex('user').insert(fields).returning(returningFields)
		.then(function(users) {
			next(null, users)
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getAll: function(next) {

		knex.select(returningFields).from('user')
		.then(function(users) {
			next(null, users);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getBy: function(whereFields, next) {

		knex('user').where(whereFields).select(returningFields)
		.then(function(users) {
			next(null, users);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	update: function(whereFields, fields, next) {

		knex('user').where(whereFields).update(fields).returning(returningFields)
		.then(function(users) {
			next(null, users);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	comparePassword: function(candidatePassword, password, next) {

		bcrypt.compare(candidatePassword, password, function(err, match) {
			if(err) next(err);
			else next(null, match);
		});

	},

	getBy2: function(whereFields, next) {

		knex('user').where(whereFields).select('*')
		.then(function(users) {
			next(null, users);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};

var returningFields = [
	'id', 'personId', 'available', 'profileId'
];