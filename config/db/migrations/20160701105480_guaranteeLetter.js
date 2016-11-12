
exports.up = function(knex, Promise) {
  return knex.schema.createTable('guaranteeLetter', function(t) {
  	t.increments('id').primary();
    t.integer('policyId').references('id').inTable('policy').notNullable();
  	t.string('code').unique().notNullable();
    t.integer('beneficiaryId').references('id').inTable('person').notNullable();
  	t.integer('budgetId').references('id').inTable('budget').unique().notNullable();
  	t.integer('statusId').references('id').inTable('status').notNullable();
  	t.dateTime('startDate').notNullable().defaultTo(knex.raw('now()'));
  	t.dateTime('endDate').nullable();
    t.integer('stateId').references('id').inTable('state').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('guaranteeLetter');
};