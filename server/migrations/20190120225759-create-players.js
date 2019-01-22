module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Players', {
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
    eventId: {
      type: Sequelize.INTEGER,
      unique: 'EventPlayer',
      references: {
        model: 'Events',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    teamId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
  down: queryInterface => queryInterface.dropTable('Players'),
};
