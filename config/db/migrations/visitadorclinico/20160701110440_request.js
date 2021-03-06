
exports.up = function(knex, Promise) {
  return knex.schema.createTable('request', function(t) {
  	t.increments('id').primary();
  	

    //t.integer('guaranteeLetterId').references('id').inTable('guaranteeLetter').notNullable();
  	t.integer('guaranteeLetterId').notNullable(); // referencia a la bd core


    t.integer('statusId').references('id').inTable('status').notNullable();
  	t.integer('coordinatorId').references('id').inTable('user').nullable().defaultTo(null);
  	t.integer('visitorId').references('id').inTable('user').nullable().defaultTo(null);
    t.integer('analystId').references('id').inTable('user').nullable().defaultTo(null);
    t.integer('formId').references('id').inTable('form').notNullable();
  	t.dateTime('startDate').notNullable().defaultTo(knex.raw('now()'));
  	t.dateTime('endDate').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('request');
};