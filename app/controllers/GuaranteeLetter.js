var GuaranteeLetterModel = require('../models/GuaranteeLetter'),
	_ = require('lodash'),
	RequestModel = require('../models/Request'),
	validator = require('./validators/GuaranteeLetter');

module.exports = {

	getAll: function(req, res) {

		GuaranteeLetterModel
		.forge()
		.query(function(qb) {
			if(req.query.code) {
				qb.where({code: req.query.code});
			}
		})
		.fetchAll({
			withRelated: ['status', 'beneficiary', 'budget.affiliated', 'request.status', 'policy.holder', 'policy.owner']
		})
		.then(function(collection) {

			var response = {};
			response.guaranteeLetter = collection;

			var fields = {};

			if(req.userData.user.profile.profile == 'analista') {
				fields.analystId = req.userData.userId;
			} else if(req.userData.user.profile.profile == 'coordinador') {
				fields.coordinatorId = req.userData.userId;
			} else {
				fields.visitorId = req.userData.userId;
			}

			RequestModel.count(fields, function(err, count) {
				if(err) {
					res.sendStatus(500);
					return;
				}
				response.statusGroups = count;
				res.send(response);
			});


		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		GuaranteeLetterModel
		.forge({id: req.params.id})
		.fetch({
			withRelated: ['status', 'beneficiary', 'budget.affiliated', 'request.status', 'policy.holder', 'policy.owner']
		})
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			model = model.toJSON();

			var fields = {};

			if(req.userData.user.profile.profile == 'analista') {
				fields.analystId = req.userData.userId;
			} else if(req.userData.user.profile.profile == 'coordinador') {
				fields.coordinatorId = req.userData.userId;
			} else {
				fields.visitorId = req.userData.userId;
			}

			RequestModel.count(fields, function(err, count) {
				if(err) {
					res.sendStatus(500);
					return;
				}
				model.statusGroups = count;
				res.send(model);
			});

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	}

};