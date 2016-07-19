exports.validUser = {
	'identityCard': {
		in: 'body',
		notEmpty: true,
		isNumeric: {
			errorMessage: 'Cédula inválida'
		},
		errorMessage: 'Campo requerido'
	},
	'password': {
		in: 'body',
		notEmpty: true,
		isAlphanumeric: {
			errorMessage: 'Password inválido. Sólo carácteres alfanuméricos'
		},
		isLength: {
	      options: [{ min: 6, max: undefined }],
	      errorMessage: 'La contraseña debe ser mayor a 6 carácteres'  
	    },
	    errorMessage: 'Campo requerido'
	}
};

exports.validSession = {
	'access_token': {
		notEmpty: true,
		errorMessage: 'Header requerido'
	}
};