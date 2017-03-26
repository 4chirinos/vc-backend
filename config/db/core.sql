/*psql -h localhost -d visitadorclinico_development -U postgres*/
/*\i 'batch.sql'*/
/*heroku apps -> listar nombres de mis apps*/
/*heroku run bash -> para correr las migraciones*/
/*heroku pg:psql --app nombre_del_app  -> para correr el batch.sql*/

/* \copy person FROM 'personas.txt' (DELIMITER('|')); */

/* \copy "item" TO 'TXTs/items.txt' DELIMITER '|'; */


DELETE FROM "affiliatedPhoneNumber";
DELETE FROM "affiliatedEmail";
DELETE FROM "personPhoneNumber";
DELETE FROM "personEmail";
DELETE FROM "answer";
DELETE FROM "requestForm";
DELETE FROM "comment";
DELETE FROM "request";
DELETE FROM "guaranteeLetter";
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
ALTER SEQUENCE "affiliatedPhoneNumber_id_seq" RESTART WITH 100;
ALTER SEQUENCE "affiliatedEmail_id_seq" RESTART WITH 100;
ALTER SEQUENCE "personPhoneNumber_id_seq" RESTART WITH 100;
ALTER SEQUENCE "personEmail_id_seq" RESTART WITH 100;


INSERT INTO "state" VALUES (1, 'AMAZONAS');
INSERT INTO "state" VALUES (2, 'ANZOATEGUI');
INSERT INTO "state" VALUES (3, 'APURE');
INSERT INTO "state" VALUES (4, 'ARAGUA');
INSERT INTO "state" VALUES (5, 'BARINAS');
INSERT INTO "state" VALUES (6, 'BOLIVAR');
INSERT INTO "state" VALUES (7, 'CARABOBO');
INSERT INTO "state" VALUES (8, 'COJEDES');
INSERT INTO "state" VALUES (9, 'DELTA AMACURO');
INSERT INTO "state" VALUES (10, 'FALCON');
INSERT INTO "state" VALUES (11, 'DISTRITO CAPITAL');
INSERT INTO "state" VALUES (12, 'GUARICO');
INSERT INTO "state" VALUES (13, 'LARA');
INSERT INTO "state" VALUES (14, 'MERIDA');
INSERT INTO "state" VALUES (15, 'MIRANDA');
INSERT INTO "state" VALUES (16, 'MONAGAS');
INSERT INTO "state" VALUES (17, 'NUEVA ESPARTA');
INSERT INTO "state" VALUES (18, 'PORTUGUESA');
INSERT INTO "state" VALUES (19, 'SUCRE');
INSERT INTO "state" VALUES (20, 'TACHIRA');
INSERT INTO "state" VALUES (21, 'TRUJILLO');
INSERT INTO "state" VALUES (22, 'VARGAS');
INSERT INTO "state" VALUES (23, 'YARACUY');
INSERT INTO "state" VALUES (24, 'ZULIA');


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


/* ############### CARACAS ############# */

INSERT INTO "person" VALUES (1, '10503817', 'MARIA', 'LOPEZ', 1, '1970-09-01', 'DIRECCION', 'F', 11);
INSERT INTO "person" VALUES (2, '99182712', 'JOSE', 'PEREZ', 1, '1970-09-01', 'DIRECCION', 'M', 11);
INSERT INTO "person" VALUES (3, '76281921', 'CARLOS', 'BRACAMONTE', 2, '1970-09-01', 'DIRECCION', 'M', 11);
INSERT INTO "person" VALUES (4, '10291827', 'JOSEFINA', 'SANCHEZ', 2, '1970-09-01', 'DIRECCION', 'F', 11);
INSERT INTO "person" VALUES (5, '28371623', 'PAOLA', 'VERA', 3, '1970-09-01', 'DIRECCION', 'F', 11);
INSERT INTO "person" VALUES (6, '11829182', 'ESTRELLA', 'COLMENARES', 3, '1970-09-01', 'DIRECCION', 'F', 11);

INSERT INTO "user" VALUES (1, 1, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'MLOPEZ', 7, true);
INSERT INTO "user" VALUES (2, 2, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'JPEREZ', 7, true);
INSERT INTO "user" VALUES (3, 3, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'CBRACAMONTE', 8, true);
INSERT INTO "user" VALUES (4, 4, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'JSANCHEZ', 8, true);
INSERT INTO "user" VALUES (5, 5, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'PVERA', 9, true);
INSERT INTO "user" VALUES (6, 6, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'ECOLMENARES', 9, true);

/* ############### ########### ############# */



/* ############### CARABOBO ############# */

INSERT INTO "person" VALUES (7, '66172619', 'ANTONIA', 'MONTES', 1, '1970-09-01', 'DIRECCION', 'F', 7);
INSERT INTO "person" VALUES (8, '77162510', 'MANUEL', 'RUIZ', 1, '1970-09-01', 'DIRECCION', 'M', 7);
INSERT INTO "person" VALUES (9, '22716200', 'YARELIS', 'CORREA', 2, '1970-09-01', 'DIRECCION', 'F', 7);
INSERT INTO "person" VALUES (10, '10296659', 'JOSEFINA', 'PAZ', 2, '1970-09-01', 'DIRECCION', 'F', 7);
INSERT INTO "person" VALUES (11, '11772610', 'LUISA', 'MARTINEZ', 3, '1970-09-01', 'DIRECCION', 'F', 7);
INSERT INTO "person" VALUES (12, '88991201', 'PEDRO', 'ROJO', 3, '1970-09-01', 'DIRECCION', 'F', 7);

INSERT INTO "user" VALUES (7, 7, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'AMONTES', 7, true);
INSERT INTO "user" VALUES (8, 8, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'MRUIZ', 7, true);
INSERT INTO "user" VALUES (9, 9, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'YCORREA', 8, true);
INSERT INTO "user" VALUES (10, 10, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'JPAZ', 8, true);
INSERT INTO "user" VALUES (11, 11, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'LMARTINEZ', 9, true);
INSERT INTO "user" VALUES (12, 12, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'PROJO', 9, true); 

/* ############### ########### ############# */


INSERT INTO "person" VALUES (13, '90165430', 'CAROLINA', 'RAMIREZ', 2, '1970-09-01', 'DIRECCION', 'F', 7);
INSERT INTO "user" VALUES (13, 13, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'CRAMIREZ', 6, true);



INSERT INTO "personPhoneNumber" VALUES(1, 1, '0212-6729054');
INSERT INTO "personPhoneNumber" VALUES(2, 2, '0212-6729032');
INSERT INTO "personPhoneNumber" VALUES(3, 3, '0212-6743345');
INSERT INTO "personPhoneNumber" VALUES(4, 4, '0212-1001233');
INSERT INTO "personPhoneNumber" VALUES(5, 5, '0212-9289912');
INSERT INTO "personPhoneNumber" VALUES(6, 6, '0212-0192567');
INSERT INTO "personPhoneNumber" VALUES(7, 7, '0212-9029019');
INSERT INTO "personPhoneNumber" VALUES(8, 8, '0212-3339001');
INSERT INTO "personPhoneNumber" VALUES(9, 9, '0212-9256200');
INSERT INTO "personPhoneNumber" VALUES(10, 10, '0212-6729002');
INSERT INTO "personPhoneNumber" VALUES(11, 11, '0212-6729003');
INSERT INTO "personPhoneNumber" VALUES(12, 12, '0212-6743004');
INSERT INTO "personPhoneNumber" VALUES(13, 13, '0212-6743112');

INSERT INTO "personEmail" VALUES(1, 1, 'M.LOPEZ@EMAIL.COM');
INSERT INTO "personEmail" VALUES(2, 2, 'J.PEREZ@EMAIL.COM');
INSERT INTO "personEmail" VALUES(3, 3, 'C.BRACAMONTE@EMAIL.COM');
INSERT INTO "personEmail" VALUES(4, 4, 'J.SANCHEZ@EMAIL.COM');
INSERT INTO "personEmail" VALUES(5, 5, 'P.VERA@EMAIL.COM');
INSERT INTO "personEmail" VALUES(6, 6, 'E.COLMENARES@EMAIL.COM');
INSERT INTO "personEmail" VALUES(7, 7, 'A.MONTES@EMAIL.COM');
INSERT INTO "personEmail" VALUES(8, 8, 'M.RUIZ@EMAIL.COM');
INSERT INTO "personEmail" VALUES(9, 9, 'Y.CORREA@EMAIL.COM');
INSERT INTO "personEmail" VALUES(10, 10, 'J.PAZ@EMAIL.COM');
INSERT INTO "personEmail" VALUES(11, 11, 'L.MARTINEZ@EMAIL.COM');
INSERT INTO "personEmail" VALUES(12, 12, 'P.ROJO@EMAIL.COM');
INSERT INTO "personEmail" VALUES(13, 13, 'C.RAMIREZ@EMAIL.COM');



INSERT INTO "affiliated" VALUES (1, 'CENTRO MEDICO LOIRA', 'DIRECCION', '0212-1032041', 'J-00168870-4', NULL, 7);
INSERT INTO "affiliated" VALUES (2, 'CLINICA LUIS RAZETTI', 'DIRECCION', '0212-1032048', 'J-00168870-1', NULL, 11);
INSERT INTO "affiliated" VALUES (3, 'CLINICA ATIAS', 'DIRECCION', '0295-0194599', 'J-00168870-6', NULL, 11);

INSERT INTO "affiliatedPhoneNumber" VALUES(1, 1, '0212-6729018');
INSERT INTO "affiliatedPhoneNumber" VALUES(2, 1, '0212-6729019');
INSERT INTO "affiliatedPhoneNumber" VALUES(4, 2, '0212-6729718');
INSERT INTO "affiliatedPhoneNumber" VALUES(5, 2, '0212-6729010');
INSERT INTO "affiliatedPhoneNumber" VALUES(6, 3, '0212-6729061');
INSERT INTO "affiliatedPhoneNumber" VALUES(7, 3, '0212-6729013');

INSERT INTO "affiliatedEmail" VALUES(1, 1, 'CENTRO.LOIRA@EMAIL.COM');
INSERT INTO "affiliatedEmail" VALUES(2, 2, 'LUIS.RAZETTI@EMAIL.COM');
INSERT INTO "affiliatedEmail" VALUES(3, 3, 'CLINICA.ATIAS@EMAIL.COM');



INSERT INTO "budget" VALUES (1, 1, '2017-03-05', '2017-03-05', 1, NOW(), 12, '0012', '1726', 'REVASCULARIZACION QUIRURGICA DEL MIOCARDIO', 'REVASCULARIZACION QUIRURGICA', 'DIEGO', 'MARTINEZ');
INSERT INTO "budget" VALUES (1, 2, '2017-03-05', NULL, 1, NOW(), 12, '0012', '1726', 'REVASCULARIZACION QUIRURGICA DEL MIOCARDIO', 'REVASCULARIZACION QUIRURGICA', 'DIEGO', 'MARTINEZ');
INSERT INTO "budget" VALUES (2, 1, '2017-03-05', NULL, 1, NOW(), 7, '0013', '7152', 'APENDICITI', 'EXTRACCION DE APENDICITI', 'LUIS', 'COBOS');

INSERT INTO "item" VALUES (1, 1, 1, 'ELECTROCARDIOGRAMA', 'REQUERIMIENTOS', 2, 300.90);
INSERT INTO "item" VALUES (2, 1, 1, 'RX TORAX (2P)', 'REQUERIMIENTOS', 2, 1200.00);
INSERT INTO "item" VALUES (3, 1, 1, 'MEDICINAS', 'GASTOS HOSPITALIZACION', 1, 13000.00);
INSERT INTO "item" VALUES (4, 1, 1, 'MATERIAL MÉDICO QUIRURGICO', 'GASTOS HOSPITALIZACION', 1, 100000.00);
INSERT INTO "item" VALUES (5, 1, 1, 'CIRUJANO', 'SERVICIOS CLINICOS', 1, 180000.00);
INSERT INTO "item" VALUES (6, 1, 1, 'PRIMER AYUDANTE', 'SERVICIOS CLINICOS', 1, 100000.8);
INSERT INTO "item" VALUES (7, 1, 1, 'SEGUNDO AYUDANTE', 'SERVICIOS CLINICOS', 1, 100000.00);
INSERT INTO "item" VALUES (8, 1, 1, 'CARDIOLOGO', 'SERVICIOS CLINICOS', 1, 190000.00);
INSERT INTO "item" VALUES (9, 1, 1, 'MEDICO PERFUSIONISTA', 'SERVICIOS CLINICOS', 1, 200000.6);
INSERT INTO "item" VALUES (10, 1, 1, 'ANESTESIOLOGO', 'SERVICIOS CLINICOS', 1, 200000.00);
INSERT INTO "item" VALUES (11, 1, 1, 'LABORATORIO CLINICO', 'SERVICIOS CLINICOS', 2, 10000.00);
INSERT INTO "item" VALUES (12, 1, 1, 'BANCO DE SANGRE RAZETTI', 'SERVICIOS CLINICOS', 1, 20800.00);
INSERT INTO "item" VALUES (13, 1, 1, 'UNIDAD QUIRURGICA VASCULAR', 'SERVICIOS CLINICOS', 1, 17500.00);
INSERT INTO "item" VALUES (14, 1, 1, 'SERVICIO INTEGRAL DE PABELLON', 'SERVICIOS CLINICOS', 1, 7500.00);
INSERT INTO "item" VALUES (15, 1, 1, 'OXIDO NITROSO', 'SERVICIOS CLINICOS', 6, 1500.00);
INSERT INTO "item" VALUES (16, 1, 1, 'INSTRUMENTAL QUIRURGICO', 'SERVICIOS CLINICOS', 1, 3500.00);
INSERT INTO "item" VALUES (17, 1, 1, 'INSTRUMENTISTA', 'SERVICIOS CLINICOS', 1, 90500.00);
INSERT INTO "item" VALUES (18, 1, 1, 'CIRULANTE', 'SERVICIOS CLINICOS', 1, 70000.00);
INSERT INTO "item" VALUES (39, 1, 1, 'RECUPERACION', 'SERVICIOS CLINICOS', 1, 40000.00);
INSERT INTO "item" VALUES (19, 1, 1, 'SERVICIO INTEGRAL HAB. TIPO A', 'SERVICIOS CLINICOS', 1, 60000.00);
INSERT INTO "item" VALUES (20, 1, 1, 'MEDICO RESIDENTE', 'SERVICIOS CLINICOS', 1, 100000.00);
INSERT INTO "item" VALUES (21, 1, 1, 'USO MAQUINA DE ANESTESIA', 'SERVICIOS CLINICOS', 1, 10000.00);
INSERT INTO "item" VALUES (22, 1, 1, 'MANTA TERMICA', 'SERVICIOS CLINICOS', 2, 10000.00);
INSERT INTO "item" VALUES (23, 1, 1, 'SERVICIO DE TERAPIA', 'SERVICIOS CLINICOS', 1, 10000.00);
INSERT INTO "item" VALUES (24, 1, 1, 'BOMBA DE INFUSION', 'SERVICIOS CLINICOS', 19, 5000.00);
INSERT INTO "item" VALUES (25, 1, 1, 'EQUIPO DE ASPIRACION', 'SERVICIOS CLINICOS', 1, 9000.00);
INSERT INTO "item" VALUES (26, 1, 1, 'OXIMETRO (POR HORA)', 'SERVICIOS CLINICOS', 45, 800.20);
INSERT INTO "item" VALUES (27, 1, 1, 'SERVICIO DE CUIDADOS INTERMEDIO', 'SERVICIOS CLINICOS', 1, 1800.00);
INSERT INTO "item" VALUES (28, 1, 1, 'SERVICIO DE ENFEMERIA UTI', 'SERVICIOS CLINICOS', 1, 20800.00);
INSERT INTO "item" VALUES (29, 1, 1, 'SERVICIO DE ENFEMERIA UCI', 'SERVICIOS CLINICOS', 1, 19600.00);
INSERT INTO "item" VALUES (40, 1, 1, 'DIETETICA', 'SERVICIOS CLINICOS', 1, 9600.00);
INSERT INTO "item" VALUES (41, 1, 1, 'MONITOR VERIDIA P-A UCI', 'SERVICIOS CLINICOS', 1, 6000.00);
INSERT INTO "item" VALUES (42, 1, 1, 'DINAMAP (UTI)', 'SERVICIOS CLINICOS', 24, 1000.00);
INSERT INTO "item" VALUES (43, 1, 1, 'SERVICIO DE TERAPIA INTENSIVA', 'SERVICIOS CLINICOS', 1, 3000.00);
INSERT INTO "item" VALUES (44, 1, 1, 'LAB. CLINICO ALFREDO GOMEZ PERAZA', 'SERVICIOS CLINICOS', 1, 1700.00);

INSERT INTO "item" VALUES (45, 1, 2, 'ELECTROCARDIOGRAMA', 'REQUERIMIENTOS', 2, 300.90);
INSERT INTO "item" VALUES (46, 1, 2, 'RX TORAX (2P)', 'REQUERIMIENTOS', 2, 1200.00);
INSERT INTO "item" VALUES (47, 1, 2, 'MEDICINAS', 'GASTOS HOSPITALIZACION', 1, 13000.00);
INSERT INTO "item" VALUES (48, 1, 2, 'MATERIAL MÉDICO QUIRURGICO', 'GASTOS HOSPITALIZACION', 1, 100000.00);
INSERT INTO "item" VALUES (49, 1, 2, 'CIRUJANO', 'SERVICIOS CLINICOS', 1, 180000.00);
INSERT INTO "item" VALUES (50, 1, 2, 'PRIMER AYUDANTE', 'SERVICIOS CLINICOS', 1, 100000.8);
INSERT INTO "item" VALUES (51, 1, 2, 'SEGUNDO AYUDANTE', 'SERVICIOS CLINICOS', 1, 100000.00);

INSERT INTO "item" VALUES (52, 2, 1, 'ELECTROCARDIOGRAMA', 'REQUERIMIENTOS', 2, 300.90);
INSERT INTO "item" VALUES (53, 2, 1, 'RX TORAX (2P)', 'REQUERIMIENTOS', 2, 1200.00);
INSERT INTO "item" VALUES (54, 2, 1, 'MEDICINAS', 'GASTOS HOSPITALIZACION', 1, 13000.00);
INSERT INTO "item" VALUES (55, 2, 1, 'MATERIAL MÉDICO QUIRURGICO', 'GASTOS HOSPITALIZACION', 1, 100000.00);
INSERT INTO "item" VALUES (56, 2, 1, 'CIRUJANO', 'SERVICIOS CLINICOS', 1, 180000.00);
INSERT INTO "item" VALUES (57, 2, 1, 'PRIMER AYUDANTE', 'SERVICIOS CLINICOS', 1, 100000.8);
INSERT INTO "item" VALUES (58, 2, 1, 'SEGUNDO AYUDANTE', 'SERVICIOS CLINICOS', 1, 100000.00);



INSERT INTO "policy" VALUES (1, 1, 1, NOW(), '2018-04-03', 900.01);
INSERT INTO "policy" VALUES (2, 2, 2, NOW(), '2018-04-03', 900.01);
INSERT INTO "policy" VALUES (3, 3, 3, NOW(), '2018-04-03', 900.01);



INSERT INTO "guaranteeLetter" VALUES (1, 1, '0190', 1, 1, 1, 1, NOW(), '2018-2-15', 7, 90);
INSERT INTO "guaranteeLetter" VALUES (2, 2, '0191', 5, 2, 1, 1, NOW(), '2018-2-15', 11, 90);



INSERT INTO "form" VALUES (1);



INSERT INTO "question" VALUES (1, 1, 'IMPRESION GENERAL SOBRE LA INSTITUCION PRESTADORA DE SERVICIO');
INSERT INTO "question" VALUES (2, 1, 'ATENCION RECIBIDA POR PARTE DEL MEDICO TRATANTE');
INSERT INTO "question" VALUES (3, 1, 'ATENCION RECIBIDA POR PARTE DEL PERSONAL DE ENFEMERIA');
INSERT INTO "question" VALUES (4, 1, 'INFORMACION OFRECIDA POR EL PERSONAL CLINICO');
INSERT INTO "question" VALUES (5, 1, 'DOTACION DE EQUIPOS MEDICOS E INSTRUMENTAL');
INSERT INTO "question" VALUES (6, 1, 'LIMPIEZA DE ASEOS Y ZONAS COMUNES');
INSERT INTO "question" VALUES (7, 1, 'COMODIDAD DE LAS SALAS DE ESPERA E INSTALACIONES EN GENERAL');