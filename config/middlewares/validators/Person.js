exports.partialUpdateValidation = {
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		}
	},
	'identityCard': {
		optional: true,
		in: 'body',
		isNumeric: {
			errorMessage: 'Cédula inválida'
		}
	},
	'firstName': {
		optional: true,
		in: 'body',
		isAlpha: {
			errorMessage: 'Nombre inválido'
		}
	},
	'lastName': {
		optional: true,
		in: 'body',
		isAlpha: {
			errorMessage: 'Apellido inválido'
		}
	},
	'email': {
		optional: true,
		in: 'body',
		isEmail: {
			errorMessage: 'Email inválido'
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
	'identityCard': {
		notEmpty: true,
		in: 'body',
		isNumeric: {
			errorMessage: 'Cédula inválida'
		}
	},
	'firstName': {
		notEmpty: true,
		in: 'body',
		isAlpha: {
			errorMessage: 'Nombre inválido'
		}
	},
	'lastName': {
		notEmpty: true,
		in: 'body',
		isAlpha: {
			errorMessage: 'Apellido inválido'
		}
	},
	'email': {
		notEmpty: true,
		in: 'body',
		isEmail: {
			errorMessage: 'Email inválido'
		}
	}
};

exports.createValidation = {
	'identityCard': {
		notEmpty: true,
		in: 'body',
		isNumeric: {
			errorMessage: 'Cédula inválida'
		}
	},
	'firstName': {
		notEmpty: true,
		in: 'body',
		isAlpha: {
			errorMessage: 'Nombre inválido'
		}
	},
	'lastName': {
		notEmpty: true,
		in: 'body',
		isAlpha: {
			errorMessage: 'Apellido inválido'
		}
	},
	'email': {
		notEmpty: true,
		in: 'body',
		isEmail: {
			errorMessage: 'Email inválido'
		}
	}
};