module.exports = (sequelize, DataTypes) => {
  const Rounds = sequelize.define('Rounds', {
    round: DataTypes.INTEGER,
    playFormat: DataTypes.STRING,
    date: DataTypes.DATE,
    teamFormat: DataTypes.BOOLEAN,
  }, {});
  Rounds.associate = (models) => {
    models.Rounds.hasMany(models.Matches, {
      as: 'matches',
      foreignKey: 'matchId',
    });

    models.Rounds.belongsTo(models.Events, { as: 'event', foreignKey: 'eventId' });
  };
  return Rounds;
};
