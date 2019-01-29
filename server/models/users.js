/*eslint-disable */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    dci: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: DataTypes.STRING,
    facebookId: {
      type: DataTypes.STRING,
      unique: true,
    },
    active: DataTypes.BOOLEAN,
  }, {
    hooks: {
      async beforeCreate(user) {
        user.password = await bcrypt.hash(`${user.password}`, 10);
      },
      async beforeUpdate(user) {
        user.password = await bcrypt.hash(`${user.password}`, 10);
      },
    },
  });

  User.prototype.validPassword = async function (password) {
    return bcrypt.compare(`${password}`, `${this.password}`);
  };

  User.associate = (models) => {
    models.Users.hasMany(models.Players, {
      as: 'player',
      targetKey: 'id',
      foreignKey: 'userId',
    });

    models.Users.hasMany(models.Decks, {
      as: 'deck',
      targetKey: 'id',
      foreignKey: 'userId',
    });

    models.Users.belongsToMany(models.Tournaments, {
      as: 'tournaments',
      through: 'TournamentUser',
      primaryKey: true,
    });
  };
  return User;
};
