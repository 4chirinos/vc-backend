
exports.up = function(knex, Promise) {
  return knex.schema.createTable('requestForm', function(t) {
  	t.increments('id').primary();
  	t.integer('requestId').references('id').inTable('request').notNullable().onDelete('cascade');
    t.dateTime('date').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('request_form');
};