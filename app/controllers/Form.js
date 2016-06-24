var models = require('../models'),
	_ = require('lodash');


module.exports = {

	addAnswer: function(req, res) {

		var admittedFields = [
			'formId', 'questionId', 'answer'
		];

		var fields = _.pick(req.body, admittedFields);
		
		fields = _.mapValues(fields, stringToLowerCase);

		models.Form.insert(fields, function(err, answer) {

			if(err) {
				res.sendStatus(500);
			} else {
				res.send(answer);
			}

		});

	},

	partialUpdate: function(req, res) {

		var admittedFields = [
			'answer'
		];

		var fields = _.pick(req.body, admittedFields);
		
		fields = _.mapValues(fields, stringToLowerCase);

		var whereFields = {
			formId: req.params.form,
			questionId: req.params.question
		};

		models.Form.update(fields, whereFields, function(err, answer) {

			if(err) {
				res.sendStatus(500);
			} else {
				res.send(answer);
			}

		});

	}

};

var stringToLowerCase = function(key) {
	if(_.isString(key)) 
		return key.toLowerCase();
	return key;
};


/*module.exports = {

	addQuestion: function(req, res) {

		var whereFields = {
			form: req.params.form.toLowerCase(),
			assigned: false
		};

		models.Form.getFormByFields(whereFields, function(err, forms) {

			if(err) {
				res.sendStatus(500);
				return;
			}

			if(!forms) {
				res.sendStatus(404);
				return;
			}

			var whereFields = {
				questionId: req.params.question,
				formId: req.params.form
			};

			models.Form.getQuestionsBy(whereFields, function(err, questions) {

				if(err) { 
					res.sendStatus(500);
					return;
				}

				if(!questions.length) {

					var record = {
						formId: forms[0].id,
						questionId: 
					};

					models.Profile.addProfileToUser(record, function(err) {
						if(err) res.sendStatus(500);
						res.sendStatus(200);
					});

				} else {
					res.sendStatus(200);
				}

			});

		});

	},

	deleteProfile: function(req, res) {

		var whereFields = {
			profile: req.params.profile.toLowerCase()
		};

		models.Profile.getUserProfileByFields(whereFields, function(err, profile) {

			if(err) res.sendStatus(500);

			var whereFields = {
				id: req.params.id,
				profileId: profile.id
			};

			models.Profile.deleteProfilesOfUserByFields(whereFields, function(err) {
				if(err) res.sendStatus(500);
				res.sendStatus(200);
			});

		});

	}

};*/