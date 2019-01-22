module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    role: {
      type: Sequelize.STRING,
    },
    active: {
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
  down: queryInterface => queryInterface.dropTable('Roles'),
};
