exports.partialUpdateValidation = {
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		}
	},
	'password': {
		optional: true,
		in: 'body',
		isAlphanumeric: {
			errorMessage: 'Password inválido'
		}
	},
	'available': {
		optional: true,
		in: 'body',
		isBoolean: {
			errorMessage: 'Available tiene valor inválido'
		}
	}
};

exports.getByIdValidation = {
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		}
	}
};

exports.updateValidation = {
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		}
	},
	'password': {
		notEmpty: true,
		in: 'body',
		isAlphanumeric: {
			errorMessage: 'Password inválido'
		}
	},
	'available': {
		notEmpty: true,
		in: 'body',
		isBoolean: {
			errorMessage: 'Available tiene valor inválido'
		}
	}
};

exports.createValidation = {
	'personId': {
		notEmpty: true,
		in: 'body',
		isNumeric: {
			errorMessage: 'personId inválido'
		}
	},
	'password': {
		notEmpty: true,
		in: 'body',
		isAlphanumeric: {
			errorMessage: 'Password inválido. Sólo carácteres alfanuméricos'
		}
	}
};

