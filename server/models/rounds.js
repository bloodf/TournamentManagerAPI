module.exports = (sequelize, DataTypes) => {
  const rounds = sequelize.define('rounds', {
    round: DataTypes.INTEGER,
    playFormat: DataTypes.STRING,
    date: DataTypes.DATE,
    teamFormat: DataTypes.BOOLEAN,
  }, {});
  rounds.associate = (models) => {
    models.rounds.hasMany(models.matches, {
      as: 'matches',
    });

    models.rounds.belongsTo(models.events, {
      as: 'event',
    });
  };
  return rounds;
};
