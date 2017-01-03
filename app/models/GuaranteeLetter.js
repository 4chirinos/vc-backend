var bookshelf = require('../../config/db/builder-knex');

require('./Policy');

module.exports = bookshelf.model('GuaranteeLetter', {
	tableName: 'my_guaranteeLetter',
	request: function() {
		return this.hasMany('Request', 'guaranteeLetterId');
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
	},
	state: function() {
		return this.belongsTo('State', 'stateId');
	}
});