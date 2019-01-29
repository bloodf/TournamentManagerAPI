module.exports = (sequelize) => {
  const tournamentUsers = sequelize.define('tournamentUsers', {}, {});
  tournamentUsers.associate = (models) => {
    models.tournamentUsers.belongsTo(models.roles);
    models.tournamentUsers.belongsTo(models.users);
    models.tournamentUsers.belongsTo(models.tournaments);
  };

  return tournamentUsers;
};
