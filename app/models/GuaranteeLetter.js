var bookshelf = require('../../config/db/builder-knex');

module.exports = bookshelf.model('GuaranteeLetter', {
	tableName: 'guaranteeLetter',
	request: function() {
		return this.hasOne('Request', 'guaranteeLetterId');
	},
	status: function() {
		return this.belongsTo('Status', 'statusId');
	},
	budget: function() {
		return this.belongsTo('Budget', 'budgetId');
	}
});