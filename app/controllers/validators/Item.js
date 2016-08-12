exports.partialUpdate = {
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
		errorMessage: 'Parámetro requerido'
	},
	'description': { //
		in: 'body', 
		optional: true, 
	    isLength: {
	      options: [{ min: 7, max: undefined }],
	      errorMessage: 'Debe ser mayor a 15 carácteres'
	    }
	 },
	'quantity': {
		in: 'body',
		optional: true,
		isInt: {
			errorMessage: 'Debe ser entero'
		}
	},
	'cost': {
		in: 'body',
		optional: true,
		isFloat: {
			errorMessage: 'Debe ser numérico'
		}
	}
};