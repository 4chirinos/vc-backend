
exports.up = function(knex, Promise) {
  return knex.schema.createTable('person', function(t) {
  	t.increments('id').primary();
  	t.string('identityCard').unique().notNullable();
  	t.string('firstName').notNullable();
  	t.string('lastName').notNullable();
  	t.string('email').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('person');
};
