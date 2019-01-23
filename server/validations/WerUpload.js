const joi = require('joi');

module.exports = {
  headers: {},
  payload: {
    file: joi
      .any()
      .required()
      .description('werReport data file for the event to be saved'),
  },
  options: {
    allowUnknown: true,
  },
};
