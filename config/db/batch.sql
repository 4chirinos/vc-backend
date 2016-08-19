/*psql -h localhost -d visitadorclinico_development -U postgres*/
/*\i 'batch.sql'*/

delete from "request";
delete from "guaranteeLetter";
delete from "policy";
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
alter sequence "policy_id_seq" restart with 100;


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
insert into "profile" values (4, 'cliente', 1);

insert into "profile" values (6, 'administrador', 2);
insert into "profile" values (7, 'analista', 2);
insert into "profile" values (8, 'coordinador', 2);
insert into "profile" values (9, 'visitador', 2);

insert into "person" values (16, 'analista', 'analista', 'analista', 'analista@email.com', 1, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (17, 'coordinador', 'coordinador', 'coordinador', 'coordinador@email.com', 2, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (18, 'visitador', 'visitador', 'visitador', 'visitador@email.com', 3, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "user" values (8, 16, '$2a$08$rCHFWUpjgqBGgOvFFaplkOJaFpulwl/Ez5IAzdTeoIkLAi4BDwIVm', 7, true);
insert into "user" values (9, 17, '$2a$08$szk2fFxersgn4fIVF5dNp.NckBEipIHMJMfiFeazmovgnXRa7Tv9q', 8, true);
insert into "user" values (10, 18, '$2a$08$lhIxARKkxZK5cXHtpVV/deucrRNQwDSbn8Sgow7YMDOtLyLIH5XDK', 9, true);

insert into "person" values (1, '1234670', 'julia', 'ramirez', 'j.ramirez@email.com', 1, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (2, '1234671', 'carla', 'pena', 'c.pena@email.com', 1, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (3, '1234672', 'jose', 'gonzalez', 'j.gonzales@email.com', 2, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (4, '1234673', 'will', 'turner', 'w.turner@email.com', 2, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (5, '1234674', 'luis', 'rico', 'l.rico@email.com', 3, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (6, '1234675', 'maria', 'nieves', 'm.nieves@email.com', 3, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (7, '1234676', 'elvion', 'aponte', 'e.aponte@email.com', 3, '2016-09-01', 'direccion', 'F', '0212-1032048');

insert into "person" values (9, '1234678', 'jesus', 'romero', 'j.romero@email.com', 4, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (10, '1234679', 'josue', 'zambrano', 'j.zambrano@email.com', 4, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (11, '1234680', 'paola', 'aguila', 'p.aguila@email.com', 4, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (12, '1234681', 'antonia', 'lopez', 'a.lopez@email.com', 4, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (13, '1234682', 'victor', 'vendetta', 'v.vendetta@email.com', 4, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (14, '1234683', 'victoria', 'sigil', 'v.sirgil@email.com', 4, '2016-09-01', 'direccion', 'F', '0212-1032048');
insert into "person" values (15, '1234684', 'antonieta', 'bermudez', 'a.bermudez@email.com', 4, '2016-09-01', 'direccion', 'F', '0212-1032048');

insert into "user" values (1, 1, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 7, true);
insert into "user" values (2, 2, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 7, true);
insert into "user" values (3, 3, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 8, true);
insert into "user" values (4, 4, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 8, true);
insert into "user" values (5, 5, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 9, true);
insert into "user" values (6, 6, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 9, true);
insert into "user" values (7, 7, '$2a$08$1grShjEbFIfEo8tijGboWuxvCTn4slhzDlkUgQjgk4jsm4dF8YCJK', 9, true);

insert into "affiliated" values (1, 'clinica caracas', 'av. libertador. centro de caracas', '0212-1032048', 'J-00168870-1', null);
insert into "affiliated" values (2, 'clinica del interior', 'calle apure. esquina la plaza', '0212-1032041', 'J-00168870-4', null);
insert into "affiliated" values (3, 'clinica parroquial', 'edificio central', '0295-0194599', 'J-00168870-6', null);

insert into "budget" values (1, 1, now(), 12, '0012', '1726', 'ulcera', 'extraccion de ulcera', 'jesus', 'romero', '451701', 'josefa', 'colorado', 'caracas', '');
insert into "budget" values (2, 2, now(), 12, '0013', '7152', 'apendiciti', 'extraccion de apendiciti', 'jose', 'vargas', '879172', 'luis', 'cobos', 'apure', '');
insert into "budget" values (3, 3, now(), 12, '0014', '9172', 'hernia lumbar', 'extraccion de hernia', 'wilber', 'soto', '71826', 'qioto', 'salsido', 'miranda', '');
insert into "budget" values (4, 3, now(), 12, '0015', '3018', 'hombro dislocado', 'encaje de hombro', 'alejandra', 'jaramillo', '61520', 'luz', 'fermin', 'la guaira', '');

insert into "item" values (1, 1, 'quirofano (hora 1ra)', 'quirofano', 2, 300.09);
insert into "item" values (2, 1, 'quirofano (hora adicional)', 'quirofano', 4, 700.00);
insert into "item" values (3, 1, 'monitoreo', 'quirofano', 7, 40.99);
insert into "item" values (4, 1, 'suministros medicos quirurgicos', 'quirofano', 2, 900.99);
insert into "item" values (5, 2, 'quirofano (hora 1ra)', 'quirofano', 2, 300.09);
insert into "item" values (6, 2, 'quirofano (hora adicional)', 'quirofano', 4, 700.00);
insert into "item" values (7, 2, 'cirujano', 'honorarios medicos', 7, 40.99);
insert into "item" values (8, 2, '1er ayudante', 'honorarios medicos', 2, 900.99);
insert into "item" values (9, 3, 'quirofano (hora 1ra)', 'quirofano', 2, 300.09);
insert into "item" values (10, 3, 'quirofano (hora adicional)', 'quirofano', 4, 700.00);
insert into "item" values (11, 3, 'monitoreo', 'quirofano', 7, 40.99);
insert into "item" values (12, 3, 'farmacos', 'quirofano', 2, 900.99);
insert into "item" values (13, 4, 'servicio integral en hospitalizacion', 'hospitalizacion', 1, 900.99);

insert into "policy" values (1, 9, 9, now(), '2017-01-03', 900.01);
insert into "policy" values (2, 13, 13, now(), '2017-01-03', 900.01);
insert into "policy" values (3, 12, 12, now(), '2017-01-03', 900.01);

insert into "guaranteeLetter" values (1, 1, '0190', 10, 1, 1);
insert into "guaranteeLetter" values (2, 1, '0191', 10, 2, 1);
insert into "guaranteeLetter" values (3, 1, '0192', 10, 3, 1);

/*insert into "request" values (1, 1, 2, null, null, null, null, now(), null);
insert into "request" values (2, 2, 2, null, null, null, null, now(), null);
insert into "request" values (3, 3, 2, null, null, null, null, now(), null);*/