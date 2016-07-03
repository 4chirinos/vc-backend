var express = require('express'),
	router = express.Router(),
	controllers = require('../app/controllers');


/* ############################################ PERSONAS ####################################### */

router.route('/person')
	.get(controllers.Person.getAll)
	/*.post(controllers.Person.create);

router.route('/person/:id')
	.get(controllers.Person.getById)
	.put(controllers.Person.update)
	.patch(controllers.Person.partialUpdate);*/

/* ############################################################################################# */






/* ############################################ USUARIOS ####################################### */

router.route('/user')
	.get(controllers.User.getAll)
	.post(controllers.User.create);

router.route('/user/:id')
	.get(controllers.User.getById)
	.put(controllers.User.update)
	.patch(controllers.User.partialUpdate);
	//.delete ¿deshabilitar usuario?

/* ############################################################################################## */






/* #################################### PERFILES y STATUS #################################### */

router.route('/profile/type/:type')
	.get(controllers.Profile.getByType);

router.route('/status/type/:type')
	.get(controllers.Status.getByType);


/* ########################################################################################### */



/* #################### PRESUPUESTOS Y CARTAS AVALES ############################### */

router.route('/item/:id')
	.patch(controllers.Item.partialUpdate);


router.route('/guaranteeLetter/:id')
	.get(controllers.GuaranteeLetter.getById);


/* ######################################################################################### */




/* ################################### MANEJO DE PREGUNTAS ############################### */

router.route('/question')
	.get(controllers.Question.getAll)
	.post(controllers.Question.create);

router.route('/question/:id')
	.put(controllers.Question.update)
	.patch(controllers.Question.partialUpdate);

/* ######################################################################################### */




router.route('/answer')
	.post(controllers.Answer.create);

router.route('/answer/:id')
	.put(controllers.Answer.update);



module.exports = router;