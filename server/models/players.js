module.exports = (sequelize, DataTypes) => {
  const Players = sequelize.define('Players', {
    dci: DataTypes.STRING,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    country: DataTypes.STRING,
    position: DataTypes.STRING,
  }, {});
  Players.associate = (models) => {
  };
  return Players;
};
