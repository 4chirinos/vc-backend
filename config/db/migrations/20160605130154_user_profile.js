
exports.up = function(knex, Promise) {
  return knex.schema.createTable('userProfile', function(t) {
  	t.increments('id').primary();
  	t.string('profile').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('userProfile');
};