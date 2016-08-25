var bookshelf = require('../../config/db/builder-knex');


module.exports = bookshelf.model('budgetImage', {
	tableName: 'budgetImage'
});