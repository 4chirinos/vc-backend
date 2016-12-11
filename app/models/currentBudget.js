var bookshelf = require('../../config/db/builder-knex');

require('./currentItem');

module.exports = bookshelf.model('currentBudget', {
	tableName: 'currentBudget',
	item: function() {
		return this.hasMany('currentItem', 'currentBudgetId');
	}
});