
exports.up = function(knex, Promise) {
  return knex.schema.createTable('affiliated', function(t) {
  	t.increments('id').primary();
  	t.string('name').unique().notNullable();
  	t.string('address').unique().notNullable();
  	t.string('phoneNumber').unique().notNullable();
  	t.string('rif').unique().notNullable();
  	t.string('portal').unique().nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('affiliated');
};