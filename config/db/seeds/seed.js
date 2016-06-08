
exports.seed = function(knex, Promise) {

	var arr = [
		{identityCard: '4', firstName: 'Pedro', lastName: 'Perez', email: 'pedro.perez'},
		{identityCard: '5', firstName: 'Maria', lastName: 'Lopez', email: 'maria.lopez'},
		{identityCard: '6', firstName: 'Jose', lastName: 'Ruiz', email: 'jose.ruiz'}
	];


  return Promise.join(
    // Deletes ALL existing entries
    knex('person').del(),

    knex('person').insert(arr)

    // Inserts seed entries
    /*knex('person').insert({identityCard: '1', firstName: 'Pedro', lastName: 'Perez', email: 'pedro.perez'}),
    knex('person').insert({identityCard: '2', firstName: 'Maria', lastName: 'Lopez', email: 'maria.lopez'}),
    knex('person').insert({identityCard: '3', firstName: 'Jose', lastName: 'Ruiz', email: 'jose.ruiz'})*/
  );
};
