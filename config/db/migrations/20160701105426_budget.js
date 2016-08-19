
exports.up = function(knex, Promise) {
  return knex.schema.createTable('budget', function(t) {
  	t.increments('id').primary();
  	t.integer('affiliatedId').references('id').inTable('affiliated').notNullable();
  	t.date('startDate').notNullable();
  	t.integer('days').notNullable();
  	t.string('code').unique().notNullable();
  	t.string('history').notNullable();
  	t.string('diagnosis').notNullable();
  	t.string('treatment').notNullable();
  	t.string('patientFirstName').notNullable();
  	t.string('patientLastName').notNullable();
  	t.string('patientIdentityCard').notNullable();
  	t.string('doctorFirstName').notNullable();
  	t.string('doctorLastName').notNullable();
    t.string('location').notNullable();
    t.string('paths').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('budget');
};