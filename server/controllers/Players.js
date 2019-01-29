const {
  players,
} = require('../models');

const logger = require('../utils/logger');

async function getPlayer(playerId) {
  try {
    return await players.findByPk(playerId);
  } catch (error) {
    logger.error(error, 'Failed to get player');
    error.logged = true;
    throw error;
  }
}

module.exports = {
  getPlayer,
};
