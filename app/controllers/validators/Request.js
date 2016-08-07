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

exports.getById = {
	'id': { //
		in: 'params', 
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
	    errorMessage: 'Campo requerido'
	 }
};

exports.partialUpdate = {
	'id': { //
		in: 'params', 
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
	    errorMessage: 'Campo requerido'
	 },
	'statusId': { //
		in: 'body', 
		optional: true,
		isInt: {
			errorMessage: 'statusId inválido'
		},
	    errorMessage: 'Campo requerido'
	 },
	 'visitorId': { //
		in: 'body', 
		optional: true,
		isInt: {
			errorMessage: 'id inválido'
		},
	    errorMessage: 'Campo requerido'
	 },
	 'endDate': { //
		in: 'body', 
		optional: true,
		isDate: {
			errorMessage: 'fecha inválida'
		},
	    errorMessage: 'Campo requerido'
	 },
};
