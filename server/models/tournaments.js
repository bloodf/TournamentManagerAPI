module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('Tournaments', {
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
  }, {});
  Tournament.associate = (models) => {
    models.Tournaments.belongsToMany(models.Users, {
      through: 'TournamentUser',
    });

    /* models.Tournaments.belongsToMany(models.TournamentUser, {
      through: 'TournamentRole',
    }); */

    models.Tournaments.hasMany(models.Events, {
      as: 'event',
      targetKey: 'id',
      foreignKey: 'tournamentId',
    });
  };
  return Tournament;
};
