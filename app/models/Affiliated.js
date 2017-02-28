var bookshelf = require('../../config/db/builder-knex');

require('./Budget');
require('./State');
require('./affiliatedPhoneNumber');

module.exports = bookshelf.model('Affiliated', {
	tableName: 'affiliated',
	budget: function() {
		return this.hasMany('Budget', 'affiliatedId');
	},
	state: function() {
		return this.belongsTo('State', 'stateId');
	},
	phones: function() {
		return this.hasMany('affiliatedPhoneNumber', 'affiliatedId');
	}
});