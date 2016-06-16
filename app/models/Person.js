var knex = require('../../config/db/builder-knex');

module.exports = {

	insert: function(person, next) {

		var returningFields = [
			'id', 'identityCard', 'firstName', 'lastName', 'email'
		];

		knex('person').insert(person).returning(returningFields)
		.then(function(people) {
			next(null, people[0])
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getByFields: function(whereFields, next) {

		var returningFields = [
			'id', 'identityCard', 'firstName', 'lastName', 'email'
		];

		knex('person').where(whereFields).returning(returningFields)
		.then(function(people) {
			next(null, people[0]);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getAll: function(next) {

		var returningFields = [
			'id', 'identityCard', 'firstName', 'lastName', 'email'
		];

		knex.select(returningFields).from('person')
		.then(function(people) {
			next(null, people);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	update: function(fields, whereFields, next) {

		var returningFields = [
			'id', 'identityCard', 'firstName', 'lastName', 'email'
		];

		knex('person').where(whereFields).update(fields).returning(returningFields)
		.then(function(people) {
			next(null, people[0]);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	partialUpdate: function(fields, whereFields, next) {

		var returningFields = [
			'id', 'identityCard', 'firstName', 'lastName', 'email'
		];

		knex('person').where(whereFields).update(fields).returning(returningFields)
		.then(function(people) {
			next(null, people[0]);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};