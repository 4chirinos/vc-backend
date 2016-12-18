var PersonModel = require('../models/Person');


module.exports = {

	getAll: function(req, res) {

		var page = req.query.page || null,
			pageSize = req.query.pageSize || null;

		PersonModel
		.query(function(qb) {
			if(req.query.identityCard) {
				qb.where({'identityCard': req.query.identityCard});
			}
			if(req.query.firstName) {
				qb.where({'firstName': req.query.firstName});
			}
			if(req.query.lastName) {
				qb.where({'lastName': req.query.lastName});
			}
			if(req.query.profileId) {
				qb.where({'profileId': req.query.profileId});
			}
			if(req.query.stateId) {
				qb.where({'stateId': req.query.stateId});
			}
		})
		.fetchPage({
			page: page,
			pageSize: pageSize,
			withRelated: ['profile', 'state']
		})
		.then(function(collection) {

			var response = {};
			response.persons = collection;
			response.pageCount = collection.pagination.pageCount;

			res.send(response);
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	},

	getById: function(req, res) {

		PersonModel
		.forge({id: req.params.id})
		.fetch({withRelated: [
				'profile', 'state',
				{'user': function(qb) {
			    		qb.column('id', 'personId', 'profileId', 'available', 'userName');
			  		}
			  	},
			  	'user.profile'
		  	]
		})
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			model = model.toJSON();

			res.send(model);

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
	}

};