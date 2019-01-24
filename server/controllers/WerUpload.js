const {
  Events, Players, Rounds, Matches, Teams,
} = require('../models');

const WerManagerClass = require('../utils/werManager');
const logger = require('../utils/logger');

async function saveWerData(payload) {
  const { roundFile } = payload;
  try {
    const WerManager = new WerManagerClass();
    await WerManager.parse(roundFile._data);

    const WerData = {
      ...WerManager.event,
      teams: [...WerManager.teams],
      rounds: [...WerManager.rounds],
    };

    const WerAssociations = {
      include: [
        {
          model: Teams,
          as: 'teams',
          include: [{
            model: Players,
            as: 'members',
          }],
        },
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
    };

    const EventFound = await Events.findOne({
      where: {
        sanctionNumber: WerData.sanctionNumber,
        guid: WerData.guid,
      },
      ...WerAssociations,
    });

    let EventDb;

    if (EventFound) {
      EventDb = await EventFound.update(WerData, WerAssociations);
    } else {
      EventDb = await Events.create(WerData, WerAssociations);
    }

    // const Teams = await EventDb.getTeams();

    return EventDb;
  } catch (error) {
    logger.error(error, 'Failed to save round for event');
    error.logged = true;
    throw error;
  }
}

module.exports = {
  saveWerData,
};
