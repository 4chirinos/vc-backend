var bookshelf = require('../../config/db/builder-knex');


module.exports = bookshelf.model('Answer', {
	tableName: 'answer',
	countAnswers: function(requestId, cb) {

		bookshelf.knex.from('answer')
		.select(bookshelf.knex.raw('count(answer.id) as cantidad'))
		.where({requestId: requestId})
		.groupBy('answer.id')
		.then(function(count) {
			cb(null, count);
		})
		.catch(function(err) {
			cb(err);
		});
		
	},
});