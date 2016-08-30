
exports.up = function(knex, Promise) {
  return knex.schema.createTable('request', function(t) {
  	t.increments('id').primary();
  	t.integer('guaranteeLetterId').references('id').inTable('guaranteeLetter').notNullable();
  	t.integer('statusId').references('id').inTable('status').notNullable();
  	t.integer('coordinatorId').references('id').inTable('user').nullable().defaultTo(null);
  	t.integer('visitorId').references('id').inTable('user').nullable().defaultTo(null);
    t.integer('analystId').references('id').inTable('user').nullable().defaultTo(null);
    t.integer('formId').references('id').inTable('form').unique().notNullable();
  	t.dateTime('startDate').notNullable().defaultTo(knex.raw('now()'));
  	t.dateTime('endDate').nullable().defaultTo(null);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('request');
};