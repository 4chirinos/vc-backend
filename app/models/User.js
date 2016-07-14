var bookshelf = require('../../config/db/builder-knex');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

require('./Person');
require('./Profile');
require('./Session');

module.exports = bookshelf.model('User', {
	tableName: 'user',
	initialize: function() {
		this.on('saving', this.hashPassword, this);
	},
	hashPassword: function(model, attrs, options) {
		return new Promise(function(resolve, reject) {
			bcrypt.hash(model.attributes.password, null, null, function(err, hash) {
	     		if(err) reject(err);
	      		model.set('password', hash);
	      		resolve(hash);
	    	});
		});
	},
	comparePassword: function(candidatePassword, model) {
		return new Promise(function(resolve, reject) {
			bcrypt.compare(candidatePassword, model.attributes.password, function(err, match) {
				if(err) reject(err);
				resolve(match);
			});
		});
	},
	person: function() {
		return this.belongsTo('Person', 'personId');
	},
	profile: function() {
		return this.belongsTo('Profile', 'profileId');
	},
	session: function() {
		return this.hasOne('Session', 'userId');
	},
	coordinator: function() {
		return this.hasMany('Request', 'coordinatorId');
	},
	visitor: function() {
		return this.hasMany('Request', 'visitorId');
	},
	analyst: function() {
		return this.hasMany('Request', 'analystId');
	}
});