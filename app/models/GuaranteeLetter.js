var bookshelf = require('../../config/db/builder-knex');

require('./Policy');

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
	},
	policy: function() {
		return this.belongsTo('Policy', 'policyId');
	},
	beneficiary: function() {
		return this.belongsTo('Person', 'beneficiaryId');
	}
});