var bookshelf = require('../../config/db/builder-knex');

require('./Budget');

module.exports = bookshelf.model('Item', {
	tableName: 'my_item',
	budget: function() {
		return this.belongsTo('Budget', 'budgetId');
	},
	historical: function() {
		return this.hasMany('historicalItem', 'itemId');
	}
});