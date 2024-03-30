const { faker } = require('@faker-js/faker');
const { User } = require('../../src/modules/auth');

module.exports = {
  deleteUsers: async () => User.deleteMany({}),
  userPayload: (args) => {
    const {
      name = faker.person.fullName(),
      email = faker.internet.email(),
      password = 'Xo7L7JHGPE$j*B',
    } = args ?? {};

    return { name, email, password };
  },
};
