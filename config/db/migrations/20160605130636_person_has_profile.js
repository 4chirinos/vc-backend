
exports.up = function(knex, Promise) {
  return knex.schema.createTable('person_has_personProfile', function(t) {
  	t.integer('id').references('id').inTable('person').notNullable();
  	t.integer('profileId').references('id').inTable('personProfile').notNullable();
  	t.primary(['id', 'profileId']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('person_has_personProfile');
};