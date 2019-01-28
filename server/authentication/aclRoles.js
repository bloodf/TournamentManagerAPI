const Roles = [
  {
    name: 'Super User',
    role: 'superuser',
    group: ['superuser'],
  },
  {
    name: 'Admin',
    role: 'admin',
    group: ['superuser', 'admin'],
  },
  {
    name: 'Manager',
    role: 'manager',
    group: ['superuser', 'admin', 'manager'],
  },
  {
    name: 'Staff',
    role: 'staff',
    group: ['superuser', 'admin', 'manager', 'staff'],
  },
  {
    name: 'Judge',
    role: 'judge',
    group: ['superuser', 'admin', 'manager', 'staff', 'judge'],
  },
  {
    name: 'Player',
    role: 'player',
    group: ['superuser', 'admin', 'manager', 'staff', 'judge', 'player'],
  },
];

function findRole(baseRole = '') {
  if (baseRole) {
    return Roles.find(r => r.role === baseRole).group;
  }
  return Roles;
}

module.exports = findRole;
