const {
  Events, Teams, Players, Rounds, Matches,
} = require('../models');

const logger = require('../utils/logger');

async function getEvent(eventId) {
  try {
    return Events.findById(eventId);
  } catch (error) {
    logger.error(error, 'Failed to save round for event');
    error.logged = true;
    throw error;
  }
}

async function getEventPlayers(eventId) {
  try {
    const EventDb = await Events.findById(eventId);
    return EventDb.getPlayers();
  } catch (error) {
    logger.error(error, 'Failed to save round for event');
    error.logged = true;
    throw error;
  }
}

async function getEventTeams(eventId) {
  try {
    const EventDB = await Events.find({
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
    return EventDB.teams;
  } catch (error) {
    logger.error(error, 'Failed to save round for event');
    error.logged = true;
    throw error;
  }
}

async function getEventRounds(eventId) {
  try {
    const EventDb = await Events.find({
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
    return EventDb.rounds;
  } catch (error) {
    logger.error(error, 'Failed to save round for event');
    error.logged = true;
    throw error;
  }
}

async function getEventMatches(eventId) {
  try {
    const EventDb = await getEventRounds(eventId);
    return EventDb.map(round => round.matches).flat();
  } catch (error) {
    logger.error(error, 'Failed to save round for event');
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
