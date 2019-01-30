const { API_PATH } = require('../utils');
const RoundsHandler = require('../handlers/Rounds');
const RoundsValidations = require('../validations/Rounds');

const routes = [];

// GET /round
routes.push({
  path: `${API_PATH}/round`,
  method: 'GET',
  handler: RoundsHandler.round,
  options: {
    tags: ['api', 'round', 'GET'],
    validate: RoundsValidations,
    plugins: {
      policies: ['isTournamentUser'],
    },
  },
});

// GET /roundPlayers
routes.push({
  path: `${API_PATH}/roundPlayers`,
  method: 'GET',
  handler: RoundsHandler.roundPlayers,
  options: {
    tags: ['api', 'roundPlayers', 'GET'],
    validate: RoundsValidations,
    plugins: {
      policies: ['isTournamentUser'],
    },
  },
});

// GET /roundMatches
routes.push({
  path: `${API_PATH}/roundMatches`,
  method: 'GET',
  handler: RoundsHandler.roundMatches,
  options: {
    tags: ['api', 'roundMatches', 'GET'],
    validate: RoundsValidations,
    plugins: {
      policies: ['isTournamentUser'],
    },
  },
});

module.exports = routes;
