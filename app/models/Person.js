var bookshelf = require('../../config/db/builder-knex');

require('./User');
require('./Profile');
require('./personPhoneNumber');

module.exports = bookshelf.model('Person', {
	tableName: 'person',
	user: function() {
		return this.hasOne('User', 'personId');
	},
	profile: function() {
		return this.belongsTo('Profile', 'profileId');
	},
	state: function() {
		return this.belongsTo('State', 'stateId');
	},
	phones: function() {
		return this.hasMany('personPhoneNumber', 'personId');
	}
});