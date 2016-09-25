
exports.up = function(knex, Promise) {
  return knex.schema.createTable('question', function(t) {
  	t.increments('id').primary();
  	t.integer('formId').references('id').inTable('form').notNullable().onDelete('cascade');;
  	t.string('question').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('question');
};