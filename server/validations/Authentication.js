const joi = require('joi');

module.exports = {
  headers: {},
  payload: {
    email: joi
      .string()
      .email()
      .min(5)
      .required(),
    password: joi
      .string()
      .min(6)
      .required(),
  },
  options: {
    allowUnknown: true,
  },
};
