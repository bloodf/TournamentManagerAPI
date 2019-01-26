module.exports = (sequelize, DataTypes) => {
  const Decks = sequelize.define('Decks', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    list: DataTypes.JSON,
    format: DataTypes.STRING,
  }, {});
  Decks.associate = (models) => {
    models.Decks.hasMany(models.Players, {
      as: 'player',
      targetKey: 'id',
      foreignKey: 'deckId',
    });

    models.Decks.belongsToMany(models.Events, {
      through: 'DeckEvent',
    });

    models.Decks.belongsTo(models.Users, {
      as: 'user',
      targetKey: 'id',
      foreignKey: 'userId',
    });
  };
  return Decks;
};
