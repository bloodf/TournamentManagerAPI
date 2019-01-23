module.exports = (sequelize, DataTypes) => {
  const UserEvents = sequelize.define('UserEvents', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {});
  UserEvents.associate = (models) => {
    models.UserEvents.belongsTo(models.Users, { as: 'user' });
    models.UserEvents.belongsTo(models.Events, { as: 'event' });
  };
  return UserEvents;
};
