module.exports = (sequelize, DataTypes) => {
  const Players = sequelize.define('Players', {
    dci: DataTypes.STRING,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    country: DataTypes.STRING,
    position: DataTypes.STRING,
  }, {});
  Players.associate = (models) => {

    models.Players.belongsToMany(models.Users, {
      through: 'UserPlayers',
    });

    models.Players.belongsTo(models.Teams, {
      as: 'team',
      targetKey: 'id',
      foreignKey: 'teamId',
    });

    models.Players.belongsTo(models.Events, {
      as: 'event',
      targetKey: 'id',
      foreignKey: 'eventId',
    });

    models.Players.hasMany(models.Matches, {
      as: 'match',
      targetKey: 'id',
      foreignKey: 'playerId',
    });

    models.Players.hasMany(models.Matches, {
      as: 'opponentMatch',
      targetKey: 'id',
      foreignKey: 'opponentId',
    });
  };
  return Players;
};
