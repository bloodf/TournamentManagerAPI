module.exports = (sequelize, DataTypes) => {
  const Matches = sequelize.define('Matches', {
    person: DataTypes.STRING,
    opponent: DataTypes.STRING,
    outcome: DataTypes.INTEGER,
    win: DataTypes.INTEGER,
    loss: DataTypes.INTEGER,
    draw: DataTypes.INTEGER,
    winByDrop: DataTypes.BOOLEAN,
  }, {});

  Matches.associate = (models) => {
    models.Matches.belongsTo(models.Players, {
      as: 'player',
      targetKey: 'id',
      foreignKey: 'playerId',
    });

    models.Matches.belongsTo(models.Players, {
      as: 'opponentPlayer',
      targetKey: 'id',
      foreignKey: 'opponentId',
    });

    models.Matches.belongsTo(models.Rounds, {
      as: 'round',
      targetKey: 'id',
      foreignKey: 'roundId',
    });
  };

  return Matches;
};
