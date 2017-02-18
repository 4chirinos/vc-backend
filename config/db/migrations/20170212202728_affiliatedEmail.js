
exports.up = function(knex, Promise) {
  return knex.schema.createTable('affiliatedEmail', function(t) {
  	t.increments('id').primary();
    t.integer('affiliatedId').references('id').inTable('affiliated').notNullable();
    t.string('email').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('affiliatedEmail');
};