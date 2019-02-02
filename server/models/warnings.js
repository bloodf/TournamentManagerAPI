module.exports = (sequelize, DataTypes) => {
  const warnings = sequelize.define('warnings', {
    code: DataTypes.STRING,
    judge: DataTypes.STRING,
    notes: DataTypes.TEXT,
    round: DataTypes.INTEGER,
  }, {});
  warnings.associate = (models) => {
    models.warnings.belongsTo(models.players);

    models.warnings.belongsTo(models.werPenalties, {
      targetKey: 'penalty',
      foreignKey: 'penalty',
    });
  };
  return warnings;
};
