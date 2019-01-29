const {
  rounds, matches, players,
} = require('../models');

const logger = require('../utils/logger');

async function getRound(roundId) {
  try {
    return await rounds.findByPk(roundId);
  } catch (error) {
    logger.error(error, 'Failed to get round');
    error.logged = true;
    throw error;
  }
}

async function getRoundPlayers(roundId) {
  try {
    const MatchesDb = await matches.findAll({
      where: {
        roundId,
      },
      include: [
        {
          model: players,
          as: 'player',
        },
        {
          model: players,
          as: 'opponentPlayer',
        },
      ],
    });
    return [...await MatchesDb.map(m => m.player), ...await MatchesDb.map(m => m.opponentPlayer)];
  } catch (error) {
    logger.error(error, 'Failed to get round players');
    error.logged = true;
    throw error;
  }
}

async function getRoundMatches(roundId) {
  try {
    return await matches.findAll({
      where: {
        roundId,
      },
    });
  } catch (error) {
    logger.error(error, 'Failed to get round players');
    error.logged = true;
    throw error;
  }
}

module.exports = {
  getRound,
  getRoundPlayers,
  getRoundMatches,
};
