exports.create = {
	'guaranteeLetterId': { //
		in: 'body', 
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
	    errorMessage: 'Campo requerido'
	 },
	 'analystId': { //
		in: 'body', 
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
	    errorMessage: 'Campo requerido'
	 }
};