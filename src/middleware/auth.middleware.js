const { verifyAccessToken } = require('../utils');
const { UnauthorizedError } = require('../utils/errors');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new UnauthorizedError('Must have auth token in authorization header');

    const token = req.headers.authorization.split(' ')[1];

    const user = await verifyAccessToken(token);
    if (!user) throw new UnauthorizedError();

    req.userInfo = user;
    next();
  } catch (err) {
    next(err);
  }
};
