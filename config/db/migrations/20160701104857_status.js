
exports.up = function(knex, Promise) {
  return knex.schema.createTable('status', function(t) {
  	t.increments('id').primary();
  	t.string('status').notNullable();
  	t.integer('typeId').references('id').inTable('statusType').notNullable();
  	t.unique(['status', 'typeId']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('status');
};