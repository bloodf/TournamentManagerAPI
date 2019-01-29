/*eslint-disable */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
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

  users.prototype.validPassword = async function (password) {
    return bcrypt.compare(`${password}`, `${this.password}`);
  };

  users.associate = (models) => {
    models.users.hasMany(models.players, {
      as: 'player',
    });

    models.users.hasMany(models.decks, {
      as: 'deck',
    });

    models.users.belongsToMany(models.tournaments, {
      as: 'tournaments',
      through: 'tournamentUsers',
      primaryKey: true,
    });
  };
  return users;
};
