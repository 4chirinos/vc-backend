
exports.up = function(knex, Promise) {
  return knex.schema.createTable('affiliated', function(t) {
  	t.increments('id').primary();
  	t.string('name').unique().notNullable();
  	t.string('address').notNullable();
  	t.string('phoneNumber').notNullable();
  	t.string('rif').unique().notNullable();
  	t.string('portal').unique().nullable();
  	t.integer('stateId').references('id').inTable('state').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('affiliated');
};