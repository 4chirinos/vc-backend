var knex = require('../../config/db/builder-knex');
var bcrypt = require('bcrypt-nodejs');

module.exports = {

	insert: function(user, next) {

		var returningFields = [
			'id', 'personId', 'available'
		];

		knex('user').insert(user).returning(returningFields)
		.then(function(users) {
			next(null, users[0])
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getAll: function(next) {

		var returningFields = [
			'id', 'personId', 'available', 'password'
		];

		knex.select(returningFields).from('user')
		.then(function(users) {
			next(null, users);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getById: function(whereFields, next) {

		var returningFields = [
			'id', 'personId', 'available'
		];

		knex('user').where(whereFields).returning(returningFields)
		.then(function(users) {
			next(null, users[0]);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	update: function(fields, whereFields, next) {

		var returningFields = [
			'id', 'personId', 'available', 'password'
		];

		knex('user').where(whereFields).update(fields).returning(returningFields)
		.then(function(users) {
			next(null, users[0]);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	partialUpdate: function(fields, whereFields, next) {

		var returningFields = [
			'id', 'personId', 'available', 'password'
		];

		knex('user').where(whereFields).update(fields).returning(returningFields)
		.then(function(users) {
			next(null, users[0]);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	comparePassword: function(candidatePassword, password, next) {

		bcrypt.compare(candidatePassword, password, function(err, match) {
			if(err) next(err);
			next(null, match);
		});

	}

};