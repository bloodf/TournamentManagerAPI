const joi = require('joi');

module.exports = {
  player: {
    headers: {},
    params: {
      tournamentId: joi
        .number()
        .required()
        .description('tournament id that you want to get'),
      eventId: joi
        .number()
        .required()
        .description('event id that you want to get'),
      playerId: joi
        .number()
        .required()
        .description('player id that you want to get'),
    },
    options: {
      allowUnknown: true,
    },
  },
};
