var config = require('./config'),
	knex = require('knex')(config);

module.exports = knex;