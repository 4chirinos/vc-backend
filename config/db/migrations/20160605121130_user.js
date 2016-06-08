
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(t) {
  	t.increments('id').primary();
  	t.integer('personId').references('id').inTable('person').unique().notNullable();
  	t.string('password').notNullable();
  	t.boolean('availabe').notNullable().defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
