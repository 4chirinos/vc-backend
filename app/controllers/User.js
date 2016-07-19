var _ = require('lodash'),
	UserModel = require('../models/User'),
	validator = require('./validators/User');

module.exports = {

	create: function(req, res) {

		req.check(validator.create);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		var bodyFields = [
			'personId', 'password', 'profileId'
		];

		var fields = _.pick(req.body, bodyFields);

		UserModel
		.forge(fields)
		.save()
		.then(function(model) {
			if(model) {
				res.send(model.toJSON());
			} else {
				res.sendStatus(404);
			}
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

		UserModel
		.forge({id: req.params.id})
		.fetch({withRelated: ['person']})
		.then(function(model) {
			if(model) {
				res.send(model.toJSON());
			} else {
				res.sendStatus(404);
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getAll: function(req, res) {

		UserModel
		.forge()
		.fetchAll({
			columns: ['id', 'personId', 'profileId', 'available'],
			withRelated: ['profile']})
		.then(function(collection) {
			if(collection.toJSON().length) {
				console.log(collection.toJSON()[0].password);
				delete collection.toJSON()[0].password;
				res.send(collection.toJSON());
			} else {
				res.sendStatus(404);
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	update: function(req, res) {

		req.check(validator.update);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		var bodyFields = [
			'password', 'available', 'profileId'
		];

		var fields = _.pick(req.body, bodyFields);

		UserModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {
			if(!model) {
				res.sendStatus(404);
				return;
			}
			model.save(fields)
			.then(function(model) {
				res.send(model.toJSON());
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	partialUpdate: function(req, res) {

		req.check(validator.partialUpdate);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		var bodyFields = [
			'password', 'available', 'profileId'
		];

		var fields = _.pick(req.body, bodyFields);

		UserModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {
			if(!model) {
				res.sendStatus(404);
				return;
			}
			model.save(fields)
			.then(function(model) {
				res.send(model.toJSON());
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	}

};