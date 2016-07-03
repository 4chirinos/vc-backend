
exports.up = function(knex, Promise) {
  return knex.schema.createTable('question', function(t) {
  	t.increments('id').primary();
  	t.string('question').unique().notNullable();
  	/*t.integer('statusId').references('id').inTable('status').notNullable();*/
  	t.boolean('available').notNullable().defaultTo(true); /*cableando el status*/
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('question');
};