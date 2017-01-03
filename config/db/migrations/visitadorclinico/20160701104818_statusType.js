
exports.up = function(knex, Promise) {
  return knex.schema.createTable('statusType', function(t) {
  	t.increments('id').primary();
  	t.string('type').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('statusType');
};