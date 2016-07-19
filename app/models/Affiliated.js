var bookshelf = require('../../config/db/builder-knex');

require('./Budget');

module.exports = bookshelf.model('Affiliated', {
	tableName: 'affiliated',
	budget: function() {
		return this.hasMany('Budget', 'affiliatedId');
	}
});