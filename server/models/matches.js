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
    models.Matches.belongsTo(models.Players, { as: 'player', foreignKey: 'playerId' });
  };

  return Matches;
};
