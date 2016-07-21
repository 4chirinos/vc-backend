/*psql -h localhost -d visitadorclinico_development -U postgres*/
/*\i 'somedir\\script2.sql'*/

delete from "request";
delete from "guaranteeLetter";
delete from "session";
delete from "answer";
delete from "question";
delete from "form";
delete from "item";
delete from "budget";
delete from "affiliated";
delete from "user";
delete from "person";
delete from "profile";
delete from "profileType";
delete from "status";
delete from "statusType";


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


insert into "statusType" values (1, 'carta aval');
insert into "statusType" values (2, 'visita');

insert into "status" values (1, 'activada', 1);
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

insert into "profile" values (6, 'administrador', 2);
insert into "profile" values (7, 'analista', 2);
insert into "profile" values (8, 'coordinador', 2);
insert into "profile" values (9, 'visitador', 2);

insert into "person" values (1, '1234670', 'Julia', 'Ramirez', 'j.ramirez@email.com', 1);
insert into "person" values (2, '1234671', 'Carla', 'Pena', 'c.pena@email.com', 1);
insert into "person" values (3, '1234672', 'Jose', 'Gonzalez', 'j.gonzales@email.com', 2);
insert into "person" values (4, '1234673', 'Will', 'Turner', 'w.turner@email.com', 2);
insert into "person" values (5, '1234674', 'Luis', 'Rico', 'l.rico@email.com', 3);
insert into "person" values (6, '1234675', 'Maria', 'Nieves', 'm.nieves@email.com', 3);
insert into "person" values (7, '1234676', 'Elvion', 'Aponte', 'e.aponte@email.com', 3);
insert into "person" values (8, '1234677', 'Alex', 'Aguila', 'a.aguila@email.com', 3);

insert into "user" values (1, 1, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 7, true);
insert into "user" values (2, 2, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 7, true);
insert into "user" values (3, 3, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 8, true);
insert into "user" values (4, 4, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 8, true);
insert into "user" values (5, 5, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 9, true);
insert into "user" values (6, 6, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 9, true);
insert into "user" values (7, 7, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 9, true);

insert into "affiliated" values (1, 'Clinica Caracas', 'Av. Libertador. Centro de Caracas', '0212-1032048', 'J-00168870-1', null);
insert into "affiliated" values (2, 'Clinica del Interior', 'Calle Apure. Esquina La Plaza', '0212-1032041', 'J-00168870-4', null);
insert into "affiliated" values (3, 'Clinica Parroquial', 'Edificio Central', '0295-0194599', 'J-00168870-6', null);

insert into "budget" values (1, 1, now(), 12, '0012', '1726', 'Ulcera', 'Extraccion de ulcera', 'Jesus', 'Romero', '451701', 'Josefa', 'Colorado', 'Caracas');
insert into "budget" values (2, 2, now(), 12, '0013', '7152', 'Apendiciti', 'Extraccion de apendiciti', 'Jose', 'Vargas', '879172', 'Luis', 'Cobos', 'Apure');
insert into "budget" values (3, 3, now(), 12, '0014', '9172', 'Hernia lumbar', 'Extraccion de hernia', 'Wilber', 'Soto', '71826', 'Qioto', 'Salsido', 'Miranda');
insert into "budget" values (4, 3, now(), 12, '0015', '3018', 'Hombro dislocado', 'Encaje de hombro', 'Alejandra', 'Jaramillo', '61520', 'Luz', 'Fermin', 'La Guaira');

insert into "item" values (1, 1, 'Litro de alchol', 'concepto general', 2, 300.09);
insert into "item" values (2, 1, 'Cirugia de ulcera', 'concepto general', 4, 700.00);
insert into "item" values (3, 1, 'Analgesico', 'concepto general', 7, 40.99);
insert into "item" values (4, 1, 'Dia de hospitalizacion', 'concepto general', 2, 900.99);
insert into "item" values (5, 2, 'Litro de alchol', 'concepto general', 2, 300.09);
insert into "item" values (6, 2, 'Cirugia de apendiciti', 'concepto de honorario', 4, 700.00);
insert into "item" values (7, 2, 'Analgesico', 'concepto general', 7, 40.99);
insert into "item" values (8, 2, 'Dia de hospitalizacion', 'concepto general', 2, 900.99);
insert into "item" values (9, 3, 'Litro de alchol', 'concepto general', 2, 300.09);
insert into "item" values (10, 3, 'Extraccion de hernia', 'concepto general', 4, 700.00);
insert into "item" values (11, 3, 'Analgesico', 'concepto general', 7, 40.99);
insert into "item" values (12, 3, 'Dia de hospitalizacion', 'concepto general', 2, 900.99);
insert into "item" values (13, 4, 'Dia de hospitalizacion', 'concepto general', 1, 900.99);

insert into "guaranteeLetter" values (1, '0190', '001', '100001', 'Jose', 'Camacaro', '100002', 'Teresa', 'Bianco', 1, 1);
insert into "guaranteeLetter" values (2, '0191', '002', '100004', 'Freddy', 'Garcia', '100005', 'Richard', 'Hidalgo', 2, 1);
insert into "guaranteeLetter" values (3, '0192', '003', '100007', 'Jonny', 'Marin', '100008', 'Sofia', 'Vergara', 3, 1);
insert into "guaranteeLetter" values (4, '0193', '003', '100007', 'Jay', 'Marin', '100008', 'Estrella', 'Lopez', 4, 1);

insert into "request" values (1, 1, 2, 3, 5, 1, null, now(), null);
insert into "request" values (2, 2, 2, 4, 6, 2, null, now(), null);
insert into "request" values (3, 3, 2, 4, 7, 2, null, now(), null);