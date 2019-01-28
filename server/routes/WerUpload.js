const { API_PATH } = require('../utils');
const WerUpload = require('../handlers/WerUpload');
const WerValidations = require('../validations/WerUpload');

const ACLRoles = require('../authentication/aclRoles');

const routes = [];

// POST /werUpload
routes.push({
  path: `${API_PATH}/werUpload`,
  method: 'POST',
  handler: WerUpload.upload,
  options: {
    payload: {
      output: 'stream',
      allow: 'multipart/form-data',
    },
    tags: ['api', 'WerUpload', 'POST'],
    validate: WerValidations,
    plugins: {
      hapiAclAuth: {
        roles: ACLRoles('staff'),
      },
    },
  },
});

module.exports = routes;
