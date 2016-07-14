var bookshelf = require('../../config/db/builder-knex');

require('./User');
require('./Status');
require('./GuaranteeLetter');

module.exports = bookshelf.model('Request', {
	tableName: 'request',
	coordinator: function() {
		return this.belongsTo('User', 'coordinatorId');
	},
	visitor: function() {
		return this.belongsTo('User', 'visitorId');
	},
	analyst: function() {
		return this.belongsTo('User', 'analystId');
	},
	status: function() {
		return this.belongsTo('Status', 'statusId');
	},
	guaranteeLetter: function() {
		return this.belongsTo('GuaranteeLetter', 'guaranteeLetterId');
	}
});