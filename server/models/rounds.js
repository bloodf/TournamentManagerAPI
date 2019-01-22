module.exports = (sequelize, DataTypes) => {
  const Rounds = sequelize.define('Rounds', {
    round: DataTypes.INTEGER,
    playFormat: DataTypes.STRING,
    date: DataTypes.DATE,
    teamFormat: DataTypes.BOOLEAN,
  }, {});
  Rounds.associate = (models) => {
    models.Rounds.hasMany(models.Matches);
    models.Rounds.belongsTo(models.Events);
  };
  return Rounds;
};
