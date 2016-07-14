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

insert into "affiliated" values (1, 'Clinica Caracas', 'Av. Libertador. Centro de Caracas');
insert into "affiliated" values (2, 'Clinica del Interior', 'Calle Apure. Esquina La Plaza');
insert into "affiliated" values (3, 'Clinica Parroquial', 'Edificio Central');

insert into "budget" values (1, 1);
insert into "budget" values (2, 2);
insert into "budget" values (3, 3);

insert into "item" values (1, 1, 'Litro de alchol', 2, 300.09);
insert into "item" values (2, 1, 'Extraccion de hernia', 4, 700.00);
insert into "item" values (3, 1, 'Analgesico', 7, 40.99);
insert into "item" values (4, 1, 'Dia de hospitalizacion', 2, 900.99);
insert into "item" values (5, 2, 'Litro de alchol', 2, 300.09);
insert into "item" values (6, 2, 'Extraccion de hernia', 4, 700.00);
insert into "item" values (7, 2, 'Analgesico', 7, 40.99);
insert into "item" values (8, 2, 'Dia de hospitalizacion', 2, 900.99);
insert into "item" values (9, 3, 'Litro de alchol', 2, 300.09);
insert into "item" values (10, 3, 'Extraccion de hernia', 4, 700.00);
insert into "item" values (11, 3, 'Analgesico', 7, 40.99);
insert into "item" values (12, 3, 'Dia de hospitalizacion', 2, 900.99);

insert into "guaranteeLetter" values (1, '001', 'Extraccion de hernia', '100001', 'Jose', 'Camacaro', '100002', 'Teresa', 'Bianco', '100003', 'Carla', 'Duran', 1, 1, 'path1');
insert into "guaranteeLetter" values (2, '002', 'Extraccion de hernia', '100004', 'Freddy', 'Garcia', '100005', 'Richard', 'Hidalgo', '100006', 'Cait', 'Rubion', 2, 1, 'path2');
insert into "guaranteeLetter" values (3, '003', 'Extraccion de hernia', '100007', 'Jonny', 'Marin', '100008', 'Sofia', 'Vergara', '100009', 'July', 'Colmenares', 3, 1, 'path3');

insert into "request" values (1, 1, 2, 3, 5, 1, null, now(), null);