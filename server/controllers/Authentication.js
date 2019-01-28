const {
  Users,
} = require('../models');

const logger = require('../utils/logger');

async function getUserRoles(UserModel) {
  const UserDB = await UserModel.getRoles();
  return UserDB.map(role => role.role);
}

async function getUser(email, password) {
  try {
    const User = await Users.find({
      where: {
        email,
        active: true,
      },
    });
    const ValidPassword = await User.validPassword(password);
    if (ValidPassword) {
      const RolesDB = await getUserRoles(User);

      return {
        id: User.id,
        name: User.name,
        email: User.email,
        isActive: User.active,
        roles: RolesDB,
      };
    }
    return {
      id: 0,
      name: '',
      email,
      isActive: false,
    };
  } catch (error) {
    logger.error(error, 'Failed to get player');
    error.logged = true;
    throw error;
  }
}

async function validateUser(email) {
  try {
    const User = await Users.find({
      where: {
        email,
        active: true,
      },
    });

    const RolesDB = await getUserRoles(User);

    return {
      id: User.id,
      name: User.name,
      email: User.email,
      isActive: User.active,
      roles: RolesDB,
    };
  } catch (error) {
    logger.error(error, 'Failed to get player');
    error.logged = true;
    throw error;
  }
}

module.exports = {
  getUser,
  validateUser,
};
