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

  verifyAccessToken: (token) => {
    return new Promise((resolve) => {
      jwt.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
          resolve(null);
        } else {
          resolve(decoded);
        }
      });
    });
  },
};
