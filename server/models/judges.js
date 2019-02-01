module.exports = (sequelize, DataTypes) => {
  const judges = sequelize.define('judges', {
    dci: DataTypes.STRING,
  }, {});
  return judges;
};
