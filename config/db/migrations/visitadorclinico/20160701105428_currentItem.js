
exports.up = function(knex, Promise) {
  return knex.schema.createTable('currentItem', function(t) {
  	t.increments('id').primary();
  	t.integer('currentBudgetId').references('id').inTable('currentBudget').notNullable();
  	t.string('description').notNullable();
  	t.string('concept').notNullable();
  	t.integer('quantity').notNullable();
  	t.float('cost').notNullable();
  	t.unique(['currentBudgetId', 'description']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('currentItem');
};