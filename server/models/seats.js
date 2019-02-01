module.exports = (sequelize, DataTypes) => {
  const seats = sequelize.define('seats', {
    table: DataTypes.INTEGER,
    seat: DataTypes.INTEGER,
  }, {});
  seats.associate = (models) => {
    models.seats.belongsTo(models.players);
  };
  return seats;
};
