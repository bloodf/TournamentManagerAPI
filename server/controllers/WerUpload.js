const {
  events,
  players,
  rounds,
  matches,
  teams,
  tournaments,
  users,
  roles,
  tournamentUsers,
  warnings,
  seats,
} = require('../models');

const WerManagerClass = require('../utils/werManager');
const logger = require('../utils/logger');

async function saveWerOnDB(tournamentId, WerManager) {
  try {
    const WerData = {
      ...WerManager.event,
      teams: [...WerManager.teams],
      rounds: [...WerManager.rounds],
      warnings: [...WerManager.warnings],
      seats: [...WerManager.seats],
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

    const TeamPlayersDb = EventDb.teams
      .map(team => team.members)
      .flat();

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

            await tournamentUsers.findOrCreate({
              where: tournamentUserOptions,
              defaults: tournamentUserOptions,
            });
          }
          const PlayerSeat = WerData.seats.find(seat => seat.player === player.dci);
          if (PlayerSeat) {
            await seats.upsert({
              table: PlayerSeat.table,
              seat: PlayerSeat.seat,
              playerId: player.id,
            });
          }
        }),
    );

    WerManager.warnings.forEach(async (warning) => {
      const Player = TeamPlayersDb.find(p => p.dci === warning.dci);
      if (Player) {
        const warningData = {
          code: warning.code,
          judge: warning.judge,
          notes: warning.notes,
          round: warning.round,
          penalty: warning.penalty,
          playerId: Player.id,
        };
        const warningDb = await warnings.find(warningData);
        if (warningDb) {
          await warnings.update(warningData);
        } else {
          await warnings.create(warningData);
        }
      }
    });

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

    return {
      data: EventDb,
    };

  } catch (error) {
    logger.error(error, 'Failed to save round for event');
    error.logged = true;
    return Promise.reject(error);
  }
}

async function saveWerData(payload) {
  const { roundFile, tournamentId } = payload;
  try {
    const WerManager = new WerManagerClass();
    const WerParsed = await WerManager.parse(roundFile._data);
    if (Array.isArray(WerParsed)) {
      const ParsedArray = Promise.all([...await WerParsed.map(async (wer) => {
        const TempWerManager = new WerManagerClass();
        const EventDB = await saveWerOnDB(tournamentId, TempWerManager.define(wer));
        return EventDB;
      })]);
      return ParsedArray;
    }

    WerManager.define(WerParsed);
    return await saveWerOnDB(tournamentId, WerManager);
  } catch (error) {
    logger.error(error, 'Failed to save round for event');
    error.logged = true;
    return Promise.reject(error);
  }
}

module.exports = {
  saveWerData,
};
