const authValidator = require('./auth.validator');
const authService = require('./auth.service');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const value = authValidator.validateUserCreation(req.body);

      const user = await authService.createUser(value);

      return res.json({ data: user });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const value = authValidator.validateUserLogin(req.body);

      const token = await authService.login(value);

      return res.json({ data: { token } });
    } catch (err) {
      next(err);
    }
  },
};
