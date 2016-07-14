var bookshelf = require('../../config/db/builder-knex');

require('./User');

module.exports = bookshelf.model('Session', {
	tableName: 'session',
	user: function() {
		return this.belongsTo('User', 'userId');
	}
});