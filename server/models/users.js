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

    models.Users.hasMany(models.Players, {
      as: 'player',
      targetKey: 'id',
      foreignKey: 'userId',
    });

    models.Users.belongsToMany(models.Tournaments, {
      through: 'TournamentUser',
    });

    models.Users.belongsToMany(models.Roles, {
      through: 'UserRole',
    });

    models.Users.hasMany(models.Decks, {
      as: 'deck',
      targetKey: 'id',
      foreignKey: 'userId',
    });

  };
  return User;
};
