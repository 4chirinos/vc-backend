var bookshelf = require('../../config/db/builder-knex');

module.exports = bookshelf.model('State', {
	tableName: 'state'
});