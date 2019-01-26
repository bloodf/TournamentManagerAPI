const {
  Players,
} = require('../models');

const logger = require('../utils/logger');

async function getPlayer(playerId) {
  try {
    return Players.findById(playerId);
  } catch (error) {
    logger.error(error, 'Failed to save round for event');
    error.logged = true;
    throw error;
  }
}

module.exports = {
  getPlayer,
};
