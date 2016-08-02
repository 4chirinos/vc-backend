
exports.up = function(knex, Promise) {
  return knex.schema.createTable('policy', function(t) {
  	t.increments('id').primary();
    t.integer('holderId').references('id').inTable('person').notNullable();
  	t.integer('ownerId').references('id').inTable('person').notNullable();
  	t.date('startDate').notNullable().defaultTo(knex.raw('now()'));
  	t.date('endDate').nullable();
    t.float('cost').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('policy');
};