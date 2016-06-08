
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_has_userProfile', function(t) {
  	t.integer('id').references('id').inTable('user').notNullable();
  	t.integer('profileId').references('id').inTable('userProfile').notNullable();
  	t.primary(['id', 'profileId']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_has_userProfile');
};