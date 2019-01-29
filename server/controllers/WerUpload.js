const {
  events, players, rounds, matches, teams, tournaments, users, roles, tournamentUsers,
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
          model: teams,
          as: 'teams',
          include: [{
            model: players,
            as: 'members',
          }],
        },
        {
          model: rounds,
          as: 'rounds',
          include: [{
            model: matches,
            as: 'matches',
            includes: [{
              model: players,
              as: 'player',
            }],
          }],
        },
      ],
    };

    const TournamentDB = await tournaments.findByPk(tournamentId);

    if (!TournamentDB) throw new Error('Tournament not found for event.');

    const EventFound = await events.findOne({
      where: {
        sanctionNumber: WerData.sanctionNumber,
        guid: WerData.guid,
      },
      ...WerAssociations,
    });

    const RolesDB = await roles.findAll();

    let EventDb;

    if (EventFound) {
      EventDb = await EventFound.update(WerData, WerAssociations);
    } else {
      EventDb = await events.create(WerData, WerAssociations);
    }

    await TournamentDB.addEvent(EventDb);

    const TeamPlayersDb = EventDb.teams.map(team => team.members).flat();

    await EventDb.addPlayers(TeamPlayersDb);

    const UserDb = await users.findAll({
      where: {
        dci: TeamPlayersDb.map(player => player.dci),
      },
    });

    await Promise.all(
      await TeamPlayersDb
        .map(async (player) => {
          const UserOnTournament = UserDb.find(user => user.dci === player.dci);
          if (UserOnTournament) {
            const RoleModel = RolesDB.find(role => role.role === 'player');

            await UserOnTournament.addPlayer(player);

            const tournamentUserOptions = {
              roleId: RoleModel.id,
              userId: UserOnTournament.id,
              tournamentId: TournamentDB.id,
            };

            const TournamentUsersDB = await tournamentUsers.findOne({
              where: tournamentUserOptions,
            });

            if (TournamentUsersDB) {
              await TournamentUsersDB.update(tournamentUserOptions);
            } else {
              await tournamentUsers.create(tournamentUserOptions);
            }
          }
        }),
    );

    // const MatchesDb =
    EventDb.rounds
      .map(round => round.matches)
      .flat()
      .map(async (match) => {
        const MatchPlayer = TeamPlayersDb.find(player => player.dci === match.person);
        const OpponentMatch = TeamPlayersDb.find(player => player.dci === match.opponent);

        if (MatchPlayer) await MatchPlayer.addMatch(match);

        if (OpponentMatch) await OpponentMatch.addOpponentMatch(match);

        return match;
      });

    return await events.findByPk(EventDb.id,
      {
        include: [
          ...WerAssociations.include,
          {
            model: players,
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
