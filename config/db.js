const config = require('config');

module.exports = {
  development: {
    username: config.get('db.user'),
    password: config.get('db.password'),
    database: config.get('db.name'),
    host: config.get('db.host'),
    dialect: config.get('db.dialect'),
  },
  test: {
    username: config.get('db.user'),
    password: config.get('db.password'),
    database: config.get('db.test'),
    host: config.get('db.host'),
    dialect: config.get('db.dialect'),
  },
  production: {
    username: config.get('db.user'),
    password: config.get('db.password'),
    database: config.get('db.name'),
    host: config.get('db.host'),
    dialect: config.get('db.dialect'),
  },
};
