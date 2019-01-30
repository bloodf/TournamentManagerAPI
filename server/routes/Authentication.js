const { API_PATH } = require('../utils');
const AuthenticationHandler = require('../handlers/Authentication');
const AuthenticationValidations = require('../validations/Authentication');

const routes = [];

// GET /players
routes.push({
  path: `${API_PATH}/getToken`,
  method: 'POST',
  handler: AuthenticationHandler.validateUser,
  options: {
    auth: false,
    tags: ['api', 'authentication', 'POST'],
    validate: AuthenticationValidations,
    plugins: {
    },
  },
});

module.exports = routes;
