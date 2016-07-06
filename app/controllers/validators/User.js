exports.partialUpdate = {
	'id': {
		in: 'params',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
		errorMessage: 'Parámetro requerido'
	},
	'password': {
		in: 'body',
		optional: true,
		isAlphanumeric: {
			errorMessage: 'Password inválido'
		},
		isLength: {
	      options: [{ min: 6, max: undefined }],
	      errorMessage: 'La contraseña debe ser mayor a 6 carácteres'  
	    }
	},
	'profileId': {
		in: 'body',
		optional: true,
		isInt: {
			errorMessage: 'id inválido'
		}
	},
	'available': {
		in: 'body',
		optional: true,
		isBoolean: {
			errorMessage: 'Available tiene valor inválido'
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
	'profileId': {
		in: 'body',
		notEmpty: true,
		isInt: {
			errorMessage: 'id inválido'
		},
		errorMessage: 'Campo requerido'
	},
	'password': {
		in: 'body',
		notEmpty: true,
		isAlphanumeric: {
			errorMessage: 'Password inválido'
		},
		isLength: {
	      options: [{ min: 6, max: undefined }],
	      errorMessage: 'La contraseña debe ser mayor a 6 carácteres'  
	    },
		errorMessage: 'Campo requerido'
	},
	'available': {
		in: 'body',
		notEmpty: true,
		isBoolean: {
			errorMessage: 'Available tiene valor inválido'
		},
		errorMessage: 'Campo requerido'
	}
};

exports.create = {
	'personId': {
		in: 'body',
		notEmpty: true,
		isNumeric: {
			errorMessage: 'personId inválido'
		},
		errorMessage: 'Parámetro requerido'
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

