module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('players', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    dci: {
      type: Sequelize.STRING,
      unique: 'EventPlayer',
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    middleName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    country: {
      type: Sequelize.STRING(3),
      allowNull: true,
      defaultValue: '',
    },
    position: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
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
  down: queryInterface => queryInterface.dropTable('players'),
};
