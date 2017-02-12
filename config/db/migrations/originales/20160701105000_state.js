
exports.up = function(knex, Promise) {
  return knex.schema.createTable('state', function(t) {
  	t.increments('id').primary();
    t.string('stateName').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('state');
};