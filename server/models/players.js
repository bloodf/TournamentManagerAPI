module.exports = (sequelize, DataTypes) => {
  const Players = sequelize.define('Players', {
    dci: DataTypes.STRING,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    country: DataTypes.STRING,
    position: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
  }, {});
  Players.associate = (models) => {
    models.Players.hasMany(models.Matches, { foreignKey: 'dci', targetKey: 'person' });
    models.Players.belongsTo(models.Events);
    models.Players.belongsTo(models.Users);
    models.Players.belongsTo(models.Teams);
  };

  return Players;
};
