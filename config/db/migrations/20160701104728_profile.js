
exports.up = function(knex, Promise) {
  return knex.schema.createTable('profile', function(t) {
  	t.increments('id').primary();
  	t.string('profile').notNullable();
  	t.integer('typeId').references('id').inTable('profileType').notNullable();
  	t.unique(['profile', 'typeId']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profile');
};
