var bookshelf = require('../../config/db/builder-knex');

module.exports = bookshelf.model('requestForm', {
	tableName: 'requestForm',
	countRequestId: function(id, cb) {
		bookshelf.knex.from('requestForm')
		.count('id')
		.where({requestId: id})
		.then(function(count) {
			cb(null, count);
		})
		.catch(function(err) {
			cb(err);
		}); 
	}
});