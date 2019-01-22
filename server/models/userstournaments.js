module.exports = (sequelize, DataTypes) => {
  const UsersTournaments = sequelize.define('UsersTournaments', {
    userId: DataTypes.INTEGER,
    tournamentId: DataTypes.INTEGER,
  }, {});
  UsersTournaments.associate = (models) => {
    models.UsersTournaments.belongsToMany(models.Players, {
      through: {
        model: models.UsersTournaments,
        unique: true,
      },
      foreignKey: 'tournamentId',
      constraints: false,
    });
    models.UsersTournaments.belongsToMany(models.Tournaments, {
      through: {
        model: models.UsersTournaments,
        unique: true,
      },
      foreignKey: 'tournamentId',
      constraints: false,
    });
    models.UsersTournaments.belongsTo(models.Roles);
  };
  return UsersTournaments;
};
