const { API_PATH } = require('../utils');
const WerUpload = require('../handlers/WerUpload');
const WerValidations = require('../validations/WerUpload');

const routes = [];

// POST /werUpload
routes.push({
  path: `${API_PATH}/tournament/{tournamentId}/wer`,
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
      policies: ['isTournamentStaff'],
      disinfect: {
        disinfectQuery: true,
        disinfectParams: true,
        disinfectPayload: false,
      },
    },
  },
});

module.exports = routes;
