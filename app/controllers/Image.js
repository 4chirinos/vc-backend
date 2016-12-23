var validator = require('./validators/Form');

var fs = require('fs');


module.exports = {


	getImageByName: function(req, res) {

		req.check(validator.getByName);

		var errors = req.validationErrors();

		if(errors) {
			res.status(400).send(errors);
			return;
		}

		if(fs.existsSync(__dirname + '/../../public/uploads/' + req.params.name)) {

			//var filestream = fs.createReadStream(__dirname + '/../../public/uploads/' + req.params.name);
			//res.sendFile(req.params.name, {root: __dirname + '/../../public/uploads'});
  			
  			res.download(__dirname + '/../../public/uploads/' + req.params.name);

  			//console.log('hola');

		} else {
			res.sendStatus(404);
		}

	}

};