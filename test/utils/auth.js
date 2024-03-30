const { User } = require('../../src/modules/auth');

module.exports = {
  deleteUsers: async () => User.deleteMany({}),
};
