
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(t) {
  	t.increments('id').primary();
  	t.integer('requestId').references('id').inTable('request').notNullable().onDelete('cascade');
  	t.integer('commenterId').references('id').inTable('user').notNullable();
    t.string('comment').notNullable();
    t.dateTime('date').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment');
};