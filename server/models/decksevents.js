module.exports = (sequelize, DataTypes) => {
  const DecksEvents = sequelize.define('DecksEvents', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
  }, {});
  DecksEvents.associate = (models) => {
    models.DecksEvents.belongsTo(models.Users, { foreignKey: 'id', as: 'user' });
    models.DecksEvents.belongsTo(models.Events, { foreignKey: 'id', as: 'event' });
  };
  return DecksEvents;
};
