module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    sanctionNumber: {
      type: Sequelize.STRING,
    },
    guid: {
      type: Sequelize.STRING,
    },
    organizer: {
      type: Sequelize.STRING,
    },
    coordinator: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    endDate: {
      type: Sequelize.DATE,
    },
    format: {
      type: Sequelize.STRING,
    },
    eliminationType: {
      type: Sequelize.STRING,
    },
    casual: {
      type: Sequelize.BOOLEAN,
    },
    status: {
      type: Sequelize.STRING,
    },
    playoff: {
      type: Sequelize.BOOLEAN,
    },
    manualMatches: {
      type: Sequelize.STRING,
    },
    notes: {
      type: Sequelize.TEXT,
    },
    numberOfRounds: {
      type: Sequelize.INTEGER,
    },
    playoffsStartRound: {
      type: Sequelize.INTEGER,
    },
    typeCode: {
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('Events'),
};
