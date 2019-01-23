module.exports = (sequelize, DataTypes) => {
  const UserPlayers = sequelize.define('UserPlayers', {
    playerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {});
  UserPlayers.associate = (models) => {
    models.UserPlayers.belongsTo(models.Users, { as: 'user' });
    models.UserPlayers.belongsTo(models.Players, { as: 'player' });
  };
  return UserPlayers;
};
