module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: 'visitadorclinico_development',
      charset  : 'utf8',
      debug: true
    },
    migrations: {
      directory: './config/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './config/db/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './config/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './config/db/seeds'
    }
  }

};
