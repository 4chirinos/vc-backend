var Faker = require('Faker');

exports.seed = function(knex, Promise) {

  var  asegurados = 1, coordinadores = 1, visitadores = 3, beneficiarios = 1,
    analistas = 1, id = '1234', seq = 0;


  return knex('guaranteeLetter').del().then(function() {

    return knex('session').del().then(function() {

      return knex('answer').del().then(function() {

        return knex('question').del().then(function() {

          return knex('form').del().then(function() {

            return knex('item').del().then(function() {

              return knex('budget').del().then(function() {

                return knex('affiliated').del().then(function() {

                  return knex('user').del().then(function() {
                    
                    return knex('person').del().then(function() {

                      return knex('profile').del().then(function() {

                        return knex('profileType').del().then(function() {

                          return knex('status').del().then(function() {

                            return knex('statusType').del().then(function() {


                              var tipoPerfil = [];

                              tipoPerfil.push({type: 'persona'});
                              tipoPerfil.push({type: 'usuario'});

                              return knex('profileType').insert(tipoPerfil).returning('*').then(function(tipoPerfil) {

                                var perfiles = [];

                                perfiles.push({profile: 'analista', typeId: tipoPerfil[0].id});
                                perfiles.push({profile: 'coordinador', typeId: tipoPerfil[0].id});
                                perfiles.push({profile: 'visitador', typeId: tipoPerfil[0].id});
                                perfiles.push({profile: 'asegurado', typeId: tipoPerfil[0].id});
                                perfiles.push({profile: 'beneficiario', typeId: tipoPerfil[0].id});

                                perfiles.push({profile: 'administrador', typeId: tipoPerfil[1].id});
                                perfiles.push({profile: 'analista', typeId: tipoPerfil[1].id});
                                perfiles.push({profile: 'coordinador', typeId: tipoPerfil[1].id});
                                perfiles.push({profile: 'visitador', typeId: tipoPerfil[1].id});

                              
                                return knex('profile').insert(perfiles).returning('*').then(function(perfiles) {

                                  var personas = [];

                                  for(var i = 0; i < analistas; i++) {
                                    personas.push({
                                      identityCard: id + seq++,
                                      firstName: Faker.Name.firstName().toLowerCase(),
                                      lastName: Faker.Name.lastName().toLowerCase(),
                                      email: Faker.Internet.email().toLowerCase(),
                                      profileId: perfiles[0].id
                                    });
                                  }

                                  for(var i = 0; i < coordinadores; i++) {
                                    personas.push({
                                      identityCard: id + seq++,
                                      firstName: Faker.Name.firstName().toLowerCase(),
                                      lastName: Faker.Name.lastName().toLowerCase(),
                                      email: Faker.Internet.email().toLowerCase(),
                                      profileId: perfiles[1].id
                                    });
                                  }

                                  for(var i = 0; i < visitadores; i++) {
                                    personas.push({
                                      identityCard: id + seq++,
                                      firstName: Faker.Name.firstName().toLowerCase(),
                                      lastName: Faker.Name.lastName().toLowerCase(),
                                      email: Faker.Internet.email().toLowerCase(),
                                      profileId: perfiles[2].id
                                    });
                                  }

                                  for(var i = 0; i < asegurados; i++) {
                                    personas.push({
                                      identityCard: id + seq++,
                                      firstName: Faker.Name.firstName().toLowerCase(),
                                      lastName: Faker.Name.lastName().toLowerCase(),
                                      email: Faker.Internet.email().toLowerCase(),
                                      profileId: perfiles[3].id
                                    });
                                  }

                                  for(var i = 0; i < beneficiarios; i++) {
                                    personas.push({
                                      identityCard: id + seq++,
                                      firstName: Faker.Name.firstName().toLowerCase(),
                                      lastName: Faker.Name.lastName().toLowerCase(),
                                      email: Faker.Internet.email().toLowerCase(),
                                      profileId: perfiles[4].id
                                    });
                                  }

                                  return knex('person').insert(personas).returning('*').then(function(personas) {

                                    var afiliadas = [{
                                      name: 'Clínica Federal',
                                      address: 'Plaza Venezuela'
                                    },
                                    {
                                      name: 'Clínica Minalva',
                                      address: 'El Ávila'
                                    }];

                                    return knex('affiliated').insert(afiliadas).returning('*').then(function(afiliadas) {

                                      return knex('budget').insert({affiliatedId: afiliadas[0].id}).returning('*').then(function(presupuestos) {

                                        var items = [{
                                          budgetId: presupuestos[0].id,
                                          description: 'Día de hospitalización',
                                          quantity: 3,
                                          cost: 123.54
                                        },{
                                          budgetId: presupuestos[0].id,
                                          description: 'Relajante muscular',
                                          quantity: 2,
                                          cost: 10.50
                                        },{
                                          budgetId: presupuestos[0].id,
                                          description: 'Suero sanguíneo',
                                          quantity: 5,
                                          cost: 20
                                        }];

                                        return knex('item').insert(items).returning('*').then(function(items) {

                                          var tipoStatus = [];

                                          tipoStatus.push({type: 'carta aval'});

                                          return knex('statusType').insert(tipoStatus).returning('*').then(function(tipoStatus) {

                                            var status = {
                                              typeId: tipoStatus[0].id,
                                              status: 'activada'
                                            };

                                            return knex('status').insert(status).returning('*').then(function(status) {

                                              var length = personas.length;

                                              var letter = {
                                                ownerId: personas[length - 2].id,
                                                beneficiaryId: personas[length - 1].id,
                                                budgetId: presupuestos[0].id,
                                                statusId: status[0].id,
                                                path:  'pathToPDF'
                                              };

                                              return knex('guaranteeLetter').insert(letter).returning('*').then(function(letters) {

                                              }).catch(function(err) {
                                                throw err;
                                              }) /*guaranteeLetter.insert*/

                                            }).catch(function(err) {
                                              throw err;
                                            }) /*status.insert*/

                                          }).catch(function(err) {
                                            throw err;
                                          }) /*typeStatus.insert*/

                                        }).catch(function(err) {
                                          throw err;
                                        }) /*item.insert*/

                                      }).catch(function(err) {
                                        throw err;
                                      }) /*budget.insert*/

                                    }).catch(function(err) {
                                      throw err;
                                    }) /*affiliated.insert*/

                                  }).catch(function(err) {
                                    throw err;
                                  }) /*person.insert*/

                                }).catch(function(err) {
                                  throw err;
                                }) /*profile.insert*/

                              }).catch(function(err) {
                                throw err;
                              }) /*profileType.insert*/

                            }).catch(function(err) {
                              throw err;
                            }) /*statusType.delete*/

                          }).catch(function(err) {
                            throw err;
                          }) /*status.delete*/

                        }).catch(function(err) {
                          throw err;
                        }) /*profileType.delete*/

                      }).catch(function(err) {
                        throw err;
                      }) /*profile.delete*/

                    }).catch(function(err) {
                      throw err;
                    }) /*person.delete*/

                  }).catch(function(err) {
                    throw err;
                  }) /*user.delete*/

                }).catch(function(err) {
                  throw err;
                }) /*affiliated.delete*/

              }).catch(function(err) {
                throw err;
              }) /*budget.delete*/

            }).catch(function(err) {
              throw err;
            }) /*item.delete*/

          }).catch(function(err) {
            throw err;
          }) /*form.delete*/

        }).catch(function(err) {
          throw err;
        }) /*question.delete*/

      }).catch(function(err) {
        throw err;
      }) /*answer.delete*/

    }).catch(function(err) {
      throw err;
    }) /*session.delete*/

  }).catch(function(err) {
    throw err;
  })


};
