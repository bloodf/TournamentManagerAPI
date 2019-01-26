const boom = require('boom');
const httpStatus = require('http-status');

const RoundsController = require('../controllers/Rounds');
const logger = require('../utils/logger');

async function round(req) {
  const {
    roundId,
  } = req.query;

  try {
    return RoundsController.getRound(roundId);
  } catch (error) {
    const errorMessage = `Failed to fetch the data from roundId ${roundId}`;

    if (!error.logged) logger.error(error, errorMessage);

    return boom.boomify(error, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
    });
  }
}

async function roundPlayers(req) {
  const {
    roundId,
  } = req.query;

  try {
    return RoundsController.getRoundPlayers(roundId);
  } catch (error) {
    const errorMessage = `Failed to fetch the data from roundId ${roundId}`;

    if (!error.logged) logger.error(error, errorMessage);

    return boom.boomify(error, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
    });
  }
}

async function roundMatches(req) {
  const {
    roundId,
  } = req.query;

  try {
    return RoundsController.getRoundMatches(roundId);
  } catch (error) {
    const errorMessage = `Failed to fetch the data from roundId ${roundId}`;

    if (!error.logged) logger.error(error, errorMessage);

    return boom.boomify(error, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
    });
  }
}

module.exports = {
  round,
  roundPlayers,
  roundMatches,
};
