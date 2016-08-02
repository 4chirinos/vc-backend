var bookshelf = require('../../config/db/builder-knex');

module.exports = bookshelf.model('Policy', {
	tableName: 'policy',
	holder: function() {
		return this.belongsTo('Person', 'holderId');
	},
	owner: function() {
		return this.belongsTo('Person', 'ownerId');
	}
});