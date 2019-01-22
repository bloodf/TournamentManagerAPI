
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('Tournaments', {
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
  }, {});
  Tournament.associate = (models) => {
    models.Tournaments.hasMany(models.Events);
    models.Tournaments.belongsToMany(models.Users, {
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
