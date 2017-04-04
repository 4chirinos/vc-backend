var bookshelf = require('../../config/db/builder-knex');

module.exports = bookshelf.model('affiliatedEmail', {
	tableName: 'affiliatedEmail'
});