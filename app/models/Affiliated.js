var bookshelf = require('../../config/db/builder-knex');

require('./Budget');
require('./State');

module.exports = bookshelf.model('Affiliated', {
	tableName: 'my_affiliated',
	budget: function() {
		return this.hasMany('Budget', 'affiliatedId');
	},
	state: function() {
		return this.belongsTo('State', 'stateId');
	}
});