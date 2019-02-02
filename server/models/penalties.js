module.exports = (sequelize, DataTypes) => {
  const penalties = sequelize.define('werPenalties', {
    penalty: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
  }, {});
  return penalties;
};
