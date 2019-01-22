module.exports = (sequelize, DataTypes) => sequelize.define('DecksEvents', {
  userId: DataTypes.INTEGER,
  eventId: DataTypes.INTEGER,
}, {});
