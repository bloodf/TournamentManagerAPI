const AuthenticationController = require('../controllers/Authentication');

module.exports = {
  secretOrPrivateKey: 's3cr3t',
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
