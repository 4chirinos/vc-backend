var bookshelf = require('../../config/db/builder-knex');

require('./Question');

module.exports = bookshelf.model('Form', {
	tableName: 'form',
	question: function() {
		return this.hasMany('Question', 'formId');
	},
});