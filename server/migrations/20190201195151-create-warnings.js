module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('warnings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    code: {
      type: Sequelize.STRING,
    },
    judge: {
      type: Sequelize.STRING,
    },
    notes: {
      type: Sequelize.TEXT,
    },
    round: {
      type: Sequelize.INTEGER,
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
  down: queryInterface => queryInterface.dropTable('warnings'),
};
