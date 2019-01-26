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
};
