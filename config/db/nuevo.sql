/*psql -h localhost -d visitadorclinico_development -U postgres*/
/*\i 'batch.sql'*/
/*heroku apps -> listar nombres de mis apps*/
/*heroku run bash -> para correr las migraciones*/
/*heroku pg:psql --app nombre_del_app  -> para correr el batch.sql*/

/* \copy person FROM 'personas.txt' (DELIMITER('|')); */


DELETE FROM "answer";
DELETE FROM "requestForm";
DELETE FROM "comment";
DELETE FROM "request";
DELETE FROM "guaranteeLetter";
DELETE FROM "historicalItem";
DELETE FROM "currentItem";
DELETE FROM "currentBudget";
DELETE FROM "item";
DELETE FROM "budget";
DELETE FROM "affiliated";
DELETE FROM "policy";
DELETE FROM "session";
DELETE FROM "user";
DELETE FROM "person";
DELETE FROM "status";
DELETE FROM "statusType";
DELETE FROM "profile";
DELETE FROM "profileType";
DELETE FROM "question";
DELETE FROM "form";
DELETE FROM "state";


ALTER SEQUENCE "affiliated_id_seq" RESTART WITH 100;
ALTER SEQUENCE "answer_id_seq" RESTART WITH 100;
ALTER SEQUENCE "budget_id_seq" RESTART WITH 100;
ALTER SEQUENCE "form_id_seq" RESTART WITH 100;
ALTER SEQUENCE "guaranteeLetter_id_seq" RESTART WITH 100;
ALTER SEQUENCE "item_id_seq" RESTART WITH 100;
ALTER SEQUENCE "profileType_id_seq" RESTART WITH 100;
ALTER SEQUENCE "profile_id_seq" RESTART WITH 100;
ALTER SEQUENCE "question_id_seq" RESTART WITH 100;
ALTER SEQUENCE "request_id_seq" RESTART WITH 100;
ALTER SEQUENCE "session_id_seq" RESTART WITH 100;
ALTER SEQUENCE "status_id_seq" RESTART WITH 100;
ALTER SEQUENCE "user_id_seq" RESTART WITH 100;
ALTER SEQUENCE "policy_id_seq" RESTART WITH 100;



INSERT INTO "statusType" VALUES (1, 'carta aval');
INSERT INTO "statusType" VALUES (2, 'visita');


INSERT INTO "status" VALUES (1, 'activada', 1);
INSERT INTO "status" VALUES (7, 'utilizada', 1);
INSERT INTO "status" VALUES (2, 'por asignar', 2);
INSERT INTO "status" VALUES (3, 'asignada', 2);
INSERT INTO "status" VALUES (4, 'atendida', 2);
INSERT INTO "status" VALUES (5, 'en revision', 2);
INSERT INTO "status" VALUES (6, 'finalizada', 2);


INSERT INTO "profileType" VALUES (1, 'persona');
INSERT INTO "profileType" VALUES (2, 'usuario');


INSERT INTO "profile" VALUES (1, 'analista', 1);
INSERT INTO "profile" VALUES (2, 'coordinador', 1);
INSERT INTO "profile" VALUES (3, 'visitador', 1);
INSERT INTO "profile" VALUES (4, 'cliente', 1);


INSERT INTO "profile" VALUES (6, 'administrador', 2);
INSERT INTO "profile" VALUES (7, 'analista', 2);
INSERT INTO "profile" VALUES (8, 'coordinador', 2);
INSERT INTO "profile" VALUES (9, 'visitador', 2);


INSERT INTO "form" VALUES (1);


INSERT INTO "question" VALUES (1, 1, 'IMPRESION GENERAL SOBRE LA INSTITUCION PRESTADORA DE SERVICIO');
INSERT INTO "question" VALUES (2, 1, 'ATENCION RECIBIDA POR PARTE DEL MEDICO TRATANTE');
INSERT INTO "question" VALUES (3, 1, 'ATENCION RECIBIDA POR PARTE DEL PERSONAL DE ENFEMERIA');
INSERT INTO "question" VALUES (4, 1, 'INFORMACION OFRECIDA POR EL PERSONAL CLINICO');
INSERT INTO "question" VALUES (5, 1, 'DOTACION DE EQUIPOS MEDICOS E INSTRUMENTAL');
INSERT INTO "question" VALUES (6, 1, 'LIMPIEZA DE ASEOS Y ZONAS COMUNES');
INSERT INTO "question" VALUES (7, 1, 'COMODIDAD DE LAS SALAS DE ESPERA E INSTALACIONES EN GENERAL');