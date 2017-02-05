
exports.up = function(knex, Promise) {
  return knex.schema.createTable('answer', function(t) {
  	t.increments('id').primary();
  	t.integer('requestId').references('id').inTable('request').notNullable().onDelete('cascade');
  	t.integer('questionId').references('id').inTable('question').notNullable().onDelete('cascade');
  	t.integer('questionId').references('id').inTable('question').notNullable().onDelete('cascade');
  	t.enu('answer', ['1', '2', '3', '4', '5']).nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('answer');
};