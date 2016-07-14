var bookshelf = require('../../config/db/builder-knex');

require('./Person');
require('./User');

module.exports = bookshelf.model('Profile', {
	tableName: 'profile',
	user: function() {
		return this.hasOne('User')
	},
	person: function() {
		return this.hasOne('Person');
	}
});