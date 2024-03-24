const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  comparePassword: async (inputPassword, hashPassword) => {
    return bcrypt.compare(inputPassword, hashPassword);
  },
};
