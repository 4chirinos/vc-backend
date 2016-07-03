
exports.up = function(knex, Promise) {
  return knex.schema.createTable('answer', function(t) {
  	t.increments('id').primary();
  	t.integer('formId').references('id').inTable('form').notNullable();
  	t.integer('questionId').references('id').inTable('question').notNullable();
  	t.enu('answer', ['1', '2', '3', '4', '5']).notNullable();
  	t.unique(['formId', 'questionId']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('answer');
};