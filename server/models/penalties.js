module.exports = (sequelize, DataTypes) => {
  const penalties = sequelize.define('penalties', {
    penalty: DataTypes.INTEGER,
    name: DataTypes.STRING,
    code: DataTypes.STRING,
  }, {});
  penalties.associate = (models) => {
    models.penalties.hasMany(models.warnings);
  };
  return penalties;
};
