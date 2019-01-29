module.exports = (sequelize, DataTypes) => {
  const teams = sequelize.define('teams', {
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    eliminationRound: DataTypes.INTEGER,
    teamUUID: {
      type: DataTypes.UUID,
      unique: true,
    },
  }, {});
  teams.associate = (models) => {
    models.teams.hasMany(models.players, {
      as: 'members',
    });

    models.teams.belongsTo(models.events, {
      as: 'event',
    });
  };

  return teams;
};
