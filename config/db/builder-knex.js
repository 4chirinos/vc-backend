var config = require('./config'),
	knex = require('knex')(config),
	bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = knex;
module.exports = bookshelf;