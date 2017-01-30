var bookshelf = require('../../config/db/builder-knex');

require('./currentItem');

module.exports = bookshelf.model('currentBudget', {
	tableName: 'currentBudget',
	item: function() {
		return this.hasMany('currentItem', 'currentBudgetId');
	},
	count: function(id, cb) {

		bookshelf.knex.from('currentBudget')
		.count('id')
		.where({budgetId: id})
		.then(function(count) {
			cb(null, count);
		})
		.catch(function(err) {
			cb(err);
		}); 
		
	}
});