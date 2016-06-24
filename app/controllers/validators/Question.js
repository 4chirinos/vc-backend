exports.create = {
	'question': { //
		in: 'body', 
		notEmpty: true, 
	    isLength: {
	      options: [{ min: 15, max: undefined }],
	      errorMessage: 'La pregunta debe ser mayor a 15 carácteres'  
	    },
	    errorMessage: 'Campo requerido'
	 }
};

exports.update = {
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
		errorMessage: 'Parámetro requerido'
	},
	'question': { //
		in: 'body', 
		notEmpty: true, 
	    isLength: {
	      options: [{ min: 15, max: undefined }],
	      errorMessage: 'La pregunta debe ser mayor a 15 carácteres'  
	    },
	    errorMessage: 'Campo requerido'
	 },
	 'available': {
		in: 'body',
		notEmpty: true,
		isBoolean: {
			errorMessage: 'Available tiene valor inválido'
		},
		errorMessage: 'Campo requerido'
	}
};

exports.partialUpdate = {
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
		errorMessage: 'Parámetro requerido'
	},
	'question': { //
		in: 'body', 
		optional: true,
	    isLength: {
	      options: [{ min: 15, max: undefined }],
	      errorMessage: 'La pregunta debe ser mayor a 15 carácteres' 
	    }
	 },
	 'available': {
		optional: true,
		in: 'body',
		isBoolean: {
			errorMessage: 'Available tiene valor inválido'
		}
	}
};