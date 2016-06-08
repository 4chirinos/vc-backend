var express = require('express'),
	router = express.Router(),
	middlewares = require('./middlewares'),
	controllers = require('../app/controllers');

router.route('/person')
	.get(controllers.Person.getAll)
	.post(middlewares.Person.beforeCreate, controllers.Person.create);

router.route('/person/:id')
	.put(middlewares.Person.beforeUpdate, controllers.Person.update)
	.patch(middlewares.Person.beforePartialUpdate, controllers.Person.partialUpdate);


module.exports = router;