module.exports = (sequelize, DataTypes) => sequelize.define('Roles', {
  role: DataTypes.STRING,
  active: DataTypes.BOOLEAN,
}, {});
