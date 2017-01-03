var settings = {
    
  visitadorclinico_development: {

    development: {
      name: 'visitadorclinico',
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
        directory: './config/db/migrations/visitadorclinico',
        tableName: 'knex_migrations'
      }
    },

    production: {
      name: 'visitadorclinico',
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
      directory: './config/db/migrations/visitadorclinico',
        tableName: 'knex_migrations'
      }
    }

  },

  core_development: {

    development: {
      name: 'core',
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'core_development',
        charset  : 'utf8',
        debug: true
      },
      migrations: {
        directory: './config/db/migrations/core',
        tableName: 'knex_migrations'
      }
    },

    production: {
      name: 'core',
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: './config/db/migrations/core',
        tableName: 'knex_migrations'
      }
    }

  }

};

module.exports = settings;