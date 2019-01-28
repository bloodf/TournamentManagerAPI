const { API_PATH } = require('../utils');
const PlayersHandler = require('../handlers/Players');
const PlayersValidations = require('../validations/Players');
const ACLRoles = require('../authentication/aclRoles');

const routes = [];

// GET /players
routes.push({
  path: `${API_PATH}/player`,
  method: 'GET',
  handler: PlayersHandler.player,
  options: {
    tags: ['api', 'player', 'GET'],
    validate: PlayersValidations.player,
    plugins: {
      hapiAclAuth: {
        roles: ACLRoles('player'),
      },
    },
  },
});

module.exports = routes;
