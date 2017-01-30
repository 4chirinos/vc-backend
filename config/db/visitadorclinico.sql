/*psql -h localhost -d visitadorclinico_development -U postgres*/
/*\i 'batch.sql'*/
/*heroku apps -> listar nombres de mis apps*/
/*heroku run bash -> para correr las migraciones*/
/*heroku pg:psql --app nombre_del_app  -> para correr el batch.sql*/

DROP VIEW "my_state";
DROP VIEW "my_person";
DROP VIEW "my_affiliated";
DROP VIEW "my_policy";
DROP VIEW "my_guaranteeLetter";
DROP VIEW "my_budget";
DROP VIEW "my_item";


CREATE OR REPLACE VIEW "my_state" AS
SELECT *
    FROM dblink('dbname=core_development', 'select * from "state"')
    AS t1("id" integer,
    	"stateName" text);


CREATE OR REPLACE VIEW "my_person" AS
SELECT *
    FROM dblink('dbname=core_development', 'select * from "person"')
    AS t1("id" integer,
    	"identityCard" text,
    	"firstName" text,
    	"lastName" text,
    	"email" text,
    	"profileId" integer,
    	"birthDate" timestamp,
    	"address" text,
    	"gender" text,
    	"phoneNumber" text,
    	"stateId" integer);


CREATE OR REPLACE VIEW "my_affiliated" AS
SELECT *
    FROM dblink('dbname=core_development', 'select * from "affiliated"')
    AS t1("id" integer,
    	"name" text,
    	"address" text,
    	"phoneNumber" text,
    	"rif" text,
    	"portal" text,
    	"stateId" integer);


CREATE OR REPLACE VIEW "my_policy" AS
SELECT *
    FROM dblink('dbname=core_development', 'select * from "policy"')
    AS t1("id" integer,
    	"holderId" integer,
    	"ownerId" integer,
    	"startDate" timestamp,
    	"endDate" timestamp,
    	"cost" real);


CREATE OR REPLACE VIEW "my_guaranteeLetter" AS
SELECT *
    FROM dblink('dbname=core_development', 'select * from "guaranteeLetter"')
    AS t1("id" integer,
    	"policyId" integer,
    	"code" text,
    	"beneficiaryId" integer,
    	"budgetId" integer,
    	"statusId" integer,
    	"startDate" timestamp,
    	"endDate" timestamp,
    	"stateId" integer,
    	"coveredPercentage" real);


CREATE OR REPLACE VIEW "my_budget" AS
SELECT *
    FROM dblink('dbname=core_development', 'select * from "budget"')
    AS t1("id" integer,
    	"affiliatedId" integer,
    	"startDate" timestamp,
    	"days" integer,
    	"code" text,
    	"history" text,
    	"diagnosis" text,
    	"treatment" text,
    	"doctorFirstName" text,
    	"doctorLastName" text);


CREATE OR REPLACE VIEW "my_item" AS
SELECT *
    FROM dblink('dbname=core_development', 'select * from "item"')
    AS t1("id" integer,
    	"budgetId" integer,
    	"description" text,
    	"concept" text,
    	"quantity" integer,
    	"cost" real);


/*ALTER SEQUENCE "affiliated_id_seq" RESTART WITH 100;*/
ALTER SEQUENCE "answer_id_seq" RESTART WITH 100;
/*ALTER SEQUENCE "budget_id_seq" RESTART WITH 100;*/
ALTER SEQUENCE "form_id_seq" RESTART WITH 100;
/*ALTER SEQUENCE "guaranteeLetter_id_seq" RESTART WITH 100;*/
/*ALTER SEQUENCE "item_id_seq" RESTART WITH 100;*/
ALTER SEQUENCE "profileType_id_seq" RESTART WITH 100;
ALTER SEQUENCE "profile_id_seq" RESTART WITH 100;
ALTER SEQUENCE "question_id_seq" RESTART WITH 100;
ALTER SEQUENCE "request_id_seq" RESTART WITH 100;
ALTER SEQUENCE "session_id_seq" RESTART WITH 100;
ALTER SEQUENCE "status_id_seq" RESTART WITH 100;
ALTER SEQUENCE "user_id_seq" RESTART WITH 100;
/*ALTER SEQUENCE "policy_id_seq" RESTART WITH 100;*/



DELETE FROM "request";
DELETE FROM "currentItem";
DELETE FROM "currentBudget";
DELETE FROM "session";
DELETE FROM "user";
DELETE FROM "status";
DELETE FROM "statusType";
DELETE FROM "profile";
DELETE FROM "profileType";
DELETE FROM "answer";
DELETE FROM "question";
DELETE FROM "form";


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


INSERT INTO "user" VALUES (1, 1, '$2a$08$rCHFWUpjgqBGgOvFFaplkOJaFpulwl/Ez5IAzdTeoIkLAi4BDwIVm', 'MLOPEZ', 7, true);
INSERT INTO "user" VALUES (2, 2, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'ACONTRERAS', 8, true);
INSERT INTO "user" VALUES (4, 6, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'JRIVAS', 9, true);

INSERT INTO "user" VALUES (3, 9, '$2a$08$rCHFWUpjgqBGgOvFFaplkOJaFpulwl/Ez5IAzdTeoIkLAi4BDwIVm', 'LJARAMILLO', 6, true);


INSERT INTO "form" VALUES (1);


INSERT INTO "question" VALUES (1, 1, 'IMPRESION GENERAL SOBRE LA INSTITUCION PRESTADORA DE SERVICIO');
INSERT INTO "question" VALUES (2, 1, 'ATENCION RECIBIDA POR PARTE DEL MEDICO TRATANTE');
INSERT INTO "question" VALUES (3, 1, 'ATENCION RECIBIDA POR PARTE DEL PERSONAL DE ENFEMERIA');
INSERT INTO "question" VALUES (4, 1, 'INFORMACION OFRECIDA POR EL PERSONAL CLINICO');
INSERT INTO "question" VALUES (5, 1, 'DOTACION DE EQUIPOS MEDICOS E INSTRUMENTAL');
INSERT INTO "question" VALUES (6, 1, 'LIMPIEZA DE ASEOS Y ZONAS COMUNES');
INSERT INTO "question" VALUES (7, 1, 'COMODIDAD DE LAS SALAS DE ESPERA E INSTALACIONES EN GENERAL');


/*delete from "comment";
delete from "budgetImage";
delete from "formImage";
delete from "request";
delete from "guaranteeLetter";
delete from "policy";
delete from "session";
delete from "answer";
delete from "question";
delete from "historicalItem";
delete from "form";
delete from "currentItem";
delete from "currentBudget";
delete from "item";
delete from "budget";
delete from "affiliated";
delete from "user";
delete from "person";
delete from "profile";
delete from "profileType";
delete from "status";
delete from "statusType";
delete from "state";


alter sequence "affiliated_id_seq" restart with 100;
alter sequence "answer_id_seq" restart with 100;
alter sequence "budget_id_seq" restart with 100;
alter sequence "form_id_seq" restart with 100;
alter sequence "guaranteeLetter_id_seq" restart with 100;
alter sequence "item_id_seq" restart with 100;
alter sequence "profileType_id_seq" restart with 100;
alter sequence "profile_id_seq" restart with 100;
alter sequence "question_id_seq" restart with 100;
alter sequence "request_id_seq" restart with 100;
alter sequence "session_id_seq" restart with 100;
alter sequence "status_id_seq" restart with 100;
alter sequence "user_id_seq" restart with 100;
alter sequence "policy_id_seq" restart with 100;


insert into "statusType" values (1, 'carta aval');
insert into "statusType" values (2, 'visita');

insert into "status" values (1, 'activada', 1);
insert into "status" values (7, 'utilizada', 1);
insert into "status" values (2, 'por asignar', 2);
insert into "status" values (3, 'asignada', 2);
insert into "status" values (4, 'atendida', 2);
insert into "status" values (5, 'en revision', 2);
insert into "status" values (6, 'finalizada', 2);

insert into "profileType" values (1, 'persona');
insert into "profileType" values (2, 'usuario');

insert into "profile" values (1, 'analista', 1);
insert into "profile" values (2, 'coordinador', 1);
insert into "profile" values (3, 'visitador', 1);
insert into "profile" values (4, 'cliente', 1);

insert into "profile" values (6, 'administrador', 2);
insert into "profile" values (7, 'analista', 2);
insert into "profile" values (8, 'coordinador', 2);
insert into "profile" values (9, 'visitador', 2);

insert into "state" values (1, 'AMAZONAS');
insert into "state" values (2, 'ANZOATEGUI');
insert into "state" values (3, 'APURE');
insert into "state" values (4, 'ARAGUA');
insert into "state" values (5, 'BARINAS');
insert into "state" values (6, 'BOLIVAR');
insert into "state" values (7, 'CARABOBO');
insert into "state" values (8, 'COJEDES');
insert into "state" values (9, 'DELTA AMACURO');
insert into "state" values (10, 'FALCON');
insert into "state" values (11, 'DISTRITO CAPITAL');
insert into "state" values (12, 'GUARICO');
insert into "state" values (13, 'LARA');
insert into "state" values (14, 'MERIDA');
insert into "state" values (15, 'MIRANDA');
insert into "state" values (16, 'MONAGAS');
insert into "state" values (17, 'NUEVA ESPARTA');
insert into "state" values (18, 'PORTUGUESA');
insert into "state" values (19, 'SUCRE');
insert into "state" values (20, 'TACHIRA');
insert into "state" values (21, 'TRUJILLO');
insert into "state" values (22, 'VARGAS');
insert into "state" values (23, 'YARACUY');
insert into "state" values (24, 'ZULIA');

insert into "person" values (16, '10503817', 'MARIA', 'LOPEZ', 'M.LOPEZ@EMAIL.COM', 1, '1970-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 7);
insert into "person" values (17, '27491037', 'ANTONIA', 'CONTRERAS', 'A.CONTRERAS@EMAIL.COM', 2, '1980-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 11);
insert into "person" values (18, '11846100', 'PAOLA', 'CORTEJAL', 'P.CORTEJAL@EMAIL.COM', 3, '1978-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 11);


insert into "user" values (8, 16, '$2a$08$rCHFWUpjgqBGgOvFFaplkOJaFpulwl/Ez5IAzdTeoIkLAi4BDwIVm', 'MLOPEZ', 7, true);
insert into "user" values (9, 17, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 'ACONTRERAS', 8, true);


insert into "person" values (19, '5836120', 'JOSE', 'CORREA', 'JCORREA@EMAIL.COM', 1, '1978-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'M', '0212-1032048', 11);


insert into "person" values (1, '15382756', 'ALI', 'DIAZ', 'ADIAZ@EMAIL.COM', 1, '1979-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'M', '0212-1032048', 11);
insert into "person" values (2, '91028374', 'MANUEL', 'PENA', 'MPENA@EMAIL.COM', 1, '1987-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'M', '0212-1032048', 11);
insert into "person" values (3, '67654321', 'LUCIA', 'GONZALEZ', 'LGONZALEZ@EMAIL.COM', 2, '1980-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 11);
insert into "person" values (4, '4901836', 'MARITZA', 'COLMENARES', 'MCOLMENARES@EMAIL.COM', 2, '1977-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 11);
insert into "person" values (5, '6785901', 'CRISTINA', 'RICO', 'CRICO@EMAIL.COM', 3, '1989-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 11);
insert into "person" values (6, '8654109', 'SOFIA', 'NIEVES', 'SNIEVES@EMAIL.COM', 3, '1989-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 11);
insert into "person" values (7, '17560992', 'CARLA', 'MARIN', 'CMARIN@EMAIL.COM', 3, '1980-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 11);

insert into "person" values (9, '1234678', 'JESUS', 'ROMERO', 'JROMERO@EMAIL.COM', 4, '1979-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'M', '0212-1032048', 11);
insert into "person" values (10, '1234679', 'CARLOS', 'ZAMBRANO', 'CZAMBRANO@EMAIL.COM', 4, '1980-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'M', '0212-1032048', 11);
insert into "person" values (11, '1234680', 'PAOLA', 'GUERRA', 'PGUERRA@EMAIL.COM', 4, '1990-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 11);
insert into "person" values (12, '1234681', 'ANTONIA', 'BANDERA', 'ABANDERA', 4, '1987-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 11);
insert into "person" values (13, '1234682', 'VICTOR', 'CAMPOS', 'VCAMPOS@EMAIL.COM', 4, '1979-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'M', '0212-1032048', 11);
insert into "person" values (14, '1234683', 'VICTORIA', 'RIVAS', 'VRIVAS@EMAIL.COM', 4, '1987-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 11);
insert into "person" values (15, '1234684', 'ANTONIA', 'BERMUDEZ', 'ABERMUDEZ@EMAIL.COM', 4, '1989-09-01', 'CARACAS, AV. PRINCIPAL EL PEDREGAL, GALPON 107, NIVEL PB, URBANIZACION LA CASTELLANA', 'F', '0212-1032048', 11);


insert into "user" values (3, 3, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 'LGONZALEZ', 8, true);
insert into "user" values (4, 4, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 'MCOLMENARES', 8, true);
insert into "user" values (5, 5, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 'CRICO', 9, true);
insert into "user" values (6, 6, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 'SNIEVES', 9, true);
insert into "user" values (7, 7, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 'CMARIN', 9, true);


insert into "user" values (11, 19, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 'JCORREA', 6, true);


insert into "affiliated" values (2, 'CLINICA LUIS RAZETTI', 'CARACAS, ESQ. PTE REPUBLICA AV ESTE 2, CLINICA LUIS RAZETTI, 3, 53, LA CANDELARIA', '0212-1032048', 'J-00168870-1', null, 11);
insert into "affiliated" values (1, 'CENTRO MEDICO LOIRA', 'AV. LOIRA, URB. LOIRA, EL PARAISO. DISTRITO CAPITAL CIUDAD: CARACAS ZONA 1', '0212-1032041', 'J-00168870-4', null, 11);
insert into "affiliated" values (3, 'CLINICA ATIAS', 'CARACAS, AV. ROOSELVET, EDIFICIO CLINICA ATIAS, PISO P.B, OFICINA UNICO, URBANIZACION LOS ROSALES', '0295-0194599', 'J-00168870-6', null, 11);

insert into "budget" values (1, 1, now(), 12, '0012', '1726', 'REVASCULARIZACION QUIRURGICA DEL MIOCARDIO', 'REVASCULARIZACION QUIRURGICA', 'DIEGO', 'MARTINEZ');
insert into "budget" values (2, 2, now(), 12, '0013', '7152', 'apendiciti', 'extraccion de apendiciti', 'luis', 'cobos');
insert into "budget" values (3, 3, now(), 12, '0014', '9172', 'hernia lumbar', 'extraccion de hernia', 'qioto', 'salsido');
insert into "budget" values (4, 3, now(), 12, '0015', '3018', 'hombro dislocado', 'encaje de hombro', 'luz', 'fermin');


INSERT INTO "item" VALUES (1, 1, 'ELECTROCARDIOGRAMA', 'REQUERIMIENTOS', 2, 300.90);
INSERT INTO "item" VALUES (2, 1, 'RX TORAX (2P)', 'REQUERIMIENTOS', 2, 1200.00);
INSERT INTO "item" VALUES (3, 1, 'MEDICINAS', 'GASTOS HOSPITALIZACION', 1, 13000.00);
INSERT INTO "item" VALUES (4, 1, 'MATERIAL MÉDICO QUIRURGICO', 'GASTOS HOSPITALIZACION', 1, 100000.00);
INSERT INTO "item" VALUES (5, 1, 'CIRUJANO', 'SERVICIOS CLINICOS', 1, 180000.00);
INSERT INTO "item" VALUES (6, 1, 'PRIMER AYUDANTE', 'SERVICIOS CLINICOS', 1, 100000.8);
INSERT INTO "item" VALUES (7, 1, 'SEGUNDO AYUDANTE', 'SERVICIOS CLINICOS', 1, 100000.00);
INSERT INTO "item" VALUES (8, 1, 'CARDIOLOGO', 'SERVICIOS CLINICOS', 1, 190000.00);
INSERT INTO "item" VALUES (9, 1, 'MEDICO PERFUSIONISTA', 'SERVICIOS CLINICOS', 1, 200000.6);
INSERT INTO "item" VALUES (10, 1, 'ANESTESIOLOGO', 'SERVICIOS CLINICOS', 1, 200000.00);
INSERT INTO "item" VALUES (11, 1, 'LABORATORIO CLINICO', 'SERVICIOS CLINICOS', 2, 10000.00);
INSERT INTO "item" VALUES (12, 1, 'BANCO DE SANGRE RAZETTI', 'SERVICIOS CLINICOS', 1, 20800.00);
INSERT INTO "item" VALUES (13, 1, 'UNIDAD QUIRURGICA VASCULAR', 'SERVICIOS CLINICOS', 1, 17500.00);
INSERT INTO "item" VALUES (14, 1, 'SERVICIO INTEGRAL DE PABELLON', 'SERVICIOS CLINICOS', 1, 7500.00);
INSERT INTO "item" VALUES (15, 1, 'OXIDO NITROSO', 'SERVICIOS CLINICOS', 6, 1500.00);
INSERT INTO "item" VALUES (16, 1, 'INSTRUMENTAL QUIRURGICO', 'SERVICIOS CLINICOS', 1, 3500.00);
INSERT INTO "item" VALUES (17, 1, 'INSTRUMENTISTA', 'SERVICIOS CLINICOS', 1, 90500.00);
INSERT INTO "item" VALUES (18, 1, 'CIRULANTE', 'SERVICIOS CLINICOS', 1, 70000.00);
INSERT INTO "item" VALUES (39, 1, 'RECUPERACION', 'SERVICIOS CLINICOS', 1, 40000.00);
INSERT INTO "item" VALUES (19, 1, 'SERVICIO INTEGRAL HAB. TIPO A', 'SERVICIOS CLINICOS', 1, 60000.00);
INSERT INTO "item" VALUES (20, 1, 'MEDICO RESIDENTE', 'SERVICIOS CLINICOS', 1, 100000.00);
INSERT INTO "item" VALUES (21, 1, 'USO MAQUINA DE ANESTESIA', 'SERVICIOS CLINICOS', 1, 10000.00);
INSERT INTO "item" VALUES (22, 1, 'MANTA TERMICA', 'SERVICIOS CLINICOS', 2, 10000.00);
INSERT INTO "item" VALUES (23, 1, 'SERVICIO DE TERAPIA', 'SERVICIOS CLINICOS', 1, 10000.00);
INSERT INTO "item" VALUES (24, 1, 'BOMBA DE INFUSION', 'SERVICIOS CLINICOS', 19, 5000.00);
INSERT INTO "item" VALUES (25, 1, 'EQUIPO DE ASPIRACION', 'SERVICIOS CLINICOS', 1, 9000.00);
INSERT INTO "item" VALUES (26, 1, 'OXIMETRO (POR HORA)', 'SERVICIOS CLINICOS', 45, 800.20);
INSERT INTO "item" VALUES (27, 1, 'SERVICIO DE CUIDADOS INTERMEDIO', 'SERVICIOS CLINICOS', 1, 1800.00);
INSERT INTO "item" VALUES (28, 1, 'SERVICIO DE ENFEMERIA UTI', 'SERVICIOS CLINICOS', 1, 20800.00);
INSERT INTO "item" VALUES (29, 1, 'SERVICIO DE ENFEMERIA UCI', 'SERVICIOS CLINICOS', 1, 19600.00);
INSERT INTO "item" VALUES (40, 1, 'DIETETICA', 'SERVICIOS CLINICOS', 1, 9600.00);
INSERT INTO "item" VALUES (41, 1, 'MONITOR VERIDIA P-A UCI', 'SERVICIOS CLINICOS', 1, 6000.00);
INSERT INTO "item" VALUES (42, 1, 'DINAMAP (UTI)', 'SERVICIOS CLINICOS', 24, 1000.00);
INSERT INTO "item" VALUES (43, 1, 'SERVICIO DE TERAPIA INTENSIVA', 'SERVICIOS CLINICOS', 1, 3000.00);
INSERT INTO "item" VALUES (44, 1, 'LAB. CLINICO ALFREDO GOMEZ PERAZA', 'SERVICIOS CLINICOS', 1, 1700.00);


insert into "item" values (30, 2, 'quirofano (hora 1ra)', 'quirofano', 2, 300.09);
insert into "item" values (31, 2, 'quirofano (hora adicional)', 'quirofano', 4, 700.00);
insert into "item" values (32, 2, 'cirujano', 'honorarios medicos', 7, 40.99);
insert into "item" values (33, 2, '1er ayudante', 'honorarios medicos', 2, 900.99);
insert into "item" values (34, 3, 'quirofano (hora 1ra)', 'quirofano', 2, 300.09);
insert into "item" values (35, 3, 'quirofano (hora adicional)', 'quirofano', 4, 700.00);
insert into "item" values (36, 3, 'monitoreo', 'quirofano', 7, 40.99);
insert into "item" values (37, 3, 'farmacos', 'quirofano', 2, 900.99);
insert into "item" values (38, 4, 'servicio integral en hospitalizacion', 'hospitalizacion', 1, 900.99);

insert into "policy" values (1, 9, 9, now(), '2017-01-03', 900.01);
insert into "policy" values (2, 13, 13, now(), '2017-01-03', 900.01);
insert into "policy" values (3, 12, 12, now(), '2017-01-03', 900.01);

insert into "guaranteeLetter" values (1, 1, '0190', 10, 1, 1, now(), '2016-12-30', 7, 90);
insert into "guaranteeLetter" values (2, 2, '0191', 11, 2, 1, now(), '2016-12-29', 11, 88);
insert into "guaranteeLetter" values (3, 3, '0192', 12, 3, 1, now(), '2016-12-28', 11, 86);
insert into "guaranteeLetter" values (4, 1, '0193', 13, 4, 1, now(), '2016-12-27', 11, 84);

insert into "form" values (1);


INSERT INTO "question" VALUES (1, 1, 'IMPRESION GENERAL SOBRE LA INSTITUCION PRESTADORA DE SERVICIO');
INSERT INTO "question" VALUES (2, 1, 'ATENCION RECIBIDA POR PARTE DEL MEDICO TRATANTE');
INSERT INTO "question" VALUES (3, 1, 'ATENCION RECIBIDA POR PARTE DEL PERSONAL DE ENFEMERIA');
INSERT INTO "question" VALUES (4, 1, 'INFORMACION OFRECIDA POR EL PERSONAL CLINICO');
INSERT INTO "question" VALUES (5, 1, 'DOTACION DE EQUIPOS MEDICOS E INSTRUMENTAL');
INSERT INTO "question" VALUES (6, 1, 'LIMPIEZA DE ASEOS Y ZONAS COMUNES');
INSERT INTO "question" VALUES (7, 1, 'COMODIDAD DE LAS SALAS DE ESPERA E INSTALACIONES EN GENERAL');*/