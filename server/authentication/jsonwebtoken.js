const AuthenticationController = require('../controllers/Authentication');

module.exports = {
  secretOrPrivateKey: 'FIzKuvuq7GYA01E1PXZhIQgmLJiPVbqz',
  sign: {},
  decode: {},
  verify: {},
  validate: async (request, payload) => {
    const UserDB = await AuthenticationController.validateUser(payload.email);
    if (!UserDB.isActive) {
      return { credentials: null, isValid: false };
    }
    return {
      isValid: UserDB.isActive,
      credentials: {
        ...UserDB,
      },
    };
  },
};
