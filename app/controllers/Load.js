var _ = require('lodash'),
	fs = require('fs'),
	multer  = require('multer'),
	XLSX = require('xlsx');


module.exports = {

	loadFile: function(req, res) {

		fs.readFile(__dirname + '/../../public/uploads/personas.txt', function(err, f){
		    var array = f.toString().split('\n');
		    console.log(array);
		});

		res.send('ok');

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

	},

	loadImage1: function() {
		var upload = multer({
			dest: './public/uploads'
		});
		return upload.single('file');
	}

};