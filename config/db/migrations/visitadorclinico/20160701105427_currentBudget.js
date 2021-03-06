exports.up = function(knex, Promise) {
  return knex.schema.createTable('currentBudget', function(t) {
  	t.increments('id').primary();

  	//t.integer('budgetId').references('id').inTable('budget').notNullable();
  	t.integer('budgetId').notNullable(); // referencia a la bd core
  
  	t.dateTime('startDate').notNullable().defaultTo(knex.raw('now()'));
  	
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('currentBudget');
};