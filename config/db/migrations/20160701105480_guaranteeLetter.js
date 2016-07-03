
exports.up = function(knex, Promise) {
  return knex.schema.createTable('guaranteeLetter', function(t) {
  	t.increments('id').primary();
  	t.integer('ownerId').references('id').inTable('person').notNullable();
  	t.integer('beneficiaryId').references('id').inTable('person').notNullable();
  	t.integer('budgetId').references('id').inTable('budget').notNullable();
  	t.integer('affiliatedId').references('id').inTable('affiliated').notNullable();
  	t.integer('statusId').references('id').inTable('status').notNullable();
  	t.string('path').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('guaranteeLetter');
};