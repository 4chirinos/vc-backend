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
	.get(Session.validSession, User.getAll)
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
	.get(Session.validSession, Budget.getAll); // tiene statusGroups

router.route('/budget/:id/document')
	.post(Session.validSession, Budget.deleteDocument, Budget.loadImage(), Budget.returnImageLoaded);

router.route('/budget/:id')
	.get(Session.validSession, Budget.getById); // tiene statusGroups

router.route('/item')
	.get(Item.getAll); // no necesita statusGroups porque no la utilizo en el app

router.route('/item/:id')
	.patch(Session.validSession, Item.partialUpdate); // tiene statusGroups

router.route('/document/budget/:id')
	.get(Budget.getDocumentById);

router.route('/image/budget/:name')
	.get(Budget.getImageByName);

router.route('/guaranteeLetter')
	.get(Session.validSession, GuaranteeLetter.getAll); // tiene statusGroups

router.route('/guaranteeLetter/:id')
	.get(Session.validSession, GuaranteeLetter.getById); // tiene statusGroups


/* ######################################################################################### */



/* ################################# SOLICITUDES DE VISITA ############################### */

router.route('/request')
	.get(Request.getAll) // no necesita statusGroups porque no la utilizo en el app
	.post(Session.validSession, Request.create); // tiene statusGroups

router.route('/me/request')
	.get(Session.validSession, Request.getAllByMe); // tiene statusGroups

router.route('/request/:id')
	.get(Session.validSession, Request.getById) // tiene statusGroups
	.patch(Session.validSession, Request.partialUpdate); // tiene statusGroups


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