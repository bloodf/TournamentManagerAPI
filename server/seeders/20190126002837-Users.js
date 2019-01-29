/*eslint-disable */
const faker = require('faker');
const bcrypt = require('bcrypt');

const baseAdmin = {
  name: 'Heitor Ramon Ribeiro',
  email: 'heitor.ramon@gmail.com',
  dci: '19114349',
  phone: '(61) 99102-9460',
  password: 'heitor',
};

const DCIS = ['8102273301', '39803883', '3209548416', '59520451', '9210181268', '93075559', '8318712323', '4107290037']
  .map(dci => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    dci,
    phone: faker.phone.phoneNumber(),
    password: Date.now(),
  }));

const Users = () => [baseAdmin, ...DCIS].map((user) => {
  const password = bcrypt.hashSync(`${user.password}`, 10);
  const UserData = {
    ...user,
    password,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return UserData;
});

module.exports = {
  up: async (queryInterface) => {
    const base = Users();
    const UserRole = base.map((u, i) => ({
      UserId: i + 1,
      RoleId: i === 0 ? 1 : 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Users', base, {});

    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});

    return new Promise((resolve, reject) => {
      resolve();
    });
  },
};
