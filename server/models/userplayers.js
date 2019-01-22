module.exports = (sequelize, DataTypes) => sequelize.define('UserPlayers', {
  playerId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
}, {});
