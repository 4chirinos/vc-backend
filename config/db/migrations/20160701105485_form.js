
exports.up = function(knex, Promise) {
  return knex.schema.createTable('form', function(t) {
  	t.increments('id').primary();
  	//t.string('name').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('form');
};