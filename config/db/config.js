var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: 'visitadorclinico_development',
      charset  : 'utf8',
      debug: true
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

module.exports = config[env];