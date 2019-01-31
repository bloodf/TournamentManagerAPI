const { API_PATH } = require('../utils');
const EventsHandler = require('../handlers/Events');
const EventsValidations = require('../validations/Events');
const WerUpload = require('../handlers/WerUpload');
const WerValidations = require('../validations/WerUpload');


const routes = [];

routes.push({
  path: `${API_PATH}/tournament/{tournamentId}/wer`,
  method: 'POST',
  handler: WerUpload.upload,
  options: {
    payload: {
      output: 'stream',
      allow: 'multipart/form-data',
    },
    tags: ['api', 'WerUpload', 'POST'],
    validate: WerValidations,
    plugins: {
      policies: ['isTournamentStaff'],
      disinfect: false,
    },
  },
});

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
