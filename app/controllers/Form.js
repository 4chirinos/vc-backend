var FormModel = require('../models/Form');
var RequestModel = require('../models/Request');
var validator = require('./validators/Form');

var fs = require('fs');

var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
  	var date = new Date();
  	var name =  Date.now() + '_' + date.getFullYear() + '_' + file.originalname;

  	console.log(date);

  	if(!req.paths) {
  		req.paths = name + '$';
  	} else {
  		req.paths = req.paths + name + '$';
  	}

  	cb(null, name);

  }
});

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
	},

	deleteDocument: function(req, res, next) {

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

			model.save({paths: ''})
			.then(function(model) {
				next();
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

	loadImage: function() {

		var upload = multer({
			storage: storage,
			limits: {
				fileSize: 2099734
			} 
		});

		return upload.array('file');

	},

	getImageByName: function(req, res) {

		if(fs.existsSync(__dirname + '/../../public/uploads/' + req.params.name)) {
			res.sendFile(req.params.name, {root: __dirname + '/../../public/uploads'});
		} else {
			res.sendStatus(404);
		}

	},

	returnImageLoaded: function(req, res) {

		FormModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			model.save({paths: req.paths})
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