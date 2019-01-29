module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    name: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {});
  roles.associate = (models) => {
    models.roles.hasMany(models.tournamentUsers);
  };
  return roles;
};
