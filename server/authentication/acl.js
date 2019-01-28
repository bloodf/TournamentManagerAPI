const {
  Events, Teams, Players, Rounds, Matches,
} = require('../models');

async function handler(...args) {
  // console.log(args);
  return { user: 'cread', roles: ['superuser'] };
}

module.exports = {
  handler,
};
