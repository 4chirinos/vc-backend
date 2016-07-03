
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item', function(t) {
  	t.increments('id').primary();
  	t.integer('budgetId').references('id').inTable('budget').notNullable();
  	t.string('description').notNullable();
  	t.integer('quantity').notNullable();
  	t.float('cost').notNullable();
  	t.unique(['budgetId', 'description']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item');
};