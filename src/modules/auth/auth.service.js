const { hashPassword, generateAccessToken, comparePassword } = require('../../utils');
const { BadRequestError, UnauthorizedError } = require('../../utils/errors');
const User = require('./user.model');

const authService = {
  createUser: async ({ name, email, password }) => {
    const isUserExists = await User.exists({ email });
    if (isUserExists) throw new BadRequestError('Email Already Exists!');

    password = await hashPassword(password);
    const user = await User.create({ name, email, password });

    const token = await generateAccessToken(user);

    return { _id: user._id, name: user.name, email: user.email, token };
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new UnauthorizedError('Invalid email or password!');

    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) throw new UnauthorizedError('Invalid email or password!');

    const token = await generateAccessToken(user);

    return token;
  },
};

module.exports = authService;
