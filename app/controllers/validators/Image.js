exports.getByName = {
	'name': {
		in: 'params',
		notEmpty: true,
		isAlpha: {
			errorMessage: 'Sólo carácteres alfabéticos'
		},
		errorMessage: 'Parámetro requerido'
	}
};