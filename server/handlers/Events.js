const boom = require('boom');
const httpStatus = require('http-status');

const EventsController = require('../controllers/Events');
const logger = require('../utils/logger');

async function event(req) {
  const {
    eventId,
  } = req.query;

  try {
    return EventsController.getEvent(eventId);
  } catch (error) {
    const errorMessage = `Failed to fetch the data from event ${eventId}`;

    if (!error.logged) logger.error(error, errorMessage);

    return boom.boomify(error, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
    });
  }
}

async function eventPlayers(req) {
  const {
    eventId,
  } = req.query;

  try {
    return EventsController.getEventPlayers(eventId);
  } catch (error) {
    const errorMessage = `Failed to fetch the data from event ${eventId}`;

    if (!error.logged) logger.error(error, errorMessage);

    return boom.boomify(error, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
    });
  }
}

async function eventTeams(req) {
  const {
    eventId,
  } = req.query;

  try {
    return EventsController.getEventTeams(eventId);
  } catch (error) {
    const errorMessage = `Failed to fetch the data from event ${eventId}`;

    if (!error.logged) logger.error(error, errorMessage);

    return boom.boomify(error, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
    });
  }
}

async function eventRounds(req) {
  const {
    eventId,
  } = req.query;

  try {
    return EventsController.getEventRounds(eventId);
  } catch (error) {
    const errorMessage = `Failed to fetch the data from event ${eventId}`;

    if (!error.logged) logger.error(error, errorMessage);

    return boom.boomify(error, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
    });
  }
}

async function eventMatches(req) {
  const {
    eventId,
  } = req.query;

  try {
    return EventsController.getEventMatches(eventId);
  } catch (error) {
    const errorMessage = `Failed to fetch the data from event ${eventId}`;

    if (!error.logged) logger.error(error, errorMessage);

    return boom.boomify(error, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
    });
  }
}

module.exports = {
  event,
  eventPlayers,
  eventTeams,
  eventRounds,
  eventMatches,
};
