const { UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require('../../utils/errors');
const { isEmailExists, createUser, getUserByEmail } = require('./auth.service');
const { userCreationValidator, userLoginValidator } = require('./auth.validator');
const { generateAccessToken, logger, hashPassword, comparePassword } = require('../../utils');

module.exports = {
  createUser: async (req, res) => {
    try {
      const { error, value } = userCreationValidator.validate(req.body);
      if (error) {
        return res.status(UNPROCESSABLE_ENTITY.code).json({
          message: UNPROCESSABLE_ENTITY.message,
          value: error.details,
        });
      }

      const isUserExists = await isEmailExists(value.email);
      if (isUserExists) {
        return res.status(UNPROCESSABLE_ENTITY.code).json({
          message: UNPROCESSABLE_ENTITY.message,
          value: 'The Email already exists!',
        });
      }

      value.password = await hashPassword(value.password);

      const user = await createUser(value);
      const token = await generateAccessToken(user);

      return res.json({ data: { name: user.name, email: user.email, _id: user._id, token } });
    } catch (err) {
      logger.error(err);
      return res.status(INTERNAL_SERVER_ERROR.code).json({
        message: INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { error, value } = userLoginValidator.validate(req.body);
      if (error) {
        return res.status(UNPROCESSABLE_ENTITY.code).json({
          message: UNPROCESSABLE_ENTITY.message,
          value: error.details,
        });
      }

      const user = await getUserByEmail(value.email);
      if (!user) {
        return res.status(UNAUTHORIZED.code).json({
          message: UNAUTHORIZED.message,
          value: 'Invalid email or password!',
        });
      }

      const isPasswordMatched = await comparePassword(value.password, user.password);
      if (!isPasswordMatched) {
        return res.status(UNAUTHORIZED.code).json({
          message: UNAUTHORIZED.message,
          value: 'Invalid email or password!',
        });
      }

      const token = await generateAccessToken(user);

      return res.json({ data: { token } });
    } catch (err) {
      logger.error(err);
      return res.status(INTERNAL_SERVER_ERROR.code).json({
        message: INTERNAL_SERVER_ERROR.message,
      });
    }
  },
};
