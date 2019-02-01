module.exports = (sequelize, DataTypes) => {
  const judges = sequelize.define('judges', {
    dci: DataTypes.STRING,
  }, {});
  judges.associate = function (models) {
    models.judges.belongsTo(models.events);
  };
  return judges;
};
