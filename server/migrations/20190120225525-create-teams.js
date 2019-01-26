module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Teams', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    eliminationRound: {
      type: Sequelize.INTEGER,
    },
    teamUUID: {
      type: Sequelize.UUID,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Teams'),
};
