
exports.up = function(knex, Promise) {
  return knex.schema.createTable('profileType', function(t) {
  	t.increments('id').primary();
  	t.string('type').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profileType');
};