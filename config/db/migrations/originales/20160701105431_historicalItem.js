
exports.up = function(knex, Promise) {
  return knex.schema.createTable('historicalItem', function(t) {
  	t.increments('id').primary();
  	//t.integer('budgetId').references('id').inTable('budget').notNullable();
    t.integer('itemId').references('id').inTable('item').notNullable();
  	t.string('description').notNullable();
  	t.string('concept').notNullable();
  	t.integer('quantity').notNullable();
  	t.float('cost').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('historicalItem');
};