var _ = require('lodash'),
	validator = require('./validators/Comment');
	CommentModel = require('../models/Comment');

module.exports = {

	create: function(req, res) {

		req.check(validator.create);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		var bodyFields = [
			'requestId', 'comment'
		];

		var fields = _.pick(req.body, bodyFields);

		fields.commenterId = req.userData.userId;

		CommentModel
		.forge(fields)
		.save()
		.then(function(model) {
			res.send(model.toJSON());
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	}

};