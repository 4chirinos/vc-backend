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
	},
	count: function(fields, cb) {
		bookshelf.knex.from('request')
		.innerJoin('status', 'request.statusId', 'status.id')
		.select(bookshelf.knex.raw('status.status, count(request.*) as cantidad'))
		.where(fields).orWhere({coordinatorId: null})
		.groupBy('status.id')
		.then(function(count) {
			cb(null, count);
		})
		.catch(function(err) {
			cb(err);
		});
	}
});