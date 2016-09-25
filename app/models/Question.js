var bookshelf = require('../../config/db/builder-knex');

module.exports = bookshelf.model('Question', {
	tableName: 'question'
});