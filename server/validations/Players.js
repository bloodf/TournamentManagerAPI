const joi = require('joi');

module.exports = {
  player: {
    headers: {},
    query: {
      playerId: joi
        .number()
        .required()
        .description('player id that you want to get'),
    },
    options: {
      allowUnknown: true,
    },
  },
  eventPlayers: {
    headers: {},
    query: {
      eventId: joi
        .number()
        .required()
        .description('id of the event you want the players'),
    },
    options: {
      allowUnknown: true,
    },
  },
  tournamentPlayers: {
    headers: {},
    query: {
      tournamentId: joi
        .number()
        .required()
        .description('id of the tournament you want the players'),
    },
    options: {
      allowUnknown: true,
    },
  },
};
