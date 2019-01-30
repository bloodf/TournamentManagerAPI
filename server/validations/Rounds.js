const joi = require('joi');

module.exports = {
  headers: {},
  query: {
    tournamentId: joi
      .number()
      .required()
      .description('tournament id that you want to get'),
    eventId: joi
      .number()
      .required()
      .description('event id that you want to get'),
    roundId: joi
      .number()
      .required()
      .description('round id that you want to get'),
  },
  options: {
    allowUnknown: true,
  },
};
