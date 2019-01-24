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
    models.Players.belongsTo(models.Decks, { as: 'deck', foreignKey: 'deckId' });
    models.Players.belongsTo(models.Events, { as: 'event', foreignKey: 'eventId' });
    models.Players.hasMany(models.Matches, {
      as: 'matches',
      foreignKey: 'matchId',
    });
  };
  return Players;
};
