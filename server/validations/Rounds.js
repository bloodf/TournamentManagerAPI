const joi = require('joi');

module.exports = {
  headers: {},
  query: {
    roundId: joi
      .number()
      .required()
      .description('round id that you want to get'),
  },
  options: {
    allowUnknown: true,
  },
};
