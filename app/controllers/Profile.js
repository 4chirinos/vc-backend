var models = require('../models'),
	_ = require('lodash');

module.exports = {

	getAllByType: function(req, res) {

		var profile = req.params.profile.toLowerCase();

		if(profile == 'user') {

			models.Profile.getUserProfiles(function(err, profiles) {
				if(err) res.sendStatus(500);
				res.send(profiles);
			});

		} else if(profile == 'person') {

			models.Profile.getPersonProfiles(function(err, profiles) {
				if(err) res.sendStatus(500);
				res.send(profiles);
			});

		} else {

			res.sendStatus(404);

		}

	},

	addProfile: function(req, res) {

		var whereFields = {
			profile: req.params.profile.toLowerCase()
		};

		models.Profile.getUserProfileByFields(whereFields, function(err, profile) {

			var whereFields = {
				id: req.params.id,
				profileId: profile.id
			};

			models.Profile.getProfilesOfUserByFields(whereFields, function(err, records) {

				if(!records.length) {

					if(err) res.sendStatus(500);

					if(profile) {

						var record = {
							id: req.params.id,
							profileId: profile.id
						};

						models.Profile.addProfileToUser(record, function(err) {
							if(err) res.sendStatus(500);
							res.sendStatus(200);
						});

					} else {
						res.sendStatus(404);
					}

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

};