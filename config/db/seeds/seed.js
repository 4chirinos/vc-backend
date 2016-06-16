
exports.seed = function(knex, Promise) {

	var arr = [
		{identityCard: '100', firstName: 'pedro', lastName: 'perez', email: 'pedro.perez@email.com'},
		{identityCard: '200', firstName: 'maria', lastName: 'lopez', email: 'maria.lopez@email.com'},
		{identityCard: '300', firstName: 'jose', lastName: 'ruiz', email: 'jose.ruiz@email.com'}
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
