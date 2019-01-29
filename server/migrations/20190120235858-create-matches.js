module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('matches', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      unique: 'PlayerMatch',
    },
    person: {
      type: Sequelize.STRING(30),
      unique: 'PlayerMatch',
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
      unique: 'PlayerMatch',
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
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('matches'),
};
