var express = require('express'),
	router = express.Router(),
	Session = require('../app/controllers/Session'),
	Person = require('../app/controllers/Person'),
	Request = require('../app/controllers/Request'),
	GuaranteeLetter = require('../app/controllers/GuaranteeLetter'),
	Budget = require('../app/controllers/Budget'),
	Item = require('../app/controllers/Item'),
	User = require('../app/controllers/User');

var jsreport = require('jsreport');
var ejs = require('ejs');
var fs = require('fs');


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



/* #################### PRESUPUESTOS Y CARTAS AVALES ############################### */

router.route('/budget')
	.get(Session.validSession, Budget.getAll);

router.route('/budget/:id')
	.get(Session.validSession, Budget.getById);

router.route('/item')
	.get(Item.getAll);

router.route('/item/:id')
	.patch(Item.partialUpdate);

router.route('/document/budget/:id')
	.get(Budget.getDocumentById);

router.route('/guaranteeLetter')
	.get(GuaranteeLetter.getAll);

router.route('/guaranteeLetter/:id')
	.get(GuaranteeLetter.getById);


/* ######################################################################################### */



/* ################################# SOLICITUDES DE VISITA ############################### */

router.route('/request')
	.get(Request.getAll)
	.post(Session.validSession, Request.create);

router.route('/me/request')
	.get(Session.validSession, Request.getAllByMe);

router.route('/request/:id')
	.get(Session.validSession, Request.getById)
	.patch(Session.validSession, Request.partialUpdate);


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