const {
  Rounds, Matches, Players,
} = require('../models');

const logger = require('../utils/logger');

async function getRound(roundId) {
  try {
    return await Rounds.findByPk(roundId);
  } catch (error) {
    logger.error(error, 'Failed to get round');
    error.logged = true;
    throw error;
  }
}

async function getRoundPlayers(roundId) {
  try {
    const MatchesDb = await Matches.findAll({
      where: {
        roundId,
      },
      include: [
        {
          model: Players,
          as: 'player',
        },
        {
          model: Players,
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
    return await Matches.findAll({
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
