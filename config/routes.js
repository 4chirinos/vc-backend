var express = require('express'),
	router = express.Router(),
	middlewares = require('./middlewares'),
	controllers = require('../app/controllers');


/* ############################################ PERSONAS ####################################### */

router.route('/person')
	.get(controllers.Person.getAll)
	.post(middlewares.Person.beforeCreate, controllers.Person.create);

router.route('/person/:id')
	.get(middlewares.Person.beforeGetById, controllers.Person.getById)
	.put(middlewares.Person.beforeUpdate, controllers.Person.update)
	.patch(middlewares.Person.beforePartialUpdate, controllers.Person.partialUpdate);

/* ############################################################################################# */






/* ############################################ USUARIOS ####################################### */

router.route('/user')
	.get(controllers.User.getAll)
	.post(middlewares.User.beforeCreate, controllers.User.create);

router.route('/user/:id')
	.get(middlewares.User.beforeGetById, controllers.User.getById)
	.put(middlewares.User.beforeUpdate, controllers.User.update)
	.patch(middlewares.User.beforePartialUpdate, controllers.User.partialUpdate);
	//.delete ¿?

/* ############################################################################################## */






/* #################################### PERFILES #################################### */

router.route('/profile/:profile')
	.get(middlewares.Profile.beforeGetAllByProfile, controllers.Profile.getAllByType);


/* ################################################################################### */






/* #################################### PERFILES DE USUARIO #################################### */

router.route('/profile/:profile/:id')
	.post(middlewares.Profile.beforeAddOrDeleteProfile, controllers.Profile.addProfile)
	.delete(middlewares.Profile.beforeAddOrDeleteProfile, controllers.Profile.deleteProfile);


/* ############################################################################################# */



module.exports = router;