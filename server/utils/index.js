const config = require('config');

module.exports = {
  API_PATH: `/${config.get('app.name')}/api/${config.get('app.apiVersion')}`,
};
