var express = require('express'),
	router = express.Router(),
	Session = require('../app/controllers/Session'),
	Person = require('../app/controllers/Person'),
	Request = require('../app/controllers/Request'),
	User = require('../app/controllers/User');


/* ############################################# ME ########################################## */

/*router.route('/me/user')
	.get(controllers.Session.validSession, controllers.User.getMyUser);

router.route('/me/request')
	.get(controllers.Session.validSession, controllers.Request.getMyRequest);*/


/* ############################################ PERSONAS ####################################### */

router.route('/person')
	.get(Person.getAll);

/* ############################################################################################# */






/* ############################################ USUARIOS ####################################### */

router.route('/user')
	.get(User.getAll)
	.post(User.create);


router.route('/user/:id')
	.get(User.getById)
	.put(User.update)
	.patch(User.partialUpdate);
	//.delete ¿deshabilitar usuario?

/* ############################################################################################## */




/* #################################### SESSIONS #################################### */

router.route('/session')
	.post(Session.validUser, Session.create)
	.delete(Session.validSession, Session.delete);


/* ########################################################################################### */




/* #################################### PERFILES y STATUS #################################### */

/*router.route('/profile/type/:type')
	.get(controllers.Profile.getByType);

router.route('/status/type/:type')
	.get(controllers.Status.getByType);*/


/* ########################################################################################### */



/* #################### PRESUPUESTOS Y CARTAS AVALES ############################### */

/*router.route('/item/:id')
	.patch(controllers.Item.partialUpdate);


router.route('/guaranteeLetter/:id')
	.get(controllers.GuaranteeLetter.getById);*/


/* ######################################################################################### */



/* ################################# SOLICITUDES DE VISITA ############################### */

router.route('/request')
	.get(Request.getAll);
	//.post(controllers.Request.create);*/

router.route('/request/me')
	.get(Session.validSession, Request.getAllByMe);


/* ######################################################################################### */




/* ################################### MANEJO DE PREGUNTAS ############################### */

/*router.route('/question')
	.get(controllers.Question.getAll)
	.post(controllers.Question.create);

router.route('/question/:id')
	.put(controllers.Question.update)
	.patch(controllers.Question.partialUpdate);*/

/* ######################################################################################### */


/*router.route('/answer')
	.post(controllers.Answer.create);

router.route('/answer/:id')
	.put(controllers.Answer.update);*/



module.exports = router;