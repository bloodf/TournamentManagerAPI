module.exports = (sequelize, DataTypes) => {
  const decks = sequelize.define('decks', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    list: DataTypes.JSON,
    format: DataTypes.STRING,
  }, {});
  decks.associate = (models) => {
    models.decks.hasMany(models.players, {
      as: 'player',
      targetKey: 'id',
      foreignKey: 'deckId',
    });

    models.decks.belongsToMany(models.events, {
      through: 'deckEvent',
    });

    models.decks.belongsTo(models.users, {
      as: 'user',
      targetKey: 'id',
      foreignKey: 'userId',
    });
  };
  return decks;
};
