const { Events } = require('../models');

const WerManagerClass = require('../utils/werManager');
const logger = require('../utils/logger');

async function saveEvent(eventData, eventId) {
  try {
    const EventInformation = {
      name: eventData.title,
      sanctionNumber: eventData.sanctionnumber,
      guid: eventData.eventguid,
      organizer: eventData.orgname,
      coordinator: eventData.coordinator,
      startDate: eventData.startdate,
      endDate: eventData.enddate,
      format: eventData.format,
      eliminationType: eventData.eliminationType,
      casual: JSON.parse(eventData.iscasualreportonly.toLowerCase()),
      status: eventData.status,
      playoff: JSON.parse(eventData.isplayoff.toLowerCase()),
      manualMatches: eventData.manualmatchround,
      notes: eventData.notes,
      rounds: eventData.numberofrounds,
      playoffsStartRound: eventData.playoffstartround,
      typeCode: eventData.eventtypecode,
    };

    if (eventId) {
      const EventDb = await Events.findById(eventId);
      EventDb.update(EventInformation);
      return EventDb.dataValues;
    }

    const EventDb = await Events.findOrCreate({
      where: {
        sanctionNumber: eventData.sanctionnumber,
        guid: eventData.eventguid,
      },
      defaults: EventInformation,
    });

    if (EventDb[1]) return EventDb[0];

    EventDb[0].update(EventInformation);
    return EventDb[0].dataValues;

  } catch (error) {
    logger.error(error, 'Failed to save event');
    error.logged = true;
    throw error;
  }
}

async function saveWerData(payload) {
  const { roundFile, eventId } = payload;
  try {
    const WerManager = new WerManagerClass();
    await WerManager.parse(roundFile._data);

    const Event = await saveEvent(WerManager.event, eventId);

    return {
      data: {
        Event,
      },
    };
  } catch (error) {
    logger.error(error, 'Failed to save round for event');
    error.logged = true;
    throw error;
  }
}

module.exports = {
  saveWerData,
};
