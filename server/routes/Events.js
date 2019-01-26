const { API_PATH } = require('../utils');
const EventsHandler = require('../handlers/Events');
const EventsValidations = require('../validations/Events');

const routes = [];

// GET /event
routes.push({
  path: `${API_PATH}/event`,
  method: 'GET',
  handler: EventsHandler.event,
  options: {
    tags: ['api', 'player', 'GET'],
    validate: EventsValidations.event,
  },
});

// GET /eventPlayers
routes.push({
  path: `${API_PATH}/eventPlayers`,
  method: 'GET',
  handler: EventsHandler.eventPlayers,
  options: {
    tags: ['api', 'eventPlayers', 'GET'],
    validate: EventsValidations.event,
  },
});

// GET /eventTeams
routes.push({
  path: `${API_PATH}/eventTeams`,
  method: 'GET',
  handler: EventsHandler.eventTeams,
  options: {
    tags: ['api', 'eventTeams', 'GET'],
    validate: EventsValidations.event,
  },
});

// GET /eventRounds
routes.push({
  path: `${API_PATH}/eventRounds`,
  method: 'GET',
  handler: EventsHandler.eventRounds,
  options: {
    tags: ['api', 'eventTeams', 'GET'],
    validate: EventsValidations.event,
  },
});

// GET /eventMatches
routes.push({
  path: `${API_PATH}/eventMatches`,
  method: 'GET',
  handler: EventsHandler.eventMatches,
  options: {
    tags: ['api', 'eventTeams', 'GET'],
    validate: EventsValidations.event,
  },
});

module.exports = routes;
