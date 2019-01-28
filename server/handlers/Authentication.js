const boom = require('boom');
const httpStatus = require('http-status');

const AuthenticationController = require('../controllers/Authentication');
const logger = require('../utils/logger');

async function validateUser(req) {
  const {
    email,
    password,
  } = req.payload;

  try {
    const User = await AuthenticationController.getUser(email, password);

    if (!User.isActive) throw new Error('Invalid user');

    const Token = await req.server.methods.jwtSign(User);

    return {
      ...User,
      token: Token,
    };
  } catch (error) {
    const errorMessage = `Failed to fetch the data for user ${email}`;

    if (!error.logged) logger.error(error, errorMessage);

    return boom.boomify(error, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: errorMessage,
    });
  }
}

module.exports = {
  validateUser,
};
