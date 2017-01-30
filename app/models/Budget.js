var bookshelf = require('../../config/db/builder-knex');

require('./Item');
require('./Affiliated');
require('./currentBudget');

module.exports = bookshelf.model('Budget', {
	tableName: 'my_budget',
	item: function() {
		return this.hasMany('Item', 'budgetId');
	},
	affiliated: function() {
		return this.belongsTo('Affiliated', 'affiliatedId');
	},
	guaranteeLetter: function() {
		return this.hasOne('GuaranteeLetter', 'budgetId');
	},
	currentBudget: function() {
		return this.hasMany('currentBudget', 'budgetId');
	}
});