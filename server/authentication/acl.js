/*eslint-disable */
const {
  Users, UserRole,
} = require('../models');

async function handler(request) {
  // console.log(args);
  return request.auth.credentials;
}

module.exports = {
  handler,
};
