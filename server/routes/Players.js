const { API_PATH } = require('../utils');
const PlayersHandler = require('../handlers/Players');
const PlayersValidations = require('../validations/Players');

const routes = [];

// GET /players
routes.push({
  path: `${API_PATH}/player`,
  method: 'GET',
  handler: PlayersHandler.player,
  options: {
    tags: ['api', 'player', 'GET'],
    validate: PlayersValidations.player,
  },
});

// GET /eventPlayers
routes.push({
  path: `${API_PATH}/eventPlayers`,
  method: 'GET',
  handler: PlayersHandler.eventPlayers,
  options: {
    tags: ['api', 'eventPlayers', 'GET'],
    validate: PlayersValidations.eventPlayers,
  },
});


// GET /tournamentPlayers
routes.push({
  path: `${API_PATH}/tournamentPlayers`,
  method: 'GET',
  handler: PlayersHandler.tournamentPlayers,
  options: {
    tags: ['api', 'tournamentPlayers', 'GET'],
    validate: PlayersValidations.tournamentPlayers,
  },
});

module.exports = routes;
