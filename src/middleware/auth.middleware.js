const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('../utils/errors');
const { verifyAccessToken } = require('../utils/jwt');
const logger = require('../utils/logger');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(UNAUTHORIZED.code).json({
        message: UNAUTHORIZED.message,
      });
    }

    const token = req.headers.authorization.split(' ')[1];

    const user = await verifyAccessToken(token);
    if (!user) {
      return res.status(UNAUTHORIZED.code).json({
        message: UNAUTHORIZED.message,
      });
    }

    req.userInfo = user;
    next();
  } catch (err) {
    logger.error(err);
    return res.status(INTERNAL_SERVER_ERROR.code).json({
      message: INTERNAL_SERVER_ERROR.message,
    });
  }
};
