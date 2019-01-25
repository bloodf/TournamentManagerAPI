const {
  Events, Players, Tournaments,
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

async function getTournamentPlayers(tournamentId) {
  try {
    const TournamentDb = await Tournaments.findById(tournamentId);
    const EventsDb = [...await TournamentDb.getEvent()].flat();

    return await [...await Promise.all(
      await EventsDb
        .map(async event => event.getPlayers()),
    )]
      .flat();
  } catch (error) {
    logger.error(error, 'Failed to save round for event');
    error.logged = true;
    throw error;
  }
}

module.exports = {
  getPlayer,
  getEventPlayers,
  getTournamentPlayers,
};
