var bookshelf = require('../../config/db/builder-knex');

require('./User');
require('./Status');
require('./GuaranteeLetter');
require('./Form');
require('./Answer');

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
	form: function() {
		return this.belongsTo('Form', 'formId');
	},
	answer: function() {
		return this.hasMany('Answer', 'requestId');
	},
	budgetImage: function() {
		return this.hasMany('budgetImage', 'requestId');
	},
	formImage: function() {
		return this.hasMany('formImage', 'requestId');
	},
	comments: function() {
		return this.hasMany('Comment', 'requestId');
	},
	count: function(fields, cb) {

		if(fields.role == 'analyst') {
			bookshelf.knex.from('request')
			.innerJoin('status', 'request.statusId', 'status.id')
			.innerJoin('guaranteeLetter', 'guaranteeLetter.id', 'request.guaranteeLetterId')
			.select(bookshelf.knex.raw('status.status, count(request.*) as cantidad'))
			.where({analystId: fields.id})//.orWhere({coordinatorId: null, analystId: fields.id, stateId: fields.stateId})
			.groupBy('status.id')
			.then(function(count) {
				cb(null, count);
			})
			.catch(function(err) {
				cb(err);
			});
		} else if(fields.role == 'coordinator') {
			bookshelf.knex.from('request')
			.innerJoin('status', 'request.statusId', 'status.id')
			.innerJoin('guaranteeLetter', 'guaranteeLetter.id', 'request.guaranteeLetterId')
			.innerJoin('budget', 'budget.id', 'guaranteeLetter.budgetId')
			.innerJoin('affiliated', 'affiliated.id', 'budget.affiliatedId')
			.select(bookshelf.knex.raw('status.status, count(request.*) as cantidad'))
			.where('request.coordinatorId', fields.id).orWhere('request.coordinatorId', null).andWhere('affiliated.stateId', fields.stateId)
			//.where({coordinatorId: fields.id}).orWhere({coordinatorId: null, stateId: fields.stateId})
			.groupBy('status.id')
			.then(function(count) {
				cb(null, count);
			})
			.catch(function(err) {
				cb(err);
			});
		} else {
			bookshelf.knex.from('request')
			.innerJoin('status', 'request.statusId', 'status.id')
			.innerJoin('guaranteeLetter', 'guaranteeLetter.id', 'request.guaranteeLetterId')
			.select(bookshelf.knex.raw('status.status, count(request.*) as cantidad'))
			.where({visitorId: fields.id})
			.groupBy('status.id')
			.then(function(count) {
				cb(null, count);
			})
			.catch(function(err) {
				cb(err);
			});
		}
		
	}
});