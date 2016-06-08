var knex = require('../../config/db/builder-knex');
var bcrypt = require('bcrypt-nodejs');

module.exports = {

	comparePassword: function(candidatePassword, password, next) {

		bcrypt.compare(candidatePassword, password, function(err, match) {
			if(err) next(err);
			next(null, match);
		});

	}

};