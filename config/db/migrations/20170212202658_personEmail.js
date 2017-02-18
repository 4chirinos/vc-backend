
exports.up = function(knex, Promise) {
  return knex.schema.createTable('personEmail', function(t) {
  	t.increments('id').primary();
    t.integer('personId').references('id').inTable('person').notNullable();
    t.string('email').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('personEmail');
};
