module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
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
  Events.associate = (models) => {

    models.Events.hasMany(models.Rounds, {
      as: 'rounds',
      targetKey: 'id',
      foreignKey: 'eventId',
    });

    models.Events.hasMany(models.Teams, {
      as: 'teams',
      targetKey: 'id',
      foreignKey: 'eventId',
    });

    models.Events.hasMany(models.Players, {
      as: 'players',
      targetKey: 'id',
      foreignKey: 'eventId',
    });

    models.Events.belongsTo(models.Tournaments, {
      as: 'tournament',
      targetKey: 'id',
      foreignKey: 'tournamentId',
    });
  };
  return Events;
};
