
exports.up = function(knex, Promise) {
  return knex.schema.createTable('budget', function(t) {
  	t.increments('id').primary();
  	t.integer('affiliatedId').references('id').inTable('affiliated').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('budget');
};