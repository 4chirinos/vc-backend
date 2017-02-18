
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(t) {
  	t.increments('id').primary();
  	

    t.integer('personId').references('id').inTable('person').unique().notNullable();
  	//t.integer('personId').unique().notNullable(); // referencia a la bd core


    t.string('password').notNullable();
  	t.string('userName').unique().notNullable();
  	t.integer('profileId').references('id').inTable('profile').notNullable();
  	
  	t.boolean('available').notNullable().defaultTo(true); /*cableando el status*/
  	
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
