var _ = require('lodash'),
	fs = require('fs'),
	multer  = require('multer'),
	XLSX = require('xlsx'),
	pg = require('pg'),
	async = require("async"),
	PersonModel = require('../models/Person'),
	PersonPhoneModel = require('../models/personPhoneNumber'),
	bookshelf = require('../../config/db/builder-knex'),
	env = process.env.NODE_ENV || 'development';


module.exports = {

	loadFile: function(req, res) {

		/*var path = __dirname + '/../../public/uploads/' + req.file.filename;

		fs.readFile(path, function(err, data) {
		    
		    if(err) throw err;

		    var items = data.toString().split("\n");

		    items.length--;

			async.forEach(items, function(item, callback) {

				item = item.split("|");

				var fields = {
					id: item[0],
					identityCard: item[1],
					firstName: item[2],
					lastName: item[3],
					//email: item[4],
					profileId: item[4],
					birthDate: item[5],
					address: item[6],
					gender: item[7],
					//phoneNumber: item[9],
					stateId: item[8]
				};

				PersonModel
				.forge(fields)
				.save()
				.then(function(model) {
					model = model.toJSON();

					var phones = item[9].split("/");

					var batchs = [];

					for(var i = 0; i < phones.length; i++) {
						batchs.push({
							personId: model.id,
							phoneNumber: phones[i]
						});
					}

					async.forEach(batchs, function(batch, callback1) {

						PersonPhoneModel
						.forge(batch)
						.save()
						.then(function(model) {
							callback1(null);
						})
						.catch(function(err) {
							console.log(err);
							callback1(err);
						});

					}, function(err) {
						callback(err);
					});

				})
				.catch(function(err) {
					console.log(err);
					callback(err);
				});

		    }, function(err) {

		        if (err) {
		        	console.log(err);
		        	res.sendStatus(500);
		        	return;
		        }

		        res.send('ok');

		    });
		});*/


		var client;

		if(env == 'development') {
			client = new pg.Client({
				user: 'postgres', //env var: PGUSER
				database: 'visitadorclinico_development', //env var: PGDATABASE
				password: 'postgres', //env var: PGPASSWORD
				host: 'localhost', // Server hosting the postgres database
				port: 5432, //env var: PGPORT
				max: 1, // max number of clients in the pool
				idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
			});
		} else {
			client = new pg.Client(process.env.DATABASE_URL);
		}

		client.connect(function (err) {
			
			if (err) throw err;

			var tableId = req.params.table, table;

			if(tableId == 2) table = 'person';
			else if(tableId == 3) table = 'guaranteeLetter';
			else if(tableId == 4) table = 'budget';
			else if(tableId == 5) table = 'item';
			else if(tableId == 6) table = 'policy';
			else if(tableId == 7) table = 'affiliated';
			else if(tableId == 8) table = 'personPhoneNumber';
			else if(tableId == 9) table = 'personEmail';
			else if(tableId == 10) table = 'affiliatedPhoneNumber';
			else if(tableId == 11) table = 'affiliatedEmail';

			var path = __dirname + '/../../public/uploads/' + req.file.filename;

			client.query('COPY \"' + table + '\" FROM \'' + path + '\' (DELIMITER(\'|\'));', function(err, result) {
				if(err) {
					console.log(err);
					res.sendStatus(500);
					return;
				}
				res.send('ok');
			});
		  	
		});

	},

	loadImage1: function() {
		var upload = multer({
			dest: './public/uploads'
		});
		return upload.single('file');
	}

};



/*if(fs.existsSync(__dirname + '/../../public/uploads/' + req.file.filename)) {

			var workbook = XLSX.readFile(__dirname + '/../../public/uploads/' + req.file.filename);

			var first_sheet_name = workbook.SheetNames[0];
			var address_of_cell = 'B2';
			var worksheet = workbook.Sheets[first_sheet_name];
			var desired_cell = worksheet[address_of_cell];
			var desired_value = desired_cell.v;

			var range = {
				s: {c: 0, r: 2},
				e: {c: 1, r: 6}
			}

			for(var R = range.s.r; R <= range.e.r; ++R) {
				for(var C = range.s.c; C <= range.e.c; ++C) {
			    	var cell_address = {c: C, r: R};
			    	console.log(cell_address);
			  	}
			}
  			
  			res.download(__dirname + '/../../public/uploads/' + req.file.filename);

  			//console.log('hola');

		} else {
			res.sendStatus(404);
		}*/