var bookshelf = require('../../config/db/builder-knex');

require('./Item');
require('./Affiliated');
require('./currentBudget');

module.exports = bookshelf.model('Budget', {
	tableName: 'budget',
	item: function() {
		return this.hasMany('Item', 'budgetId', 'version');
	},
	affiliated: function() {
		return this.belongsTo('Affiliated', 'affiliatedId');
	},
	guaranteeLetter: function() {
		return this.hasOne('GuaranteeLetter', 'budgetId');
	},
	currentBudget: function() {
		return this.hasMany('currentBudget', 'budgetId');
	},
	count: function(id, cb) {

		bookshelf.knex.from('budget')
		.count('id')
		//.where({id: id})
		.whereRaw('id = ? AND version != ?', [id, 1])
		.then(function(count) {
			cb(null, count);
		})
		.catch(function(err) {
			cb(err);
		}); 
		
	}
});