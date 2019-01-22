module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Matches', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    person: {
      type: Sequelize.STRING(30),
      unique: 'EventPlayer',
      references: {
        model: 'Players',
        key: 'dci',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    opponent: {
      type: Sequelize.STRING(30),
      default: '',
      allowNull: true,
    },
    outcome: {
      type: Sequelize.INTEGER,
    },
    win: {
      type: Sequelize.INTEGER,
    },
    loss: {
      type: Sequelize.INTEGER,
    },
    draw: {
      type: Sequelize.INTEGER,
    },
    winByDrop: {
      type: Sequelize.BOOLEAN,
    },
    eventId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Events',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      unique: 'EventPlayer',
    },
    roundId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Rounds',
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
  down: queryInterface => queryInterface.dropTable('Matches'),
};
