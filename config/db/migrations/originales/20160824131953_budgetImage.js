
exports.up = function(knex, Promise) {
  return knex.schema.createTable('budgetImage', function(t) {
  	t.increments('id').primary();
  	t.integer('requestId').references('id').inTable('request').notNullable().onDelete('cascade');
    t.string('path').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('budgetImage');
};