var knex = require('../../config/db/builder-knex');


module.exports = {

	getUserProfiles: function(next) {

		var returningFields = [
			'profile'
		];

		knex.select(returningFields).from('userProfile')
		.then(function(profiles) {
			next(null, profiles);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});
		
	},

	getUserProfileByFields: function(whereFields, next) {

		var returningFields = [
			'id', 'profile'
		];

		knex('userProfile').where(whereFields).returning(returningFields)
		.then(function(profiles) {
			next(null, profiles[0]);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	addProfileToUser: function(record, next) {

		knex('user_has_userProfile').insert(record)
		.then(function() {
			next(null);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getProfilesOfUserByFields: function(whereFields, next) {

		var returningFields = [
			'id', 'profileId'
		];

		knex('user_has_userProfile').where(whereFields).returning(returningFields)
		.then(function(records) {
			next(null, records);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	deleteProfilesOfUserByFields: function(whereFields, next) {

		knex('user_has_userProfile').where(whereFields).del()
		.then(function() {
			next(null);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getPersonProfiles: function(next) {

		var returningFields = [
			'profile'
		];

		knex.select(returningFields).from('personProfile')
		.then(function(profiles) {
			next(null, profiles);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	},

	getPersonProfileByFields: function(whereFields, next) {

		var returningFields = [
			'id', 'profile'
		];

		knex('personProfile').where(whereFields).returning(returningFields)
		.then(function(profiles) {
			next(null, profiles[0]);
		})
		.catch(function(err) {
			console.log(err);
			next(err);
		});

	}

};