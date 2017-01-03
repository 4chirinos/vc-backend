'use strict'

const Knex = require('knex');
const Promise = require('bluebird');
const extend = require('xtend');
const format = require('util').format;
const settings = require('./databaseSettings');
const databases = ['visitadorclinico_development', 'core_development'];
const env = process.env.NODE_ENV || 'development';

Promise.map(databases, function (database) {
  return {
    name: database,
    settings: settings[database]
  }
})
.filter(function (database) {
	return database.settings[env];
})
.bind({
  clients: []
})
.map(function (database) {
  const client = Knex({
    client: 'pg',
    connection: database.settings[env].connection
  })
  this.clients.push(client)
  return extend(database.settings[env], {
    knex: client
  })
})
.map(function (database) {
  /*return database.knex.migrate.latest()
    .then(function () {
      console.log('%s database migrations complete', database.connection.database)
    })*/
  return database.knex.migrate.latest({
    directory: database.migrations.directory
    //directory: format('./migrations/%s', database.name)
  })
})
.then(function () {
  console.log('All migrations complete')
})
.finally(function () {
  return Promise.map(this.clients, function (knex) {
    return knex.destroy()
  })
})
.catch(function (err) {
  console.log(err)
  process.exit(1)
})