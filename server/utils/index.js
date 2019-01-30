const config = require('config');

module.exports = {
  API_PATH: `/${config.get('app.apiVersion')}`,
};
