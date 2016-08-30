
exports.up = function(knex, Promise) {
  return knex.schema.createTable('person', function(t) {
  	t.increments('id').primary();
  	t.string('identityCard').unique().notNullable();
  	t.string('firstName').notNullable();
  	t.string('lastName').notNullable();
  	t.string('email').unique().notNullable();
  	t.integer('profileId').references('id').inTable('profile').notNullable();
  	t.dateTime('birthDate').notNullable().defaultTo(knex.raw('now()'));
  	t.string('address').notNullable();
  	t.string('gender').notNullable();
  	t.string('phoneNumber').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('person');
};
