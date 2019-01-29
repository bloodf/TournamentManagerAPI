module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    name: DataTypes.STRING,
    sanctionNumber: DataTypes.STRING,
    guid: DataTypes.STRING,
    organizer: DataTypes.STRING,
    coordinator: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    format: DataTypes.STRING,
    eliminationType: DataTypes.STRING,
    casual: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    playoff: DataTypes.BOOLEAN,
    manualMatches: DataTypes.STRING,
    notes: DataTypes.TEXT,
    numberOfRounds: DataTypes.INTEGER,
    playoffsStartRound: DataTypes.INTEGER,
    typeCode: DataTypes.STRING,
  }, {});
  events.associate = (models) => {

    models.events.hasMany(models.rounds, {
      as: 'rounds',
      targetKey: 'id',
      foreignKey: 'eventId',
    });

    models.events.hasMany(models.teams, {
      as: 'teams',
      targetKey: 'id',
      foreignKey: 'eventId',
    });

    models.events.hasMany(models.players, {
      as: 'players',
      targetKey: 'id',
      foreignKey: 'eventId',
    });

    models.events.belongsTo(models.tournaments, {
      as: 'tournament',
      targetKey: 'id',
      foreignKey: 'tournamentId',
    });
  };
  return events;
};
