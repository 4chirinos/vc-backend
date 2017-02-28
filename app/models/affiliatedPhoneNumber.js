var bookshelf = require('../../config/db/builder-knex');


module.exports = bookshelf.model('affiliatedPhoneNumber', {
	tableName: 'affiliatedPhoneNumber'
});