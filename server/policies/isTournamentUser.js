const boom = require('boom');

const {
  tournamentUsers,
} = require('../models');
const AclRoles = require('../authentication/aclRoles');

async function Policy(request, h) {
  const { credentials } = request.auth;
  const { tournamentId } = request.params;

  const tournamentUserDB = await tournamentUsers.findOne({
    where: {
      userId: credentials.id,
      tournamentId,
    },
  });

  const roleDB = await tournamentUserDB.getRole();
  if (roleDB.role && [...AclRoles('player')].includes(roleDB.role)) {
    return h.continue;
  }

  throw boom.forbidden('Not an tournament player.');
}

Policy.applyPoint = 'onPreHandler';

module.exports = Policy;
