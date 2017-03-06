
exports.up = function(knex, Promise) {
  return knex.schema.createTable('budget', function(t) {
  	//t.increments('id').primary();
    t.primary(['id', 'version']);
    t.specificType('id','serial').notNullable();
    t.integer('version').notNullable();
    t.dateTime('startVersion').notNullable();
    t.dateTime('endVersion').defaultTo(null);
  	t.integer('affiliatedId').references('id').inTable('affiliated').notNullable();
  	t.dateTime('startDate').notNullable();
  	t.integer('days').notNullable();
  	t.string('code').notNullable();
  	t.string('history').notNullable();
  	t.string('diagnosis').notNullable();
  	t.string('treatment').notNullable();
  	//t.string('patientFirstName').notNullable();
  	//t.string('patientLastName').notNullable();
  	//t.string('patientIdentityCard').notNullable();
  	t.string('doctorFirstName').notNullable();
  	t.string('doctorLastName').notNullable();
    //t.string('location').notNullable();
    //t.integer('stateId').references('id').inTable('state').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('budget');
};
