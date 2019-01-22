module.exports = (sequelize, DataTypes) => sequelize.define('UserEvents', {
  eventId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
}, {});
