module.exports = (sequelize, DataTypes) => {
  const UserPlayers = sequelize.define('UserPlayers', {
    playerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {});
  UserPlayers.associate = (models) => {
    models.UserPlayers.belongsTo(models.Users);
    models.UserPlayers.belongsTo(models.Players);
  };
  return UserPlayers;
};
