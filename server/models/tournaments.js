module.exports = (sequelize, DataTypes) => {
  const tournaments = sequelize.define('tournaments', {
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
  }, {});
  tournaments.associate = (models) => {
    models.tournaments.belongsToMany(models.users, {
      as: 'users',
      through: 'tournamentUsers',
      primaryKey: true,
    });

    /* models.tournaments.belongsToMany(models.tournamentUsers, {
      through: 'tournamentsRole',
    }); */

    models.tournaments.hasMany(models.events, {
      as: 'event',
    });
  };

  return tournaments;
};
