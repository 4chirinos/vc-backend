
exports.up = function(knex, Promise) {
  return knex.schema.createTable('affiliated', function(t) {
  	t.increments('id').primary();
  	t.string('name').unique().notNullable();
  	t.string('address').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('affiliated');
};