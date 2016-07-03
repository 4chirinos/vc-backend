exports.getByType = {
	'type': {
		in: 'params',
		notEmpty: true,
		isAlpha: {
			errorMessage: 'Sólo carácteres alfabéticos'
		},
		errorMessage: 'Parámetro requerido'
	}
};