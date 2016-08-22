var BudgetModel = require('../models/Budget');
var RequestModel = require('../models/Request');
var GuaranteeLetterModel = require('../models/GuaranteeLetter');
var validator = require('./validators/Budget');

var jsreport = require('jsreport');
var ejs = require('ejs');
var fs = require('fs');

var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
  	var date = new Date();
  	var name =  Date.now() + '_' + date.getFullYear() + '_' + file.originalname;

  	if(!req.paths) {
  		req.paths = name + '$';
  	} else {
  		req.paths = req.paths + name + '$';
  	}

  	cb(null, name);

  }
});

module.exports = {

	getById: function(req, res) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		BudgetModel
		.forge({id: req.params.id})
		.fetch({withRelated: [{'item': function(qb) {qb.orderBy('concept')}}, 'affiliated', 'guaranteeLetter']})
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

	},

	deleteDocument: function(req, res, next) {

		req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		BudgetModel
		.forge({id: req.params.id})
		.fetch()
		.then(function(model) {

			//console.log(model.get('paths'));

			if(!model) {
				res.sendStatus(404);
				return;
			}

			model.save({paths: ''})
			.then(function(model) {
				//console.log(model.get('paths'));
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

		BudgetModel
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

	},

	getAll: function(req, res) {

		if(req.query.requestId) {

			RequestModel
			.forge({id: req.query.requestId})
			.fetch({withRelated: ['guaranteeLetter']})
			.then(function(model) {
				if(!model) {
					res.sendStatus(404);
					return;
				}
				model = model.toJSON();
				BudgetModel
				.forge({id: model.guaranteeLetter.budgetId})
				.fetch({withRelated: [{'item': function(qb) {qb.orderBy('concept')}}, 'affiliated', 'guaranteeLetter']})
				.then(function(model) {

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
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			});

		} else {
			res.sendStatus(400);
		}

	},

	getDocumentById: function(req, res) {

		var errors = req.check(validator.getById);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		BudgetModel
		.forge({id: req.params.id})
		.fetch({withRelated: [{'item': function(qb) {qb.orderBy('concept')}}, 'affiliated', 'guaranteeLetter']})
		.then(function(model) {

			if(!model) {
				res.sendStatus(404);
				return;
			}

			var data = model.toJSON();;
			data.lastConcept = '';

			var dd = data.startDate.getDate(),
				mm = data.startDate.getMonth() + 1,
				yyyy = data.startDate.getFullYear();

			if(dd < 10) {
			    dd = '0' + dd;
			} 

			if(mm < 10) {
			    mm = '0' + mm;
			} 

			data.startDate = dd + '/' + mm + '/' + yyyy;

			var compiled = ejs.compile(fs.readFileSync(__dirname + '/documents/budget.ejs', 'utf8'));

			var html = compiled({data: data});

			jsreport.render(html).then(function(out) {

				res.writeHead(200, {
		            'Content-Type': 'application/pdf',
		            'Access-Control-Allow-Origin': '*',
		            'Content-Disposition': 'attachment; filename=presupuesto.' + data.code
		        });

				out.stream.pipe(res);

			}).catch(function(e) {    
			    res.sendStatus(500);
			});

		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});

	}

};