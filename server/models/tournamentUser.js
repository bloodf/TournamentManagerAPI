module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('TournamentUser', {
  }, {});
  Tournament.associate = (models) => {
    models.TournamentUser.belongsTo(models.Roles);
  };
  return Tournament;
};
