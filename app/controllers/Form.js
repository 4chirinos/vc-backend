var FormModel = require('../models/Form');
var RequestModel = require('../models/Request');
var validator = require('./validators/Form');

module.exports = {

	getAll: function(req, res) {

		if(req.query.requestId) {

			RequestModel
			.forge({id: req.query.requestId})
			.fetch({
				withRelated: ['form']
			})
			.then(function(model) {
				if(!model) {
					res.sendStatus(404);
					return;
				}
				model = model.toJSON();
				res.send(model.form);
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});

		} else {
			res.sendStatus(400);
		}

	},

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		FormModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			res.send(model);

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
	}
};