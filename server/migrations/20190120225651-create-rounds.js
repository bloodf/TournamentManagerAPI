module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('rounds', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    round: {
      type: Sequelize.INTEGER,
    },
    playFormat: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    teamFormat: {
      type: Sequelize.BOOLEAN,
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
  down: queryInterface => queryInterface.dropTable('rounds'),
};
