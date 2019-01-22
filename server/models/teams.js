module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define('Teams', {
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    eliminationRound: DataTypes.INTEGER,
  }, {});
  Teams.associate = (models) => {
    models.Teams.hasMany(models.Players);
    models.Teams.belongsTo(models.Events);
  };

  return Teams;
};
