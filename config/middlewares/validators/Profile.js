exports.getAllByProfileValidation = {
	'profile': {
		in: 'params',
		notEmpty: true,
		isAlpha: {
			errorMessage: 'Sólo carácteres alfabéticos'
		}
	}
};

exports.addOrDeleteProfileValidation = {
	'profile': {
		in: 'params',
		notEmpty: true,
		isAlpha: {
			errorMessage: 'Sólo carácteres alfabéticos'
		}
	},
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		}
	}
};