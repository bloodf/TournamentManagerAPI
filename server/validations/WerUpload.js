const joi = require('joi');

module.exports = {
  headers: {},
  payload: {
    eventId: joi
      .number()
      .default(0)
      .description('eventId of the werReport data belongs to'),
    file: joi
      .any()
      .required()
      .description('werReport data file for the event to be saved'),
  },
  options: {
    allowUnknown: true,
  },
};
