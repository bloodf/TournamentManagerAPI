const joi = require('joi');

module.exports = {
  headers: {},
  payload: {
    tournamentId: joi
      .number()
      .required()
      .description('Tournament identification of the Event'),
    file: joi
      .any()
      .required()
      .description('werReport data file for the event to be saved'),
  },
  options: {
    allowUnknown: true,
  },
};
