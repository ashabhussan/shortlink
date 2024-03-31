const { faker } = require('@faker-js/faker');
const { User } = require('../../src/modules/auth');
const { hashPassword } = require('../../src/utils');

module.exports = {
  deleteUsers: async () => User.deleteMany({}),
  userPayload: (args) => {
    const {
      name = faker.person.fullName(),
      email = faker.internet.email(),
      password = 'Xo7L7JXfdPE$j*B',
    } = args ?? {};

    return { name, email, password };
  },
  createUser: async () => {
    const password = 'Xo7L7JXfdPE$j*B';

    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await hashPassword(password),
    };

    const newUser = await User.create(payload);
    newUser.password = password;
    return newUser;
  },
};
