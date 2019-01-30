const {
  users,
} = require('../models');

const logger = require('../utils/logger');

async function getUser(email, password) {
  try {
    const userDb = await users.findOne({
      where: {
        email,
        active: true,
      },
    });

    if (!userDb) throw new Error('User not found');

    const ValidPassword = await userDb.validPassword(password);
    if (ValidPassword) {
      return {
        id: userDb.id,
        name: userDb.name,
        email: userDb.email,
        isActive: userDb.active,
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
    const userDb = await users.findOne({
      where: {
        email,
        active: true,
      },
    });
    if (!userDb) {
      throw new Error('User not found');
    }
    return {
      id: userDb.id,
      name: userDb.name,
      email: userDb.email,
      isActive: userDb.active,
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
