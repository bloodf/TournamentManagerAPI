const { API_PATH } = require('../utils');
const EventsHandler = require('../handlers/Events');
const EventsValidations = require('../validations/Events');

const routes = [];

// GET /event
routes.push({
  path: `${API_PATH}/tournament/{tournamentId}/event/{eventId}`,
  method: 'GET',
  handler: EventsHandler.event,
  options: {
    tags: ['api', 'player', 'GET'],
    validate: EventsValidations.event,
    plugins: {
      hapiAclAuth: {
        policies: ['isTournamentUser'],
      },
    },
  },
});

// GET /eventPlayers
routes.push({
  path: `${API_PATH}/tournament/{tournamentId}/event/{eventId}/players`,
  method: 'GET',
  handler: EventsHandler.eventPlayers,
  options: {
    tags: ['api', 'eventPlayers', 'GET'],
    validate: EventsValidations.event,
    plugins: {
      policies: ['isTournamentUser'],
    },
  },
});

// GET /eventTeams
routes.push({
  path: `${API_PATH}/tournament/{tournamentId}/event/{eventId}/teams`,
  method: 'GET',
  handler: EventsHandler.eventTeams,
  options: {
    tags: ['api', 'eventTeams', 'GET'],
    validate: EventsValidations.event,
    plugins: {
      policies: ['isTournamentUser'],
    },
  },
});

// GET /eventRounds
routes.push({
  path: `${API_PATH}/tournament/{tournamentId}/event/{eventId}/rounds`,
  method: 'GET',
  handler: EventsHandler.eventRounds,
  options: {
    tags: ['api', 'eventTeams', 'GET'],
    validate: EventsValidations.event,
    plugins: {
      policies: ['isTournamentUser'],
    },
  },
});

// GET /eventMatches
routes.push({
  path: `${API_PATH}/tournament/{tournamentId}/event/{eventId}/matches`,
  method: 'GET',
  handler: EventsHandler.eventMatches,
  options: {
    tags: ['api', 'eventTeams', 'GET'],
    validate: EventsValidations.event,
    plugins: {
      policies: ['isTournamentUser'],
    },
  },
});

module.exports = routes;
