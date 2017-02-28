
exports.up = function(knex, Promise) {
  return knex.schema.createTable('personPhoneNumber', function(t) {
  	t.increments('id').primary();
    t.integer('personId').references('id').inTable('person').notNullable();
    t.string('phoneNumber').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('personPhoneNumber');
};