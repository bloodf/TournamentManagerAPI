module.exports = (sequelize, DataTypes) => {
  const players = sequelize.define('players', {
    dci: DataTypes.STRING,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    country: DataTypes.STRING,
    position: DataTypes.STRING,
  }, {});
  players.associate = (models) => {
    models.players.belongsTo(models.teams, {
      as: 'team',
    });

    models.players.belongsTo(models.events, {
      as: 'event',
    });

    models.players.belongsTo(models.users, {
      as: 'user',
    });

    models.players.hasMany(models.matches, {
      as: 'match',
    });

    models.players.hasMany(models.matches, {
      as: 'opponentMatch',
      targetKey: 'id',
      foreignKey: 'opponentId',
    });
  };
  return players;
};
