const {
  Users,
} = require('../models');

const logger = require('../utils/logger');

async function getUser(email, password) {
  try {
    const User = await Users.findOne({
      where: {
        email,
        active: true,
      },
    });
    const ValidPassword = await User.validPassword(password);
    if (ValidPassword) {
      return {
        id: User.id,
        name: User.name,
        email: User.email,
        isActive: User.active,
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
    const User = await Users.findOne({
      where: {
        email,
        active: true,
      },
    });
    if (!User) {
      throw new Error('User not found');
    }
    return {
      id: User.id,
      name: User.name,
      email: User.email,
      isActive: User.active,
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
