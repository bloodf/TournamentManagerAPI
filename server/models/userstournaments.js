module.exports = (sequelize, DataTypes) => {
  const UsersTournaments = sequelize.define('UsersTournaments', {
    userId: DataTypes.INTEGER,
    tournamentId: DataTypes.INTEGER,
  }, {});
  UsersTournaments.associate = (models) => {
    models.UsersTournaments.hasMany(models.Players);
    models.UsersTournaments.hasMany(models.Tournaments);
    models.UsersTournaments.belongsTo(models.Roles);
  };
  return UsersTournaments;
};
