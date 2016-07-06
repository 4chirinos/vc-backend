
exports.up = function(knex, Promise) {
  return knex.schema.createTable('request', function(t) {
  	t.increments('id').primary();
  	t.integer('guaranteeLetterId').references('id').inTable('guaranteeLetter').unique().notNullable();
  	t.integer('statusId').references('id').inTable('status').notNullable();
  	t.integer('coordinatorId').references('id').inTable('person').nullable();
  	t.integer('visitorId').references('id').inTable('person').nullable();
    t.integer('analystId').references('id').inTable('person').notNullable();
    t.integer('formId').references('id').inTable('form').unique().nullable();
  	t.dateTime('startDate').notNullable().defaultTo(knex.raw('now()'));
  	t.date('endDate').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('request');
};