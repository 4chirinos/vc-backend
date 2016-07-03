var Faker = require('Faker');

exports.seed = function(knex, Promise) {

  var  asegurados = 2, coordinadores = 1, visitadores = 3,
    analistas = 1, id = '1234', seq = 0;


  return knex('session').del().then(function() {

    return knex('answer').del().then(function() {

      return knex('question').del().then(function() {

        return knex('form').del().then(function() {

          return knex('item').del().then(function() {

            return knex('budget').del().then(function() {

              return knex('user').del().then(function() {
                
                return knex('person').del().then(function() {

                  return knex('profile').del().then(function() {

                    return knex('profileType').del().then(function() {

                      return knex('status').del().then(function() {

                        return knex('statusType').del().then(function() {


                          var tipoPerfil = [];

                          tipoPerfil.push({type: 'personal'});
                          tipoPerfil.push({type: 'usuario'});

                          return knex('profileType').insert(tipoPerfil).returning('*').then(function(tipoPerfil) {

                            var perfiles = [];

                            perfiles.push({profile: 'analista', typeId: tipoPerfil[0].id});
                            perfiles.push({profile: 'coordinador', typeId: tipoPerfil[0].id});
                            perfiles.push({profile: 'visitador', typeId: tipoPerfil[0].id});
                            perfiles.push({profile: 'asegurado', typeId: tipoPerfil[0].id});

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

                              return knex('person').insert(personas).returning('*').then(function(personas) {


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


};
