const { API_PATH } = require('../utils');
const WerUpload = require('../handlers/WerUpload');
const WerValidations = require('../validations/WerUpload');

const routes = [];

// GET /eventRounds
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
  },
});

module.exports = routes;
