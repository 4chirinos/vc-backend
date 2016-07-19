var bookshelf = require('../../config/db/builder-knex');

module.exports = bookshelf.model('Status', {
	tableName: 'status'
});