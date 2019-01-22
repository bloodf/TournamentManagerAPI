module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    dci: DataTypes.STRING,
    phone: DataTypes.STRING,
    deviceId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {});
  User.associate = (models) => {
    models.Users.belongsToMany(models.Players, {
      through: {
        model: models.UserPlayers,
        unique: false,
      },
      foreignKey: 'userId',
      constraints: false,
    });
    models.Users.belongsToMany(models.Tournaments, {
      through: {
        model: models.UsersTournaments,
        unique: true,
      },
      foreignKey: 'userId',
      constraints: false,
    });
    models.Users.belongsTo(models.Roles, { as: 'role' });
  };
  return User;
};
