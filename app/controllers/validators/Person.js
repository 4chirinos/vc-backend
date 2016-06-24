exports.partialUpdate = {
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
		errorMessage: 'Parámetro requerido'
	},
	'identityCard': {
		in: 'body',
		optional: true,
		isNumeric: {
			errorMessage: 'Cédula inválida'
		}
	},
	'firstName': {
		in: 'body',
		optional: true,
		isAlpha: {
			errorMessage: 'Nombre inválido'
		}
	},
	'lastName': {
		in: 'body',
		optional: true,
		isAlpha: {
			errorMessage: 'Apellido inválido'
		}
	},
	'email': {
		in: 'body',
		optional: true,
		isEmail: {
			errorMessage: 'Email inválido'
		}
	}
};

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

exports.update = {
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
		errorMessage: 'Parámetro requerido'
	},
	'identityCard': {
		in: 'body',
		notEmpty: true,
		isNumeric: {
			errorMessage: 'Cédula inválida'
		},
		errorMessage: 'Campo requerido'
	},
	'firstName': {
		in: 'body',
		notEmpty: true,
		isAlpha: {
			errorMessage: 'Nombre inválido'
		},
		errorMessage: 'Campo requerido'
	},
	'lastName': {
		in: 'body',
		notEmpty: true,
		isAlpha: {
			errorMessage: 'Apellido inválido'
		},
		errorMessage: 'Campo requerido'
	},
	'email': {
		in: 'body',
		notEmpty: true,
		isEmail: {
			errorMessage: 'Email inválido'
		},
		errorMessage: 'Campo requerido'
	}
};

exports.create = {
	'identityCard': {
		in: 'body',
		notEmpty: true,
		isNumeric: {
			errorMessage: 'Cédula inválida'
		},
		errorMessage: 'Campo requerido'
	},
	'firstName': {
		in: 'body',
		notEmpty: true,
		isAlpha: {
			errorMessage: 'Nombre inválido'
		},
		errorMessage: 'Campo requerido'
	},
	'lastName': {
		in: 'body',
		notEmpty: true,
		isAlpha: {
			errorMessage: 'Apellido inválido'
		},
		errorMessage: 'Campo requerido'
	},
	'email': {
		in: 'body',
		notEmpty: true,
		isEmail: {
			errorMessage: 'Email inválido'
		},
		errorMessage: 'Campo requerido'
	}
};