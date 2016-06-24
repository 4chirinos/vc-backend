
exports.up = function(knex, Promise) {
  return knex.schema.createTable('session', function(t) {
  	t.integer('id').references('id').inTable('user').unique().notNullable();
  	t.string('token').unique().notNullable();
  	t.primary(['id', 'token']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('session');
};