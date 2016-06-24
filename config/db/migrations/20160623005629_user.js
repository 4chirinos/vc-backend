
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(t) {
  	t.increments('id').primary();
  	t.integer('personId').references('id').inTable('person').unique().notNullable();
  	t.string('password').notNullable();
  	t.boolean('available').notNullable().defaultTo(true);
  	t.integer('profileId').references('id').inTable('profile').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
