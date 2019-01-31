const boom = require('boom');
const httpStatus = require('http-status');

const WerUploadController = require('../controllers/WerUpload');
const logger = require('../utils/logger');

async function upload(req) {
  const {
    file: roundFile,
  } = req.payload;

  const { tournamentId } = req.params;
  if (!roundFile.hapi.filename.endsWith('.wer')) throw new Error('Not a Wer File');
  try {
    return await WerUploadController.saveWerData({
      roundFile,
      tournamentId,
    });
  } catch (error) {
    const errorMessage = 'Failed to upload WerReport data for event';

    if (!error.logged) logger.error(error, errorMessage);

    return boom.boomify(error, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
    });
  }
}

module.exports = {
  upload,
};
