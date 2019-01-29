const roleName = require('../authentication/aclRoles');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('roles', roleName().map(role => ({
    name: role.name,
    role: role.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  })), {}),

  down: queryInterface => queryInterface.bulkDelete('roles', null, {}),
};
