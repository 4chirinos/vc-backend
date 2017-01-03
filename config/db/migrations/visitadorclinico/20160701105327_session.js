
exports.up = function(knex, Promise) {
  return knex.schema.createTable('session', function(t) {
  	t.increments('id').primary();
  	t.integer('userId').references('id').inTable('user').unique().notNullable();
  	t.string('token').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('session');
};