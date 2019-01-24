module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define('Teams', {
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    eliminationRound: DataTypes.INTEGER,
    teamUUID: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {});
  Teams.associate = (models) => {
    models.Teams.hasMany(models.Players, { as: 'members', foreignKey: 'playerId' });
    models.Teams.belongsTo(models.Events, { as: 'event', foreignKey: 'eventId' });
  };

  return Teams;
};
