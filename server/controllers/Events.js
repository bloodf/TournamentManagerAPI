const {
  Events, Teams, Players, Rounds, Matches,
} = require('../models');

const logger = require('../utils/logger');

async function getEvent(eventId) {
  try {
    return await Events.findByPk(eventId);
  } catch (error) {
    logger.error(error, 'Failed to get event');
    error.logged = true;
    throw error;
  }
}

async function getEventPlayers(eventId) {
  try {
    const EventDb = await Events.findByPk(eventId);
    return await EventDb.getPlayers();
  } catch (error) {
    logger.error(error, 'Failed to get event players');
    error.logged = true;
    throw error;
  }
}

async function getEventTeams(eventId) {
  try {
    const EventDB = await Events.findOne({
      where: {
        id: eventId,
      },
      include: [
        {
          model: Teams,
          as: 'teams',
          include: [{
            model: Players,
            as: 'members',
          }],
        },
      ],
    });
    return await EventDB.teams;
  } catch (error) {
    logger.error(error, 'Failed to get event teams');
    error.logged = true;
    throw error;
  }
}

async function getEventRounds(eventId) {
  try {
    const EventDb = await Events.findOne({
      where: {
        id: eventId,
      },
      include: [
        {
          model: Rounds,
          as: 'rounds',
          include: [{
            model: Matches,
            as: 'matches',
            includes: [{
              model: Players,
              as: 'player',
            }],
          }],
        },
      ],
    });
    return await EventDb.rounds;
  } catch (error) {
    logger.error(error, 'Failed to get event rounds');
    error.logged = true;
    throw error;
  }
}

async function getEventMatches(eventId) {
  try {
    const EventDb = await getEventRounds(eventId);
    return EventDb.map(round => round.matches).flat();
  } catch (error) {
    logger.error(error, 'Failed to get event matches');
    error.logged = true;
    throw error;
  }
}

module.exports = {
  getEvent,
  getEventPlayers,
  getEventTeams,
  getEventRounds,
  getEventMatches,
};
