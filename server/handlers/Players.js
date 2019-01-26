const boom = require('boom');
const httpStatus = require('http-status');

const PlayersController = require('../controllers/Players');
const logger = require('../utils/logger');

async function player(req) {
  const {
    playerId,
  } = req.query;

  try {
    return PlayersController.getPlayer(playerId);
  } catch (error) {
    const errorMessage = `Failed to fetch the data from playerId ${playerId}`;

    if (!error.logged) logger.error(error, errorMessage);

    return boom.boomify(error, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
    });
  }
}

module.exports = {
  player,
};
