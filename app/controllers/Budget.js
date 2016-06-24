var models = require('../models'),
	_ = require('lodash'),
	validator = require('./validators/Budget');

module.exports = {

	getByPersonId: function(req, res) {

		req.check(validator.getByPersonId);

		var errors = req.validationErrors();

		if(errors) {

			res.status(400).send(errors);

		} else {

			var whereFields = {
				personId: req.params.id,
				assigned: false
			};

			models.Budget.getBy(whereFields, function(err, budgets) {
				
				if(err)
					res.sendStatus(500);
				else {

					if(budgets.length) {
					
						var whereFields = {
							budgetId: budgets[0].id
						};

						models.Item.getBy(whereFields, function(err, items) {

							if(err)
								res.sendStatus(500);
							else {

								budgets[0].items = items;
								res.send(budgets[0]);

							}

						});

					} else {

						res.status(404).send('El asegurado no tiene presupuesto asociado');

					}
				}

			});

		}

	}

};