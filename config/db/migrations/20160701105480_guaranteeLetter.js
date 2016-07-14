
exports.up = function(knex, Promise) {
  return knex.schema.createTable('guaranteeLetter', function(t) {
  	t.increments('id').primary();
    t.string('policy').notNullable();
    t.string('treatment').notNullable();
    t.string('holderIdentityCard').notNullable();
    t.string('holderFirstName').notNullable();
    t.string('holderLastName').notNullable();
  	t.string('ownerIdentityCard').notNullable();
  	t.string('ownerFirstName').notNullable();
  	t.string('ownerLastName').notNullable();
  	t.string('beneficiaryIdentityCard').notNullable();
  	t.string('beneficiaryFirstName').notNullable();
  	t.string('beneficiaryLastName').notNullable();
  	t.integer('budgetId').references('id').inTable('budget').unique().notNullable();
  	t.integer('statusId').references('id').inTable('status').notNullable();
  	t.string('path').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('guaranteeLetter');
};