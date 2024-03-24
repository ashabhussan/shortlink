const jwt = require('jsonwebtoken');
const {
  app: { jwtSecret, jwtTokenExpirationTime },
} = require('../config/config');

module.exports = {
  generateAccessToken: async (user) => {
    const { _id, email } = user;
    const jwtPayload = { userId: _id, email };

    const jwtToken = jwt.sign(jwtPayload, jwtSecret, {
      expiresIn: jwtTokenExpirationTime,
    });

    return `Bearer ${jwtToken}`;
  },
};
