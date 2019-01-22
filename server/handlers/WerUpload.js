const boom = require('boom');
const httpStatus = require('http-status');

const WerUploadController = require('../controllers/WerUpload');
const logger = require('../utils/logger');

async function upload(req) {
  const {
    eventId,
    file: roundFile,
  } = req.payload;

  try {
    const data = await WerUploadController.saveWerData({ eventId, roundFile });
    return data;
  } catch (error) {
    const errorMessage = `Failed to upload WerReport data for event ${eventId}`;

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
