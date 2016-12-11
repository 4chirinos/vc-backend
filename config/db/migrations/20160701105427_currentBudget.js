exports.up = function(knex, Promise) {
  return knex.schema.createTable('currentBudget', function(t) {
  	t.increments('id').primary();
  	t.integer('budgetId').references('id').inTable('budget').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('currentBudget');
};