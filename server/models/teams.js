module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define('Teams', {
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    eliminationRound: DataTypes.INTEGER,
    teamUUID: {
      type: DataTypes.UUID,
      unique: true,
    },
  }, {});
  Teams.associate = (models) => {
    models.Teams.hasMany(models.Players, {
      as: 'members',
      targetKey: 'id',
      foreignKey: 'teamId',
    });

    models.Teams.belongsTo(models.Events, {
      as: 'event',
      targetKey: 'id',
      foreignKey: 'eventId',
    });
  };

  return Teams;
};
