const joi = require('joi');

module.exports = {
  event: {
    headers: {},
    query: {
      eventId: joi
        .number()
        .required()
        .description('event id that you want to get'),
    },
    options: {
      allowUnknown: true,
    },
  },
};
