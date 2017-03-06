
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item', function(t) {
  	t.increments('id').primary();
    t.integer('budgetId').notNullable();
    t.integer('version').notNullable();
  	//t.integer('budgetId').references('id').inTable('budget').notNullable();
    //t.integer('version').references('version').inTable('budget').notNullable();
  	t.string('description').notNullable();
  	t.string('concept').notNullable();
  	t.integer('quantity').notNullable();
  	t.float('cost').notNullable();
  	//t.unique(['budgetId', 'description']);
    t.foreign(['budgetId', 'version']).references(['id', 'version']).inTable('budget').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item');
};