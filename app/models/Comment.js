var bookshelf = require('../../config/db/builder-knex');

module.exports = bookshelf.model('Comment', {
	tableName: 'comment',
	commenter: function() {
		return this.belongsTo('User', 'commenterId');
	}
});