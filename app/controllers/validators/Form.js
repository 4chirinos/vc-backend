exports.getById = {
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
		errorMessage: 'Parámetro requerido'
	}
};