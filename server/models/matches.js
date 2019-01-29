module.exports = (sequelize, DataTypes) => {
  const matches = sequelize.define('matches', {
    person: DataTypes.STRING,
    opponent: DataTypes.STRING,
    outcome: DataTypes.INTEGER,
    win: DataTypes.INTEGER,
    loss: DataTypes.INTEGER,
    draw: DataTypes.INTEGER,
    winByDrop: DataTypes.BOOLEAN,
  }, {});

  matches.associate = (models) => {
    models.matches.belongsTo(models.players, {
      as: 'player',
    });

    models.matches.belongsTo(models.players, {
      as: 'opponentPlayer',
      targetKey: 'id',
      foreignKey: 'opponentId',
    });

    models.matches.belongsTo(models.rounds, {
      as: 'round',
    });
  };

  return matches;
};
