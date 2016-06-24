exports.create = {
	'formId': {
		in: 'body',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
		errorMessage: 'Campo requerido'
	},
	'questionId': {
		in: 'body',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
		errorMessage: 'Campo requerido'
	},
	'answer': { //
		in: 'body', 
		notEmpty: true, 
	    isInt: {
			errorMessage: 'Respuesta inválida'
		},
		matches: {
			options: ['example', 'i'],
			errorMessage: 'La respuesta debe ser 1,2,3,4 o 5'
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
	'answer': { //
		in: 'body', 
		notEmpty: true, 
	    isInt: {
			errorMessage: 'Respuesta inválida'
		},
		matches: {
			options: ['example', 'i'],
			errorMessage: 'La respuesta debe ser 1,2,3,4 o 5'
	    },
	    errorMessage: 'Campo requerido'
	 }
};