const moment = require('moment');

moment.locale('pt-BR');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Tournaments', [{
    name: 'Tournament Teste 1',
    startDate: moment(Date.now()).format(),
    endDate: moment(Date.now()).add(8, 'hours').format(),
    active: true,
    createdAt: moment(Date.now()).format(),
    updatedAt: moment(Date.now()).format(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Tournaments', null, {}),
};
