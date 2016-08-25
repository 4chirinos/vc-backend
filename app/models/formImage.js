var bookshelf = require('../../config/db/builder-knex');


module.exports = bookshelf.model('formImage', {
	tableName: 'formImage'
});