var bookshelf = require('../../config/db/builder-knex');

module.exports = bookshelf.model('GuaranteeLetter', {
	tableName: 'GuaranteeLetter',
	request: function() {
		return this.hasOne('Request', 'guaranteeLetterId');
	}
});