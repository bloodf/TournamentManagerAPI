const penalties = [
  {
    penalty: 0,
    name: 'Name',
    code: 'CDE',
  },
  {
    penalty: 1,
    name: 'Name',
    code: 'CDE',
  },
  {
    penalty: 2,
    name: 'Name',
    code: 'CDE',
  },
  {
    penalty: 3,
    name: 'Name',
    code: 'CDE',
  },
  {
    penalty: 4,
    name: 'Name',
    code: 'CDE',
  },
  {
    penalty: 5,
    name: 'Name',
    code: 'CDE',
  },
  {
    penalty: 6,
    name: 'Name',
    code: 'CDE',
  },
  {
    penalty: 7,
    name: 'Name',
    code: 'CDE',
  },
  {
    penalty: 8,
    name: 'Name',
    code: 'CDE',
  },
  {
    penalty: 9,
    name: 'Name',
    code: 'CDE',
  },
  {
    penalty: 10,
    name: 'Name',
    code: 'CDE',
  },
].map(p => ({
  ...p,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('werPenalties', penalties, {}),

  down: queryInterface => queryInterface.bulkDelete('werPenalties', null, {}),
};
