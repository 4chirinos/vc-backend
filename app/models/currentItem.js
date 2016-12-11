var bookshelf = require('../../config/db/builder-knex');

require('./currentBudget');

module.exports = bookshelf.model('currentItem', {
	tableName: 'currentItem',
	budget: function() {
		return this.belongsTo('currentBudget', 'currentBudgetId');
	}
});