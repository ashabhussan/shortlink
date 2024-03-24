const User = require('./user.model');

module.exports = {
  createUser: async (args) => {
    return User.create(args);
  },

  getUserByEmail: async (email) => {
    return User.findOne({ email });
  },

  isEmailExists: async (email) => {
    return User.exists({ email });
  },
};
