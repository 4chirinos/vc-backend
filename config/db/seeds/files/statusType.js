
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('statusType').del(),

    knex('statusType').insert({id: 1, type: 'carta aval'})
    
  );
};
