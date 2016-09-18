exports.create = {
	'requestId': { //
		in: 'body', 
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
	    errorMessage: 'Campo requerido'
	 },
	 'comment': { //
		in: 'body', 
		notEmpty: true, 
	    errorMessage: 'Campo requerido'
	 }
};