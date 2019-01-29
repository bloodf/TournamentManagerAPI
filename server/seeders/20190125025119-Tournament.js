const moment = require('moment');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('tournaments', [{
    name: 'Tournament Teste 1',
    startDate: new Date(),
    endDate: moment(Date.now()).add(8, 'hours').format(),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('tournaments', null, {}),
};
