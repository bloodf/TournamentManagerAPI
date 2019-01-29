const {
  Events, Players, Rounds, Matches, Teams, Tournaments, Users, Roles, TournamentUserRole,
} = require('../models');

const WerManagerClass = require('../utils/werManager');
const logger = require('../utils/logger');

async function saveWerData(payload) {
  const { roundFile, tournamentId } = payload;
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

    const TournamentDB = await Tournaments.findByPk(tournamentId);

    if (!TournamentDB) throw new Error('Tournament not found for event.');

    const EventFound = await Events.findOne({
      where: {
        sanctionNumber: WerData.sanctionNumber,
        guid: WerData.guid,
      },
      ...WerAssociations,
    });

    const RolesDB = await Roles.findAll();

    let EventDb;

    if (EventFound) {
      EventDb = await EventFound.update(WerData, WerAssociations);
    } else {
      EventDb = await Events.create(WerData, WerAssociations);
    }

    await TournamentDB.addEvent(EventDb);

    const TeamsDb = await EventDb.getTeams();

    const TeamPlayersDb = [...await Promise.all(
      await TeamsDb
        .map(async team => team.getMembers()),
    )].flat();

    const EventPlayersDb = [...await Promise.all(
      await TeamPlayersDb
        .map(async (teamPlayer) => {
          EventDb.addPlayers(teamPlayer);
          return teamPlayer;
        }),
    )]
      .flat();

    await Promise.all(
      await TeamPlayersDb
        .map(async (player) => {
          const UserDb = await Users.findOne({
            where: {
              dci: player.dci,
            },
          });
          if (UserDb) {
            const RoleId = RolesDB.find(role => role.role === 'player').id;

            const TournamentUserRoleOptions = {
              UserId: UserDb.id,
              RoleId,
              TournamentId: TournamentDB.id,
            };

            await UserDb.addPlayer(player);
          }
        }),
    );

    // const MatchesDb =
    [...await Promise.all(
      await EventDb
        .getRounds()
        .map(async round => round.getMatches()),
    )]
      .flat()
      .map(async (match) => {
        const MatchPlayer = EventPlayersDb.find(player => player.dci === match.person);
        const OpponentMatch = EventPlayersDb.find(player => player.dci === match.opponent);

        if (MatchPlayer) await MatchPlayer.addMatch(match);

        if (OpponentMatch) await OpponentMatch.addOpponentMatch(match);

        return match;
      });

    return await Events.findById(EventDb.id,
      {
        include: [
          ...WerAssociations.include,
          {
            model: Players,
            as: 'players',
          },
        ],
      });
  } catch (error) {
    logger.error(error, 'Failed to save round for event');
    error.logged = true;
    return Promise.reject(error);
  }
}

module.exports = {
  saveWerData,
};
