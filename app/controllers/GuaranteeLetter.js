var models = require('../models'),
	_ = require('lodash'),
	validator = require('./validators/GuaranteeLetter');

module.exports = {

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var result = {};

			models.GuaranteeLetter.getBy({id: req.params.id}, function(err, letters) {

				if(err) {
					res.sendStatus(500);
					return;
				}

				models.Status.getBy({id: letters[0].statusId}, function(err, status) {

					if(err) {
						res.sendStatus(500);
						return;
					}

					models.Person.getBy({id: letters[0].ownerId}, function(err, owners) {

						if(err) {
							res.sendStatus(500);
							return;
						}

						models.Person.getBy({id: letters[0].beneficiaryId}, function(err, beneficiaries) {

							if(err) {
								res.sendStatus(500);
								return;
							}

							models.Budget.getBy({id: letters[0].budgetId}, function(err, budgets) {

								if(err) {
									res.sendStatus(500);
									return;
								}

								models.Affiliated.getBy({id: budgets[0].affiliatedId}, function(err, affiliated) {

									if(err) {
										res.sendStatus(500);
										return;
									}

									models.Item.getBy({budgetId: letters[0].budgetId}, function(err, items) {

										if(err) {
											res.sendStatus(500);
											return;
										}

										result.id = letters[0].id;
										result.status = status[0];
										result.owner = owners[0];
										result.beneficiary = beneficiaries[0];
										result.budget = items;
										result.affiliated = affiliated[0];

										res.send(result);

									});

								});

							});

						});

					});

				});
			
			});

		}

	}

};