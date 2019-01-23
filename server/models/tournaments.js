module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('Tournaments', {
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
  }, {});
  Tournament.associate = (models) => {
    models.Tournaments.hasMany(models.Events, {
      as: 'event',
      foreignKey: 'tournamentId',
      sourceKey: 'id',
    });
    models.Tournaments.belongsToMany(models.Users, {
      as: 'user',
      through: {
        model: models.UsersTournaments,
        unique: true,
      },
      foreignKey: 'tournamentId',
      constraints: false,
    });
  };
  return Tournament;
};
