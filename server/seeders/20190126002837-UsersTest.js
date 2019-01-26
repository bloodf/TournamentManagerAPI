const moment = require('moment');
const faker = require('faker');

const DCIS = ['8102273301', '39803883', '3209548416', '59520451', '9210181268', '93075559', '8318712323', '4107290037']
  .map(dci => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    dci,
    phone: faker.phone.phoneNumber(),
    active: true,
    createdAt: moment(Date.now()).format(),
    updatedAt: moment(Date.now()).format(),
  }));

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', DCIS, {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
