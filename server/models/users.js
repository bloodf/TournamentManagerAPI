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
      through: 'UserPlayers',
    });

    models.Users.belongsToMany(models.Tournaments, {
      through: 'UserTournament',
    });

    models.Users.hasMany(models.Decks, {
      as: 'deck',
      targetKey: 'id',
      foreignKey: 'userId',
    });

    models.Users.belongsTo(models.Roles, {
      as: 'role',
      targetKey: 'id',
      foreignKey: 'roleId',
    });
  };
  return User;
};
