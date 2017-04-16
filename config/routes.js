var express = require('express'),
	router = express.Router(),
	Session = require('../app/controllers/Session'),
	Person = require('../app/controllers/Person'),
	Request = require('../app/controllers/Request'),
	GuaranteeLetter = require('../app/controllers/GuaranteeLetter'),
	Budget = require('../app/controllers/Budget'),
	Item = require('../app/controllers/Item'),
	Form = require('../app/controllers/Form'),
	Image = require('../app/controllers/Image'),
	Comment = require('../app/controllers/Comment'),
	Answer = require('../app/controllers/Answer'),
	Load = require('../app/controllers/Load'),
	Affiliated = require('../app/controllers/Affiliated'),
	User = require('../app/controllers/User');

var jsreport = require('jsreport');
var ejs = require('ejs');
var fs = require('fs');

router.route('/load/:table')
	.post(Load.loadImage1(), Load.loadFile);
	//.post(Request.deleteBudget, Request.loadImage1(), Request.returnImageLoaded);


/* ############################################ PERSONAS ####################################### */

router.route('/affiliated')
	.get(Affiliated.getAll);

router.route('/affiliated/:id')
	.get(Affiliated.getById)
	.patch(Affiliated.partialUpdate);


router.route('/person')
	.get(Person.getAll);

router.route('/person/:id')
	.get(Person.getById)
	.patch(Person.partialUpdate);


/* ############################################################################################# */


router.route('/answer/request/:id')
	.get(Answer.getCurrentAnswers); // falta sessionValid



/* ############################################ USUARIOS ####################################### */

router.route('/user')
	.get(Session.validSession, User.getAll)
	.post(User.create);


router.route('/user/:id')
	.get(User.getById)
	.put(User.update)
	.patch(User.partialUpdate);
	//.delete ¿deshabilitar usuario?

router.route('/verification/user/username')
	.get(User.verifyUsername);

router.route('/password/user/:username')
	.get(User.password);

/* ############################################################################################## */




/* #################################### SESSIONS #################################### */

router.route('/session')
	.post(Session.validUser, Session.create)
	.delete(Session.validSession, Session.delete);


/* ########################################################################################### */

router.route('/form')
	.get(Session.validSession, Form.getAll);

router.route('/form/:id')
	.get(Session.validSession, Form.getById);

router.route('/document/form/request/:id')
	.get(Form.getDocumentById);

router.route('/document/form/answered/request/:id')
	.get(Form.getDocumentAnsweredById);


/* #################### PRESUPUESTOS Y CARTAS AVALES ############################### */

router.route('/budget2')
	.get(Budget.getAll2);

router.route('/budget')
	.get(Session.validSession, Budget.getAll) // tiene statusGroups
	.post(Budget.create);

router.route('/update/budget')
	.post(Budget.updateBudget);

router.route('/budget/:id')
	.get(Session.validSession, Budget.getById); // tiene statusGroups

router.route('/budget/:requestId/currentBudget')
	.get(Budget.getCurrentBudget) // tiene statusGroups
	.post(Budget.create);

router.route('/item')
	.get(Item.getAll); // no necesita statusGroups porque no la utilizo en el app

router.route('/item/:id')
	.patch(Session.validSession, Item.partialUpdate); // tiene statusGroups

router.route('/document/budget/:id/:version/:last')
	.get(Budget.getDocumentById);

router.route('/image/:name')
	.get(Image.getImageByName);

router.route('/guaranteeLetter')
	.get(Session.validSession, GuaranteeLetter.getAll); // tiene statusGroups

router.route('/guaranteeLetter/:id')
	.get(Session.validSession, GuaranteeLetter.getById); // tiene statusGroups

router.route('/document/guaranteeLetter/:id')
	.get(GuaranteeLetter.getDocumentById);


/* ######################################################################################### */



/* ################################# SOLICITUDES DE VISITA ############################### */

router.route('/request')
	.get(Request.getAll) // no necesita statusGroups porque no la utilizo en el app
	.post(Session.validSession, Request.create); // tiene statusGroups

router.route('/request/:id/cancel')
	.get(Request.cancel);


router.route('/me/request')
	.get(Session.validSession, Request.getAllByMe); // tiene statusGroups

router.route('/request/:id')
	.get(Session.validSession, Request.getById) // tiene statusGroups
	.delete(Request.deleteRequest)
	.patch(Session.validSession, Request.partialUpdate); // tiene statusGroups

router.route('/request/:id/comment')
	.get(Session.validSession, Request.getComments); // le falta status groups

router.route('/request/:id/answer')
	.post(Request.postAnswer); // le falta sessionValid y le falta status groups

router.route('/request/:id/form')
	.get(Request.getForm); // falta sessionValid y status groups

router.route('/request/:id/budget/image')
	.post(Request.deleteBudget, Request.loadImage1(), Request.returnImageLoaded);

router.route('/request/:id/form/image')
	.post(Request.deleteForm, Request.loadImage2(), Request.returnImageLoaded);

/* ######################################################################################### */


router.route('/comment')
	.post(Session.validSession, Comment.create); // falta sessionValid


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