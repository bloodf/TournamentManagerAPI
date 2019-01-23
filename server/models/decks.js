module.exports = (sequelize, DataTypes) => {
  const Decks = sequelize.define('Decks', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    list: DataTypes.TEXT,
    format: DataTypes.STRING,
  }, {});
  Decks.associate = (models) => {
    models.Decks.belongsTo(models.Users, { foreignKey: 'id', as: 'user' });
  };
  return Decks;
};
