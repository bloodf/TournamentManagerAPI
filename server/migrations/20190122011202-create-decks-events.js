module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('DecksEvents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    deckId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Decks',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    eventId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Events',
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
  down: queryInterface => queryInterface.dropTable('DecksEvents'),
};
