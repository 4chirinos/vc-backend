
exports.up = function(knex, Promise) {
  return knex.schema.createTable('budget', function(t) {
  	t.increments('id').primary();
  	t.integer('personId').references('id').inTable('person').unique().notNullable();
  	t.boolean('assigned').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('budget');
};