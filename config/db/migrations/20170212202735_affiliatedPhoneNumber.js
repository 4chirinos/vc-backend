
exports.up = function(knex, Promise) {
  return knex.schema.createTable('affiliatedPhoneNumber', function(t) {
  	t.increments('id').primary();
    t.integer('affiliatedId').references('id').inTable('affiliated').notNullable();
    t.string('phoneNumber').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('affiliatedPhoneNumber');
};