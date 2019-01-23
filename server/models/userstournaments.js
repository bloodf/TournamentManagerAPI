module.exports = (sequelize, DataTypes) => {
  const UsersTournaments = sequelize.define('UsersTournaments', {
    userId: DataTypes.INTEGER,
    tournamentId: DataTypes.INTEGER,
  }, {});
  UsersTournaments.associate = (models) => {
    models.UsersTournaments.hasMany(models.Players, { as: 'player' });
    models.UsersTournaments.hasMany(models.Tournaments, { as: 'tournament' });
    models.UsersTournaments.belongsTo(models.Roles, { as: 'role' });
  };
  return UsersTournaments;
};
